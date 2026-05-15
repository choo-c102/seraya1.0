#!/usr/bin/env node
// Sanity-check the seeded data.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF;

async function q(label, sql) {
  const resp = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const data = await resp.json();
  const rows = data?.value ?? data;
  console.log(`\n=== ${label} ===`);
  if (Array.isArray(rows)) {
    for (const row of rows) console.log(JSON.stringify(row));
  } else {
    console.log(JSON.stringify(rows));
  }
}

await q("Row counts", `select 'questions' as t, count(*)::int from questions
union all select 'caregivers', count(*)::int from caregivers
union all select 'seniors', count(*)::int from seniors
union all select 'caregiver_seniors', count(*)::int from caregiver_seniors
union all select 'questionnaires', count(*)::int from questionnaires
union all select 'questionnaire_questions', count(*)::int from questionnaire_questions
union all select 'alerts', count(*)::int from alerts
union all select 'checkins', count(*)::int from checkins
union all select 'checkin_scores', count(*)::int from checkin_scores
order by t;`);

await q("Seniors", `select slug, name, age, medical_context->>'diagnosis' as diagnosis from seniors order by slug;`);

await q("Siti — last 3 check-ins with scores",
  `select c.checkin_date, c.completed,
   (select jsonb_object_agg(question_id, coalesce(score_int::text, selected_options::text))
    from checkin_scores where checkin_id = c.id) as scores
   from checkins c join seniors s on s.id = c.senior_id
   where s.slug = 'siti' order by c.checkin_date desc limit 3;`);

await q("Liew's alerts",
  `select alert_type, severity, message, triggered_at::date as triggered
   from alerts a join seniors s on s.id = a.senior_id
   where s.slug = 'liew' order by triggered_at;`);

await q("Sivakumar — missed check-in (day 7)",
  `select c.checkin_date, c.completed, c.note,
   (select count(*) from checkin_scores where checkin_id = c.id) as score_count
   from checkins c join seniors s on s.id = c.senior_id
   where s.slug = 'siva' and c.checkin_date = '2026-04-17';`);
