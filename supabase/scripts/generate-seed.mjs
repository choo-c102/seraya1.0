#!/usr/bin/env node
// Generates supabase/seed.sql from supabase/seed-data/seraya-mock-data.json.
// Run from repo root:  node supabase/scripts/generate-seed.mjs
// (writes to supabase/seed.sql directly — no BOM, LF line endings)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(here, "..", "seed-data", "seraya-mock-data.json");
const data = JSON.parse(readFileSync(dataPath, "utf8"));

const SENIOR_UUIDS = {
  siti: "11111111-1111-1111-1111-111111111111",
  liew: "22222222-2222-2222-2222-222222222222",
  siva: "33333333-3333-3333-3333-333333333333",
};

const DEMO_CAREGIVER_UUID = "00000000-0000-0000-0000-0000000000ca";

const QNAIRE_UUIDS = {
  "generic-8q": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  "pancreatic-cancer-symptom": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
  "diabetes-monitoring": "cccccccc-cccc-cccc-cccc-cccccccccccc",
};

const quote = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const jsonLit = (v) => (v === null || v === undefined ? "null" : `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`);
const arrayLit = (arr) => {
  if (!arr || arr.length === 0) return "'{}'::text[]";
  const items = arr.map((s) => `"${String(s).replace(/"/g, '\\"')}"`).join(",");
  return `'{${items}}'::text[]`;
};

const lines = [];
const out = (s = "") => lines.push(s);

out("-- Seraya seed data");
out(`-- Generated from supabase/seed-data/seraya-mock-data.json`);
out(`-- Source date range: ${data.metadata.date_range.start} → ${data.metadata.date_range.end}`);
out(`-- ${data.patients.length} seniors × ~30 days of check-ins`);
out("--");
out("-- Run AFTER 0001_init.sql has been applied.");
out("-- Truncates target tables to be re-runnable.");
out("");

out("begin;");
out("");
out("truncate table checkin_scores, checkins, alerts, questionnaire_questions, questionnaires, caregiver_seniors, seniors, caregivers, questions restart identity cascade;");
out("");

// Questions ---------------------------------------------------------------
out("-- Questions");
for (const q of Object.values(data.questions)) {
  out(
    `insert into questions (id, text, type, scale, icon, options, labels) values (${quote(q.id)}, ${quote(q.text)}, ${quote(q.type)}, ${quote(q.scale ?? null)}, ${quote(q.icon)}, ${q.options ? jsonLit(q.options) : "null"}, ${jsonLit(q.labels)});`
  );
}
out("");

// Demo caregiver (orphan — not yet linked to auth.users) -----------------
out("-- Demo caregiver (auth_user_id null; link to a real Supabase auth user after signup)");
out(
  `insert into caregivers (id, auth_user_id, name, email) values (${quote(DEMO_CAREGIVER_UUID)}, null, 'Demo Caregiver', 'caregiver@seraya.local');`
);
out("");

// Seniors -----------------------------------------------------------------
out("-- Seniors");
for (const p of data.patients) {
  const id = SENIOR_UUIDS[p.id];
  if (!id) throw new Error(`No stable UUID mapped for senior slug "${p.id}"`);
  const med = p.medical_context ?? null;
  out(
    `insert into seniors (id, slug, name, initials, age, gender, avatar_color, medical_context) values (${quote(id)}, ${quote(p.id)}, ${quote(p.name)}, ${quote(p.initials)}, ${p.age}, ${quote(p.gender)}, ${quote(p.avatar_color)}, ${med ? jsonLit(med) : "null"});`
  );
}
out("");

// Caregiver↔senior links -------------------------------------------------
out("-- Demo caregiver manages all 3 seniors");
for (const p of data.patients) {
  out(
    `insert into caregiver_seniors (caregiver_id, senior_id, relationship) values (${quote(DEMO_CAREGIVER_UUID)}, ${quote(SENIOR_UUIDS[p.id])}, 'primary');`
  );
}
out("");

// Questionnaires + questionnaire_questions -------------------------------
out("-- Questionnaires");
for (const p of data.patients) {
  const q = p.questionnaire;
  const qid = QNAIRE_UUIDS[q.id];
  if (!qid) throw new Error(`No stable UUID mapped for questionnaire slug "${q.id}"`);
  out(
    `insert into questionnaires (id, slug, name, senior_id, is_active) values (${quote(qid)}, ${quote(q.id)}, ${quote(q.name)}, ${quote(SENIOR_UUIDS[p.id])}, true);`
  );
  q.questions.forEach((qstId, idx) => {
    out(
      `insert into questionnaire_questions (questionnaire_id, question_id, position) values (${quote(qid)}, ${quote(qstId)}, ${idx + 1});`
    );
  });
}
out("");

// Alerts ------------------------------------------------------------------
out("-- Alerts");
for (const p of data.patients) {
  for (const a of p.alerts ?? []) {
    const t = a.threshold ?? {};
    out(
      `insert into alerts (senior_id, alert_type, severity, status, message, triggered_at, threshold_metric, threshold_condition, consecutive_days) values (${quote(SENIOR_UUIDS[p.id])}, ${quote(a.type)}, ${quote(a.severity)}, 'active', ${quote(a.message)}, ${quote(a.triggered_date + " 12:00:00+08")}::timestamptz, ${quote(t.metric ?? null)}, ${quote(t.condition ?? null)}, ${t.consecutive_days ?? "null"});`
    );
  }
}
out("");

// Check-ins + scores -----------------------------------------------------
out("-- Check-ins + scores");
let checkinCounter = 0;
for (const p of data.patients) {
  const seniorId = SENIOR_UUIDS[p.id];
  for (const c of p.checkins) {
    checkinCounter += 1;
    const checkinId = `c0000000-0000-0000-0000-${String(checkinCounter).padStart(12, "0")}`;
    const completedAt = c.completed && c.time
      ? `${c.date}T${c.time}:00+08:00`
      : null;
    const note = c.note ?? null;
    out(
      `insert into checkins (id, senior_id, checkin_date, completed, completed_at, note) values (${quote(checkinId)}, ${quote(seniorId)}, ${quote(c.date)}::date, ${c.completed ? "true" : "false"}, ${completedAt ? quote(completedAt) + "::timestamptz" : "null"}, ${quote(note)});`
    );
    if (c.completed && c.scores) {
      for (const [questionId, value] of Object.entries(c.scores)) {
        if (Array.isArray(value)) {
          // Multiselect — store selected_options text[]
          out(
            `insert into checkin_scores (checkin_id, question_id, score_int, selected_options) values (${quote(checkinId)}, ${quote(questionId)}, null, ${arrayLit(value)});`
          );
        } else if (typeof value === "number") {
          // Scale / binary — store score_int
          out(
            `insert into checkin_scores (checkin_id, question_id, score_int, selected_options) values (${quote(checkinId)}, ${quote(questionId)}, ${value}, null);`
          );
        }
      }
    }
  }
}
out("");

out("commit;");
out("");
out(`-- ${checkinCounter} check-ins generated`);

const outPath = resolve(here, "..", "seed.sql");
writeFileSync(outPath, lines.join("\n"), { encoding: "utf8" });
console.log(`Wrote ${outPath} (${lines.length} lines, ${checkinCounter} check-ins).`);
