# Seraya — Session Handoff (2026-05-16)

This document is the cold-start brief for the next Claude Code session. The original 7-step plan is in the user's first message; below is what's actually done, what's pending, and the exact next action.

## TL;DR

- **Done:** Figma inventory written, monorepo scaffolded, git initialised, **private** GitHub repo `choo-c102/seraya1.0` created with `origin` wired locally.
- **Nothing has been pushed yet.** No `pnpm install` has been run. No commit has been made.
- **Blocked on:** user-provided Supabase Personal Access Token + project choice. Step 5 of the plan.

## Repo location

- Local: `C:\Users\chery\projects\seraya`
- Remote: `https://github.com/choo-c102/seraya1.0` (private, empty, default branch `main`)
- Git remote `origin` already points to the private repo. Branch is `main`. No commits yet.

## What changed re: the original plan

- The repo name **was changed** from `seraya-app` to `seraya1.0` because `choo-c102/seraya-app` already existed as a public repo with an unrelated active Convex backend project (last commit 2026-05-15). Confirmed with user; they chose the new name. The old repo was **not** touched.
- The Figma design inventory was generated from **structural metadata only**, not from visual screenshots. The Figma MCP server (Starter plan) rate-limited us before screenshots could be downloaded. The inventory is honest about this — every entry is marked with caveats. Re-running visual inspection once the Figma quota resets is a pending follow-up.
- `pnpm` and `gh` were installed via `npm i -g pnpm` and `winget install GitHub.cli`. User authenticated `gh` interactively (account: `choo-c102`).

## Step-by-step status

| Step | Status | Notes |
|---|---|---|
| 1. Figma read + inventory | ✅ Done (with caveat) | `docs/design-inventory.md`. Metadata-only; not visually verified. 23 screens inventoried, full component glossary, shared patterns + open questions. |
| 2. Init git + create private repo | ✅ Done | Repo: `choo-c102/seraya1.0`. Local `main` branch. `origin` wired. **No push yet.** |
| 3. Scaffold monorepo | ✅ Done | Structure below. **`pnpm install` not yet run** — `node_modules/` does not exist. |
| 4. Security files | ✅ Done | `.gitignore`, `.env.example`, `packages/shared/src/supabase.ts` (reads from env, throws if missing). |
| 5. Credentials collected + Supabase setup | ✅ Done | User provided PAT + Anthropic key. Project `seraya1.0` (ref `dulxshbpkivndkjhscui`) is `ACTIVE_HEALTHY` in `ap-southeast-1`. Anon + service-role keys fetched via Management API. All written to `.env` (gitignored). MCP server config NOT yet added — see "Supabase MCP setup" below. |
| 5a. Draft initial migration | ✅ Done | `supabase/migrations/0001_init.sql`. **Applied to live project on 2026-05-16** via Management API SQL endpoint. |
| 6. Convert mock JSON to `supabase/seed.sql` | ✅ Done | Generator at `supabase/scripts/generate-seed.mjs` writes directly to `supabase/seed.sql` (no PowerShell BOM). **Seed applied and verified** — 9 questions, 3 seniors, 1 demo caregiver, 90 check-ins, 564 score rows, 8 alerts. Sivakumar's missed day-7 preserved as `completed=false`. Alert `triggered_at` uses noon SGT (12:00+08) so the UTC-converted date doesn't flip. |
| 7. Push initial commit | ⏳ Pending | Awaiting `pnpm install` completion → lockfile commit → push. |

## File tree as of end of session

