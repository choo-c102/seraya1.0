#!/usr/bin/env node
// Apply a SQL file to a Supabase project via the Management API.
// Usage:  node supabase/scripts/apply-sql.mjs <path-to-sql>
// Reads SUPABASE_ACCESS_TOKEN and SUPABASE_PROJECT_REF from .env.

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
if (!token || !ref) {
  console.error("Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env");
  process.exit(1);
}

const file = process.argv[2];
if (!file) {
  console.error("Usage: node supabase/scripts/apply-sql.mjs <path-to-sql>");
  process.exit(1);
}

const sql = readFileSync(resolve(process.cwd(), file), "utf8");
console.log(`Applying ${file} (${sql.length} chars) to project ${ref}...`);

const resp = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query: sql }),
});

const text = await resp.text();
if (!resp.ok) {
  console.error(`HTTP ${resp.status}: ${text}`);
  process.exit(1);
}
const data = JSON.parse(text);
const rows = data?.value ?? data;
console.log(`OK — ${Array.isArray(rows) ? rows.length : "?"} result row(s).`);
if (Array.isArray(rows) && rows.length && rows.length <= 5) {
  console.log(JSON.stringify(rows, null, 2));
}
