-- Seraya — initial schema
-- Drafted 2026-05-16 from mock data (3 patients × 30 days) + design inventory.
-- Tables: caregivers, seniors, caregiver_seniors, questions, questionnaires,
--         questionnaire_questions, alerts, checkins, checkin_scores.
-- Scoring: all scale questions are 1–5; multiselect stores text[] of option tokens.
--
-- Open follow-ups (documented in docs/SESSION-HANDOFF.md):
--   - Confirm whether to use the mock `id` slug (`siti`, `liew`, `siva`) as a
--     stable external key. Implementation here: keep slug column, generate UUID PKs.
--   - `medical_context` stored as jsonb — flexible enough for both the diabetes
--     and chemo regimens in the mock data.
--   - `binary` question type is included in the enum (Figma `33:832` showed a
--     yes/no question even though mock data only uses scale + multiselect).
--   - RLS policies below are starter scaffolding; tighten before production.

-- Extensions ----------------------------------------------------------------

create extension if not exists "pgcrypto";  -- for gen_random_uuid()

-- Enums ---------------------------------------------------------------------

create type question_type as enum ('scale', 'multiselect', 'binary');

create type alert_severity as enum ('monitor', 'moderate', 'urgent');

create type alert_status as enum ('active', 'acknowledged', 'resolved');

-- Caregivers & seniors ------------------------------------------------------