```
seraya/
├── .git/                              # local repo, no commits
├── .gitignore                         # excludes .env*, node_modules, .expo, ios, android, *.log, .DS_Store, .supabase, *.key, *.pem, *.p12, *.mobileprovision, *.keystore, *.jks, GoogleService-Info.plist, google-services.json
├── .env.example                       # template only — no real values
├── .npmrc                             # node-linker=hoisted (required for Expo + pnpm)
├── README.md
├── package.json                       # pnpm workspace root, packageManager=pnpm@11.1.2
├── pnpm-workspace.yaml                # packages: apps/*, packages/*
├── tsconfig.base.json                 # strict + noUncheckedIndexedAccess + noImplicitOverride
├── apps/
│   ├── elderly/
│   │   ├── package.json               # @seraya/elderly, expo ~52, expo-router ~4, react-native 0.76, reanimated 3.16
│   │   ├── app.json                   # bundleId care.seraya.elderly, newArchEnabled, typed routes
│   │   ├── tsconfig.json              # extends tsconfig.base.json, paths @/* -> ./*
│   │   ├── babel.config.js            # babel-preset-expo + reanimated/plugin
│   │   └── app/
│   │       ├── _layout.tsx            # GestureHandlerRootView + SafeAreaProvider + Stack
│   │       └── index.tsx              # SERAYA wordmark placeholder
│   └── caregiver/
│       ├── package.json               # @seraya/caregiver — same deps as elderly
│       ├── app.json                   # bundleId care.seraya.caregiver
│       ├── tsconfig.json
│       ├── babel.config.js
│       └── app/
│           ├── _layout.tsx
│           └── index.tsx              # "Seraya Caregiver" placeholder
├── packages/
│   └── shared/
│       ├── package.json               # @seraya/shared, depends on @supabase/supabase-js ^2.45
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts               # barrel
│           ├── supabase.ts            # createClient<Database>, throws if env missing
│           └── types.ts               # placeholder Database type
├── supabase/
│   ├── migrations/                    # empty — schema not designed yet
│   └── seed.sql                       # placeholder comment only
└── docs/
    ├── design-inventory.md            # ~470 lines, 23 screens, full glossary
    └── SESSION-HANDOFF.md             # this file
```

## Credentials state

All collected on 2026-05-16. Stored in `.env` (gitignored). User pasted these in chat, so **rotation after the initial commit is recommended** (see "Security follow-up" below).

| Credential | Status | Stored as | Source |
|---|---|---|---|
| Supabase PAT | ✅ set | `SUPABASE_ACCESS_TOKEN` | User-provided |
| Supabase project URL | ✅ set | `EXPO_PUBLIC_SUPABASE_URL` | User-provided |
| Supabase project ref | ✅ set | `SUPABASE_PROJECT_REF` (=`dulxshbpkivndkjhscui`) | Derived from URL |
| Supabase anon key | ✅ set | `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Fetched via Management API |
| Supabase service role key | ✅ set | `SUPABASE_SERVICE_ROLE_KEY` | Fetched via Management API |
| Anthropic API key | ✅ set | `ANTHROPIC_API_KEY` | User-provided (name: `seraya-claude-insights`) |
| Expo / EAS token | ⏳ deferred | n/a | Skip until device builds are needed |

### Security follow-up (recommend on first opportunity)

Tokens pasted in chat are persisted in the conversation transcript. Rotate after the initial commit:

- **Supabase PAT:** https://supabase.com/dashboard/account/tokens → revoke `seraya-claude-mcp` (or whatever you named it) and generate a fresh one.
- **Anthropic key:** https://console.anthropic.com/settings/keys → revoke `seraya-claude-insights` and create a replacement.
- The Supabase **anon + service-role keys** auto-rotated when you regenerated them in the dashboard would invalidate the seed-only setup. They were fetched, not chosen — re-fetching after a project re-key is the workflow.

## Supabase MCP setup (for next session)

Not yet configured. To enable the Supabase MCP server in Claude Code for future sessions, either:

1. Run `claude mcp add supabase --env SUPABASE_ACCESS_TOKEN=<pat> -- npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref=dulxshbpkivndkjhscui` (recommended: scope to the project + read-only by default for safety).
2. Or edit `.claude/settings.local.json` and add the server block manually.

After config, restart Claude Code. The MCP server exposes tools like `list_projects`, `apply_migration`, `execute_sql`, etc. — preferred over the raw Management API for future migrations.

## Decisions made (so future sessions don't re-litigate)

- **Repo name** `seraya1.0` (user-chosen), private, under `choo-c102`.
- **Package manager** `pnpm` with `node-linker=hoisted` in `.npmrc` (required for Expo + pnpm to work together).
- **Expo SDK** `52`. **React Native** `0.76`. **React** `18.3.1`. **expo-router** `~4.0.0`. **react-native-reanimated** `~3.16.0`.
- **iOS bundle IDs:** `care.seraya.elderly`, `care.seraya.caregiver`. **Android packages:** same.
- **Supabase region** `ap-southeast-1` (Singapore) per the original plan.
- **Login screen `43:245`** treated as deprecated (visual duplicate of `9:964`). Confirm with user later.
- **Trends `11:93` / `33:311` / `33:423`** treated as one screen in different data states, not three routes. Same for heatmap day-detail variants `48:335` / `48:465`.
- **Question types in schema** must support `scale`, `multiselect`, and `binary` (Figma includes a binary question template that mock-data JSON does not).
- **Icon-token → metric-id mapping** (see open questions in `design-inventory.md`): `visions→vision`, `sleeping→sleep`, `slowed-movement→balance` (assumed), `auditory→hearing`, `pain-point→pain`, `toothache→toothache`. No Figma icon for `memory` or `tired` yet.

## Schema decisions (in 0001_init.sql)

Drafted autonomously on 2026-05-16. Tables: `caregivers`, `seniors`, `caregiver_seniors`, `questions`, `questionnaires`, `questionnaire_questions`, `alerts`, `checkins`, `checkin_scores`. Key choices, **all overridable**:

1. **Primary keys** are UUIDs (gen_random_uuid). The mock-data slug (`siti`, `liew`, `siva`) is kept on `seniors.slug` as a stable external key — convenient for seeding deterministically.
2. **`questions.id`** is the **string slug from mock data** (`"vision"`, `"sleep"`, ...), not a UUID. The mock data treats these as stable identifiers and the Figma icon tokens map to them. Keeping it as text keeps seeds + frontend code legible.
3. **`medical_context`** is a single `jsonb` column on `seniors`. Mock data shows two very different shapes (diabetes vs chemo) — splitting into columns would force premature schema decisions.
4. **`question_type` enum** includes `'binary'` even though mock JSON only uses `scale` + `multiselect` — Figma node `33:832` shows a yes/no question (medicine taken?). Wired now so we don't migrate later.
5. **`checkin_scores`** is a single table that uses **either** `score_int` (scale/binary) **or** `selected_options text[]` (multiselect). The check constraint enforces exactly-one. This keeps queries simple and avoids a polymorphic blob.
6. **`alerts.threshold_metric / threshold_condition / consecutive_days`** mirrors the mock-data `threshold` object 1:1, so seeding is direct.
7. **RLS is starter-grade.** Caregivers see their own row + their seniors' check-ins/alerts. Seniors see their own data. **Tighten before production** — write paths beyond `checkins/checkin_scores` insert are intentionally not yet allowed by RLS; add them when the caregiver-write flows (questionnaire builder, alert ack) are designed.
8. **Auth model.** Caregivers MUST link to `auth.users` via `auth_user_id`. Seniors MAY link (some seniors use the elderly app themselves; others are caregiver-managed only — `auth_user_id` is nullable on seniors).

Things the schema does NOT yet handle, deliberately:
- Notifications / push tokens (not in scope for v1).
- Audit log of edits to questionnaires.
- Soft delete (`deleted_at`) — use hard delete + cascades for now; revisit when retention rules are known.

## Open follow-ups / known gaps

1. **Visual verification of Figma screens** — quota was exhausted on 2026-05-16. Re-run the visual inventory pass once the Figma Starter quota resets (or upgrade plan, or export PNGs to `docs/figma-exports/`).
2. **Wizard symbol nodes** (`64:289`–`64:293`) showed 0 children in metadata. Likely empty placeholders — confirm whether the designer has finished them.
3. **Pain-point grid count mismatch** — Figma shows 7 tiles, mock-data lists 12 pain options. UI must scroll or paginate.
4. **No commit yet.** `git status` shows all scaffold files as untracked. The final commit message (per the plan) should be `init: monorepo scaffold`.
5. **No `pnpm install` has been run.** The next session should run it after Supabase env is set, to verify the deps resolve cleanly.
6. **Schema review** — `supabase/migrations/0001_init.sql` was drafted autonomously. User should glance at it before it's applied to a real Supabase project, especially the RLS policies and the `score_int`-vs-`selected_options` split in `checkin_scores`.
7. **Seed UUID mapping** — `supabase/scripts/generate-seed.mjs` hardcodes stable UUIDs for seeded rows so the seed is idempotent and re-runnable: seniors `1111…/2222…/3333…`, questionnaires `aaaa…/bbbb…/cccc…`, demo caregiver `0000…00ca`, check-ins `c0000…01` through `c0000…90`. The demo caregiver has `auth_user_id = null` — link a real Supabase auth user after signup (or run `update caregivers set auth_user_id = '<uuid>' where id = '00000000-0000-0000-0000-0000000000ca'`).
8. **Sivakumar's missed check-in** (day 7, 2026-04-17) is seeded as a row with `completed = false` and zero score rows — preserves the "missed check-in" data point without breaking the unique constraint on (`senior_id`, `checkin_date`).

## Exactly what the next session should do

1. **Read this file first**, then `docs/design-inventory.md`. Skim `supabase/migrations/0001_init.sql` and `supabase/seed.sql` — both drafted autonomously and need user-eye review.
2. **Re-prompt the user for Supabase PAT + project choice** (the question is in chat history but not answered). Don't proceed past this without it.
3. Once the PAT lands:
   - Add Supabase MCP server to Claude Code config and verify `list_projects` works.
   - If user picks "create new": create a Supabase project in `ap-southeast-1` with a user-supplied name + database password. Save URL/anon/service keys.
   - If user picks "existing": ask for the project ref and pull the URL + keys.
   - Write the keys into `.env` (NOT `.env.example`). Re-confirm `.gitignore` excludes `.env`.
4. **Review migration + seed with the user.** Walk through any of the schema decisions in the section below that the user should sign off on (RLS, UUID strategy, `binary` question type, `checkin_scores` shape). If they want changes, edit `0001_init.sql` AND re-run `node supabase/scripts/generate-seed.mjs > supabase/seed.sql`.
5. **Apply migration + seed** against the Supabase project; verify a query returns rows (e.g. `select count(*) from checkins;` → 90).
6. **Run `pnpm install`** to verify the monorepo dependency graph resolves cleanly.
7. **Final safety check** before committing: `git status` must NOT list `.env`. `Get-Content .gitignore | Select-String "^\.env"` must succeed. `git ls-files --others --exclude-standard | Select-String "\.env$"` must return nothing.
    - **Already verified on 2026-05-16:** `git add -n .` dry-run shows 30 files, none of them `.env`, `.claude/`, or anything secret-shaped. Re-run the dry-run anyway after `pnpm install` (which adds `pnpm-lock.yaml`) and after writing real values into `.env`.
8. **Commit and push** to `origin/main`:
    ```sh
    git add .
    git commit -m "init: monorepo scaffold"
    git push -u origin main
    ```

## Mock data source

The user provided `C:\Users\chery\Downloads\seraya-mock-data.json` containing:
- 9 question definitions (`vision`, `sleep`, `appetite`, `balance`, `hearing`, `memory`, `toothache`, `pain`, `tired`) with scale/multiselect types and label dictionaries.
- 3 patients with full profiles, alerts, and 30 days of check-ins each (2026-04-10 → 2026-05-09):
  - **Siti Aminah** (82, female) — generic 8-question questionnaire, has alerts for sleep_decline, appetite_decline, toothache_persistent.
  - **Liew En Ching** (87, female) — pancreatic cancer / FOLFIRINOX chemo regimen, infusion dates 2026-04-12 and 2026-05-10. Alerts: post_chemo_appetite, fatigue_severe, pain_persistent.
  - **Sivakumar Thangiah** (76, male) — type-2 diabetes + neuropathy + hypertension. Plays badminton Tue/Sat. Alerts: vision_blur, neuropathy_pain. Has one missed check-in (day 7).
- Patient `id` field is a string slug (`siti`, `liew`, `siva`). Reuse as the primary key or generate UUIDs and map — ask user.

## Versions / tooling installed this session

- Node `v24.14.1` (pre-existing)
- npm `11.12.1` (pre-existing)
- git `2.47.1.windows.2` (pre-existing)
- pnpm `11.1.2` (installed via `npm i -g pnpm`)
- gh `2.92.0` (installed via `winget install GitHub.cli`)
- gh auth — logged in to `github.com` as `choo-c102`, scopes `gist, read:org, repo`.

## Sanity-check commands the next session can run

```powershell
# Make sure environment is intact
git status
git remote -v
gh auth status
pnpm -v
ls docs/

# Make sure .env safety hasn't regressed
Get-Content .gitignore | Select-String "^\.env"

# Make sure no secrets snuck in
git ls-files --others --exclude-standard | Select-String -Pattern "\.env$|service_role|sbp_|anthropic"
```