-- A caregiver is a real auth user. Linked 1:1 to auth.users via auth_user_id.
create table caregivers (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid unique references auth.users (id) on delete cascade,
  name          text not null,
  email         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- A senior is the person being monitored. May or may not have their own
-- auth.users row (some seniors log in to the elderly app; others are
-- managed solely by caregivers).
create table seniors (
  id              uuid primary key default gen_random_uuid(),
  auth_user_id    uuid unique references auth.users (id) on delete set null,
  slug            text unique,  -- e.g. "siti", "liew", "siva" — matches mock data
  name            text not null,
  initials        text,
  age             smallint check (age between 0 and 130),
  gender          text check (gender in ('female', 'male', 'other', 'prefer_not_to_say')),
  avatar_color    text,
  medical_context jsonb,  -- {diagnosis, treatment, notes, infusion_dates[], cycle_schedule}
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index seniors_slug_idx on seniors (slug);

-- Many-to-many caregiver ↔ senior relationship.
create table caregiver_seniors (
  caregiver_id  uuid not null references caregivers (id) on delete cascade,
  senior_id     uuid not null references seniors (id) on delete cascade,
  relationship  text,  -- "primary", "family", etc.
  created_at    timestamptz not null default now(),
  primary key (caregiver_id, senior_id)
);

create index caregiver_seniors_senior_idx on caregiver_seniors (senior_id);

-- Questions & questionnaires ------------------------------------------------

-- A question is a reusable template (e.g. "How is your vision today?"). Keyed
-- by string id to match the mock data ("vision", "sleep", "appetite", ...).
create table questions (
  id        text primary key,  -- "vision", "sleep", "pain", ...
  text      text not null,     -- "How is your vision today?"
  type      question_type not null,
  scale     text,              -- "1-5" or null for non-scale questions
  icon      text,              -- "eye", "moon", "brain", ...
  options   jsonb,             -- for multiselect: ["lower_back", "knee", ...]
  labels    jsonb not null,    -- {"1": "Very blurry", "2": "Blurry", ...}
  created_at timestamptz not null default now()
);

-- A questionnaire is a named set of questions assigned to a senior. The same
-- senior typically has exactly one active questionnaire at a time.
create table questionnaires (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,  -- "generic-8q", "pancreatic-cancer-symptom", ...
  name        text not null,
  senior_id   uuid references seniors (id) on delete cascade,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create index questionnaires_senior_idx on questionnaires (senior_id);

-- Ordered list of questions in a questionnaire.
create table questionnaire_questions (
  questionnaire_id  uuid not null references questionnaires (id) on delete cascade,
  question_id       text not null references questions (id) on delete restrict,
  position          smallint not null,
  primary key (questionnaire_id, question_id)
);

create index questionnaire_questions_q_idx on questionnaire_questions (questionnaire_id, position);

-- Alerts --------------------------------------------------------------------

create table alerts (
  id                uuid primary key default gen_random_uuid(),
  senior_id         uuid not null references seniors (id) on delete cascade,
  alert_type        text not null,  -- "sleep_decline", "post_chemo_appetite", ...
  severity          alert_severity not null,
  status            alert_status not null default 'active',
  message           text not null,
  triggered_at      timestamptz not null,
  resolved_at       timestamptz,
  threshold_metric  text,      -- e.g. "sleep", "appetite", "pain"
  threshold_condition text,    -- e.g. "<=2", "count>=2", "includes:ankle,knee"
  consecutive_days  smallint,
  created_at        timestamptz not null default now()
);

create index alerts_senior_idx on alerts (senior_id, status);
create index alerts_triggered_idx on alerts (triggered_at desc);

-- Check-ins -----------------------------------------------------------------

-- One row per (senior, day) check-in session.
create table checkins (
  id          uuid primary key default gen_random_uuid(),
  senior_id   uuid not null references seniors (id) on delete cascade,
  checkin_date date not null,
  completed   boolean not null default false,
  completed_at timestamptz,        -- combined date + time from mock data
  note        text,
  created_at  timestamptz not null default now(),
  unique (senior_id, checkin_date)
);

create index checkins_senior_date_idx on checkins (senior_id, checkin_date desc);

-- One row per (checkin, question). Scale + binary use score_int; multiselect
-- uses selected_options text[]. Exactly one of the two is populated per row.
create table checkin_scores (
  checkin_id        uuid not null references checkins (id) on delete cascade,
  question_id       text not null references questions (id) on delete restrict,
  score_int         smallint check (score_int between 0 and 5),
  selected_options  text[],
  primary key (checkin_id, question_id),
  check (
    (score_int is not null and selected_options is null)
    or (score_int is null and selected_options is not null)
  )
);

create index checkin_scores_question_idx on checkin_scores (question_id);

-- Triggers ------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger caregivers_set_updated_at
  before update on caregivers
  for each row execute function set_updated_at();

create trigger seniors_set_updated_at
  before update on seniors
  for each row execute function set_updated_at();

-- Row-level security (starter — tighten before prod) -----------------------

alter table caregivers enable row level security;
alter table seniors enable row level security;
alter table caregiver_seniors enable row level security;
alter table questionnaires enable row level security;
alter table questionnaire_questions enable row level security;
alter table alerts enable row level security;
alter table checkins enable row level security;
alter table checkin_scores enable row level security;

-- Caregivers can read/update their own caregiver row.
create policy caregivers_self_select on caregivers
  for select using (auth_user_id = auth.uid());
create policy caregivers_self_update on caregivers
  for update using (auth_user_id = auth.uid());

-- Seniors can read their own senior row; caregivers can read seniors they manage.
create policy seniors_self_select on seniors
  for select using (
    auth_user_id = auth.uid()
    or exists (
      select 1 from caregiver_seniors cs
      join caregivers c on c.id = cs.caregiver_id
      where cs.senior_id = seniors.id and c.auth_user_id = auth.uid()
    )
  );

-- Caregivers can read their own membership rows.
create policy caregiver_seniors_visible on caregiver_seniors
  for select using (
    exists (
      select 1 from caregivers c
      where c.id = caregiver_seniors.caregiver_id and c.auth_user_id = auth.uid()
    )
  );

-- Check-ins: senior writes/reads own; assigned caregiver reads.
create policy checkins_own_or_caregiver on checkins
  for select using (
    exists (
      select 1 from seniors s
      where s.id = checkins.senior_id
        and (
          s.auth_user_id = auth.uid()
          or exists (
            select 1 from caregiver_seniors cs
            join caregivers c on c.id = cs.caregiver_id
            where cs.senior_id = s.id and c.auth_user_id = auth.uid()
          )
        )
    )
  );

create policy checkins_self_insert on checkins
  for insert with check (
    exists (
      select 1 from seniors s
      where s.id = checkins.senior_id and s.auth_user_id = auth.uid()
    )
  );

-- Scores follow the parent check-in's permission.
create policy checkin_scores_visible on checkin_scores
  for select using (
    exists (
      select 1 from checkins ci where ci.id = checkin_scores.checkin_id
    )
  );
create policy checkin_scores_self_insert on checkin_scores
  for insert with check (
    exists (
      select 1 from checkins ci
      join seniors s on s.id = ci.senior_id
      where ci.id = checkin_scores.checkin_id and s.auth_user_id = auth.uid()
    )
  );

-- Alerts visible to assigned caregivers and the senior themselves.
create policy alerts_visible on alerts
  for select using (
    exists (
      select 1 from seniors s
      where s.id = alerts.senior_id
        and (
          s.auth_user_id = auth.uid()
          or exists (
            select 1 from caregiver_seniors cs
            join caregivers c on c.id = cs.caregiver_id
            where cs.senior_id = s.id and c.auth_user_id = auth.uid()
          )
        )
    )
  );

-- Questionnaires + questionnaire_questions visible to the senior + their caregivers.
create policy questionnaires_visible on questionnaires
  for select using (
    exists (
      select 1 from seniors s
      where s.id = questionnaires.senior_id
        and (
          s.auth_user_id = auth.uid()
          or exists (
            select 1 from caregiver_seniors cs
            join caregivers c on c.id = cs.caregiver_id
            where cs.senior_id = s.id and c.auth_user_id = auth.uid()
          )
        )
    )
  );

create policy questionnaire_questions_visible on questionnaire_questions
  for select using (
    exists (
      select 1 from questionnaires q where q.id = questionnaire_questions.questionnaire_id
    )
  );
