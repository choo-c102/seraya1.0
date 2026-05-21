# Seraya — Session Handoff

> **Convention:** This file MUST be kept current. Update it as the working session approaches a context / plan / token limit, OR at every meaningful milestone, whichever comes first. The cold-start agent reads this file before doing anything else.

Last updated: 2026-05-20 (session compacted — PR #3 open for review).

---

## TL;DR — where we are right now

MVP scaffold is complete and deployed. Both apps are live on Vercel (web) and distributed as Android APKs via EAS. All 23 screens render with mock data. The repo has been pushed to GitHub and a collaborator has been added.

**Current state:**
- `pnpm -r typecheck` passes clean across all 3 workspace packages
- Both Vercel deployments are live (re-deploy manually after code changes — see section below)
- EAS Android builds distributed to testers
- All mock data — nothing is wired to real Supabase reads yet
- **PR #3 open** — `fix/hide-checkin-question-text` — removes descriptive prompt text from elderly check-in screen so seniors see only the condition icon + emoji scale. Awaiting collaborator review at: https://github.com/choo-c102/seraya1.0/pull/3
- Collaborator's `docs/shared-context` branch added collaboration docs; PR from that branch also pending review

**Immediate next session goal:** Wire real Supabase auth + live data (see "Next Milestone" section at the bottom).

---

## What was built — MVP recap

### The monorepo
A single Git repository (`seraya/`) containing two separate React Native apps and a shared package, managed with `pnpm` workspaces:

```
seraya/
  apps/elderly/     ← the senior user's app
  apps/caregiver/   ← the caregiver's app
  packages/shared/  ← design tokens, Supabase client, shared types
  supabase/         ← database schema, seed data, migrations
  docs/             ← Figma exports, design inventory, this file
```

### Tech stack
- **React Native + Expo SDK 52** — cross-platform mobile + web from one codebase
- **Expo Router 4** — file-based routing (like Next.js but for mobile)
- **TypeScript** — strict mode, no `any`
- **pnpm workspaces** — monorepo dependency management
- **Supabase** — Postgres database, auth, real-time (project: `dulxshbpkivndkjhscui`, region: `ap-southeast-1`)
- **Vercel** — static web deployment (exported via `expo export --platform web`)
- **EAS (Expo Application Services)** — cloud Android/iOS builds for device testing

### Screens built (23 total)

**Elderly app** — the senior user's side:
1. Welcome — SERAYA splash with animated spinner and ENTER button
2. Login — email + password (not yet wired to real auth)
3. Check-in — one question at a time with emoji scale (😢→😄), auto-advances
4. Check-in Complete — confirmation screen

**Caregiver app** — the healthcare worker's side:
5. Welcome — same splash
6. Login — same form
7. Dashboard / Select User — list of seniors with status pills (Urgent / Monitor / Positive) + notification bell
8. Trends — line chart, 7D/30D/90D/1Y time range pills, latest check-in summary
9. Heatmap — monthly calendar grid colour-coded by overall daily score
10. Heatmap Day Detail — tapping a day shows individual question scores
11. Insights — collapsible alert cards with suggested actions + healthcare resources
12. Build / Questionnaire List — list of all seniors' questionnaires
13. New Senior form — name, age, gender, diagnosis
14. Question Builder — list of questions for a senior's questionnaire, drag handles, Add/Preview/Save
15. Question Wizard Step 1 — pick an emoji to represent the condition
16. Question Wizard Step 2 — write a description
17. Question Wizard Step 3 — pick response type (scale / yes-no / pain location)
18. Question Wizard Step 4 — set alert threshold (consecutive days)
19. Question Wizard Step 5 — confirmation / create another

### Design system
All colours, font sizes, spacing, radii, and icon keys live in one file:
`packages/shared/src/design-tokens.ts`

Components import from `@seraya/shared` — no hardcoded hex values or magic pixel numbers anywhere in screen files.

### What is NOT wired yet (mock data only)
Every screen currently reads from a static JSON file:
`supabase/seed-data/seraya-mock-data.json`

This contains 3 fictional seniors (Siti, Liew, Sivakumar) with 30 days of check-in history, alerts, and questionnaire data. The abstraction layer is `apps/<app>/lib/mock-data.ts` — swapping to live Supabase reads means only changing that file, not the screens.

---

## Collaborator onboarding guide

> **Hi! This section is written for you.** You don't need to understand everything at once — follow the steps in order and you'll be up and running.

---

### Step 1 — Get the tools installed (one-time setup)

You need four things on your computer if you want to work directly on the code.

**1a. Git (essential)** (tracks code changes — GitHub needs this)
Download from: https://git-scm.com
You can also install **GitHub Desktop** (https://desktop.github.com) which gives you a visual interface for Git — recommended if you're new to it.

**1b. VS Code (optional)** (your code editor if you want to work directly on the code, else just use your AI)
Download from: https://code.visualstudio.com
This is where you'll open and edit files.

**1c. Node.js (essential)** (the engine that runs the app)
Download the "LTS" version from: https://nodejs.org
After installing, open a terminal (search "Terminal" or "PowerShell" on your computer) and type:
```
node --version
```
If you see a number like `v20.x.x`, you're good.

**1d. pnpm (essential)** (the package manager this project uses — like npm but faster)
In your terminal, type:
```
npm install -g pnpm
```

---

### Step 2 — Get the code onto your computer

**Option A: GitHub Desktop (easier)**
1. Open GitHub Desktop
2. Click File → Clone Repository
3. Paste the repo URL (ask Cheryl for it)
4. Choose where to save it on your computer
5. Click Clone

**Option B: Terminal (preferred)**
```
open the folder where you want the project to live
git clone https://github.com/choo-c102/seraya.git
cd seraya
```

---

### Step 3 — Install the project dependencies

Open your terminal, navigate to the project folder, then run:
```
pnpm install
```
This downloads all the libraries the project needs. It might take 2–3 minutes the first time.

---

### Step 4 — Set up your environment file

The project needs secret keys to connect to the database. These are NOT in the code (for security reasons).

1. In the project root folder, you'll see a file called `.env.example`
2. Make a copy of it and rename the copy to `.env`
3. Ask Cheryl for the actual values to fill in

Your `.env` file should look like:
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

### Step 5 — Run the apps locally

Open two terminal windows. In the first:
```
pnpm elderly:web
```
Then open your browser and go to: `http://localhost:8081`

In the second terminal:
```
pnpm caregiver:web
```
Then go to: `http://localhost:8082`

The first time takes 20–30 seconds to load (it's compiling). After that, changes you save in the code will update automatically in the browser.

---

### Step 6 — Make a change and see it live

Try changing some text:

1. Open `apps/elderly/app/welcome.tsx` in VS Code
2. Find the line that says `Tall as wisdom. Rooted in care.`
3. Change the text to something else
4. Save the file (Ctrl+S / Cmd+S)
5. Watch the browser at `http://localhost:8081/welcome` — it updates within a second

That's the basic loop: edit → save → see it in the browser.

---

### Step 7 — Create your own branch before editing

**Important:** please do not work directly on `main`. `main` is the stable version Cheryl reviews from. Create your own branch first, make your design changes there, then push that branch to GitHub for Cheryl to review.

A branch is like your own safe copy of the project. You can experiment freely without changing the main repo until Cheryl approves and merges it.

#### Option A: GitHub Desktop (easier)
1. Open GitHub Desktop.
2. Make sure the current repository is `seraya`.
3. At the top, click the current branch name. It may say `main`.
4. Click **New Branch**.
5. Name it clearly, for example:
   - `design/dashboard-polish`
   - `design/elderly-welcome-screen`
   - `design/colour-system-refresh`
6. Click **Create Branch**.
7. Make your changes in VS Code / Claude Code.
8. When ready, go back to GitHub Desktop.
9. Write a short summary of your change in the bottom-left commit box.
10. Click **Commit to [your-branch-name]**.
11. Click **Publish branch** or **Push origin**.
12. On GitHub, open a Pull Request and tag Cheryl to review.

#### Option B: Terminal
From the repo root:

```bash
# Make sure you have the latest stable version first
git checkout main
git pull origin main

# Create and switch to your own branch
git checkout -b design/short-description
```

After making changes:

```bash
# Check what changed
git status

# Stage, commit, and push your branch
git add -A
git commit -m "Polish caregiver dashboard UI"
git push -u origin design/short-description
```

Then go to GitHub and open a Pull Request from your branch into `main`. Cheryl will review the diff and merge it if everything looks good.

#### Pull Request checklist before asking Cheryl to review
- Run `pnpm -r typecheck` from the repo root.
- Open both apps locally and check the changed screens in the browser.
- Do not commit `.env`, secrets, API keys, screenshots with private data, or generated build folders like `dist/` unless Cheryl specifically asks.
- Keep each branch focused. Example: one branch for colour tokens, another branch for dashboard layout polish.
- If your branch is old, update it before pushing final changes:

```bash
git checkout main
git pull origin main
git checkout design/short-description
git merge main
```

---

### Step 8 — Deploy your changes to Vercel (or ask Cheryl to deploy)

After pushing to GitHub, the live URLs won't update automatically. You need to manually re-deploy. In PowerShell, run each line one at a time:

```powershell
cd C:\path\to\seraya\apps\caregiver
npx expo export --platform web
vercel dist --prod
```

```powershell
cd C:\path\to\seraya\apps\elderly
npx expo export --platform web
vercel dist --prod
```

---

## How to make UI changes — asset guide for designers

You don't need to understand the full codebase to make visual changes. Here's where everything lives.

### Changing colours

Open: `packages/shared/src/design-tokens.ts`

Find the `colors` object near the top. Every colour has a name and a hex value, for example:
```ts
accent: "#1B5C4F",       // the main teal/green brand colour
background: "#F1E8DA",   // the warm cream background
textPrimary: "#1A1A1A",  // near-black text
```

Change the hex value and it updates everywhere that colour is used across both apps.

**Tip:** Use https://coolors.co or https://paletton.com to find colours that work together.

### Changing font sizes and weights

Also in `design-tokens.ts`, find the `typography` object:
```ts
h1: { size: 28, weight: "700", ... },
body: { size: 16, weight: "400", ... },
```
`size` is in pixels. `weight` is like CSS font-weight: `"400"` = regular, `"700"` = bold.

### Changing spacing and padding

Also in `design-tokens.ts`, find the `spacing` object:
```ts
xs: 4,   // tiny gap
sm: 8,   // small gap
md: 12,  // medium gap
lg: 16,  // large gap
xl: 24,  // extra large
```

### Changing icons

The project uses **Lucide** icons — a free, open-source icon library.

To browse all available icons: https://lucide.dev/icons/
Just search for what you want (e.g. "heart", "calendar", "alert").

To use an icon in code, find its name on the website (e.g. "HeartPulse") and use it as:
```
"lucide:HeartPulse"
```

Icons are referenced as strings in the code. Search for `"lucide:` in any screen file to see examples.

### Changing emojis

Emojis are just regular characters typed directly in the code. To find the right emoji:
- **Emojipedia:** https://emojipedia.org — search, copy, paste directly into the code
- **Windows:** press `Win + .` to open the emoji picker
- **Mac:** press `Cmd + Ctrl + Space`

In `design-tokens.ts`, the `conditionIcons` object maps health conditions to their icons:
```ts
toothache: "emoji:🦷",
vision: "lucide:Eye",
sleep: "lucide:MoonStar",
```

To change the toothache emoji from 🦷 to something else, just replace the character inside the quotes.

### Changing screen text

Every screen file lives in `apps/elderly/app/` or `apps/caregiver/app/`. Open any `.tsx` file and look for text inside `<Text>` tags — that's what shows on screen. Change it and save.

### Changing images / illustrations

The brand tree illustration is a hand-coded SVG in:
`apps/elderly/components/BrandTreesMark.tsx`
`apps/caregiver/components/BrandTreesMark.tsx`

The body pain silhouette is in:
`apps/caregiver/components/BodyPainMap.tsx`

These can be replaced with proper SVG files from a design tool (Figma → export as SVG → paste paths into the component). Flag this for Claude Code to do if the SVG is complex.

### The Figma source files

The original design mockups are stored as PNG exports in:
`docs/figma-exports/` (23 files, one per screen)

Refer to these whenever you're unsure what a screen should look like.

---

## Claude workflow for design collaborators

Claude can help with design exploration, code edits, file creation, and codebase-aware implementation. For this project, use Claude as a design partner first, then as a careful code-editing assistant.

### Which Claude tool to use for what

**Claude Desktop / Claude web app** — best for early design thinking:
- Brainstorm screen improvements, accessibility changes, onboarding copy, colour palettes, and layout options.
- Upload screenshots or Figma exports and ask for critique.
- Create design briefs, UI checklists, component inventories, and before/after notes.
- Use Artifacts when you want Claude to draft a visual mockup, HTML prototype, one-pager, or design document.

**Claude Code** — best for working inside the repo:
- Ask it to inspect the existing files before changing anything.
- Ask it to edit `design-tokens.ts`, screen `.tsx` files, and component files.
- Ask it to run `pnpm -r typecheck` after changes.
- Ask it to summarize exactly what files changed before you commit.

**Claude Design** — best for polished visual exploration before coding:
- Use it to create moodboards, refined mobile screen concepts, app presentation visuals, and design directions.
- Keep outputs as references unless Cheryl asks you to implement them directly.
- Translate final design decisions back into concrete repo changes: colours, typography, spacing, screen copy, icons, and components.

### Recommended Claude setup for this project

1. Open Claude Code from the repo root, not from a subfolder:

```bash
cd <path to root folder where you saved seraya>
claude
```

2. Tell Claude Code to read the project context first:

```text
Please read CLAUDE.md and docs/SESSION-HANDOFF.md first. Do not edit files yet. Summarize the project structure, design system, and which files control the UI.
```

3. Create or switch to your own branch before asking Claude Code to edit files:

```bash
git checkout main
git pull origin main
git checkout -b design/dashboard-polish
```

4. Keep Claude's tasks small and specific. Good examples:

```text
Inspect the caregiver dashboard screen and design tokens. Suggest a cleaner card hierarchy, but do not edit files yet.
```

```text
Update only the caregiver dashboard spacing and card styling using existing design tokens. Do not introduce hardcoded colours. After editing, run pnpm -r typecheck.
```

```text
Compare apps/caregiver/app/dashboard.tsx against docs/figma-exports/dashboard.png. List visual mismatches first. Wait for approval before editing.
```

5. After Claude Code edits files, ask it for a review summary:

```text
Summarize every file you changed, why you changed it, and any risks. Also tell me what I should manually test in the browser.
```

### Using Claude Skills safely

Skills are reusable instruction packs that teach Claude how to do a specific type of work. Use them to make Claude more consistent, but still review its output carefully.

For this project, useful skill categories are:
- **Design system skill** — keeps colours, typography, spacing, radius, and icon choices aligned to `packages/shared/src/design-tokens.ts`.
- **React Native UI skill** — reminds Claude to use React Native `StyleSheet`, Expo Router conventions, and mobile-friendly layouts.
- **Accessibility skill** — checks contrast, tap target size, readable text, reduced cognitive load for elderly users, and caregiver dashboard clarity.
- **Code review skill** — asks Claude to inspect diffs for accidental hardcoded values, broken routes, TypeScript errors, or risky changes.

Example prompt:

```text
Use the design-system and accessibility skills. Review the elderly check-in screen for readability, tap target size, colour contrast, and emotional tone. Do not edit files yet; give recommendations first.
```

If a skill suggests changing many files, ask Claude to split the work into small steps and start with one screen only.

### Using Claude tools / MCPs for design work

Use project-aware tools only when they are relevant. Do not connect unnecessary tools for a simple UI text or spacing change.

High-value tools for this project:
- `imagegen-frontend-mobile` — generate mobile UI references before implementation.
- `design-taste-frontend` — review whether layouts feel polished and coherent.
- `minimalist-ui` — useful for the elderly app's clean, high-contrast interface.
- `high-end-visual-design` — useful for the caregiver dashboard and presentation-quality screens.
- `mcp__claude_ai_Google_Drive` — pull updated Figma exports or design assets from Drive if they are stored there.
- `security-review` — use only for privacy/security-sensitive changes, especially before anything involving real health data.

Suggested workflow:
1. Ask Claude Desktop / Claude Design for 2–3 visual directions.
2. Pick one direction and write a tiny implementation brief.
3. Open Claude Code in the repo.
4. Ask Claude Code to inspect the relevant screen and tokens.
5. Ask it to implement only the selected change.
6. Run the app locally and check it yourself.
7. Commit to your branch and push for Cheryl's review.

### Guardrails when using Claude on this repo

- Always ask Claude to inspect before editing.
- Never let Claude commit directly to `main`.
- Never paste real patient data, private credentials, API keys, or `.env` values into Claude prompts.
- Prefer changing `design-tokens.ts` when a colour, font, spacing, or radius should update everywhere.
- Prefer changing one screen/component when the change is local.
- After every code-editing session, run:

```bash
pnpm -r typecheck
```

- Manually test the changed screens in the browser before opening a Pull Request.

### Good design prompts for Seraya

```text
Act as a senior mobile UI designer. Review this elderly check-in screen for an older Malaysian user who may have low tech confidence. Suggest improvements for clarity, warmth, tap target size, and visual calm. Keep the existing Seraya brand direction.
```

```text
Act as a caregiver dashboard designer. Improve the information hierarchy so urgent seniors, latest check-ins, and alerts are easier to scan. Keep the UI minimal and avoid a hospital-software look.
```

```text
Review these colours against accessibility and emotional tone. The app should feel calm, trustworthy, warm, and not clinical. Suggest a refined palette using the existing tokens.
```

```text
Before editing, inspect the current screen and design tokens. Then propose a small implementation plan. Only change files after I approve the plan.
```

---

## Recommended skills and tools

### For UI/UX work on this project

**Must-learn basics:**
- **React Native StyleSheet** — how components are styled (it's like CSS but with JavaScript objects). Read: https://reactnative.dev/docs/style
- **Expo Router** — how screens and navigation work. Read: https://docs.expo.dev/router/introduction/
- **Flexbox** — how layouts are structured. This interactive guide is excellent: https://flexboxfroggy.com

**VS Code extensions to install:**
- **Prettier** — auto-formats your code so it stays tidy
- **ESLint** — flags code mistakes before you run it
- **React Native Tools** — syntax highlighting and snippets for RN code
- **GitLens** — shows who changed what and when, great for collaboration
- **Tailwind CSS IntelliSense** — not used here yet but useful context

**Design tools:**
- **Figma** — industry standard for UI design. Free tier is enough. Use it to mock up changes before coding them. https://figma.com
- **Figma → VS Code plugin** — lets you copy CSS values and colours straight from Figma into code
- **Coolors** — colour palette generator: https://coolors.co
- **Font Pair** — if you ever want to try different typography: https://www.fontpair.co

**Icon resources:**
- **Lucide** (already in the project): https://lucide.dev/icons/
- **Phosphor Icons** (nice alternative): https://phosphoricons.com
- **Heroicons**: https://heroicons.com

**Emoji resources:**
- **Emojipedia**: https://emojipedia.org

### For backend work (Supabase / data)

**Must-use MCP tools inside Claude Code:**
- `supabase:supabase` — full Supabase schema, migrations, RLS, auth. Trigger on any Supabase task.
- `mcp__plugin_supabase_supabase` — inspect tables, run migrations, manage auth users without leaving Claude Code
- `supabase:supabase-postgres-best-practices` — optimize queries, indexes, RLS policies
- `security-review` — CLAUDE.md flags RLS policies as starter scaffolding. Healthcare data needs a proper security audit before going live.

**High-value design MCPs for future sessions:**
- `imagegen-frontend-mobile` — generate premium screen references for elderly and caregiver flows before coding them
- `design-taste-frontend` — enforces proper component architecture and RN styling rules
- `minimalist-ui` — strong match for the elderly app's high-contrast, clean typographic style
- `high-end-visual-design` — prevents generic AI-design look on the caregiver dashboard
- `mcp__claude_ai_Google_Drive` — pull updated Figma export assets from Drive into the session

**Learning resources:**
- Supabase docs: https://supabase.com/docs
- Supabase Auth guide: https://supabase.com/docs/guides/auth
- Row Level Security guide: https://supabase.com/docs/guides/auth/row-level-security

---

## Next milestone — real Supabase auth + live data

> **For the next Claude Code session:** implement a real-world workflow where a caregiver signs up, registers an elder, builds a questionnaire, and the elder's check-ins are recorded and reflected on the caregiver's dashboard.

### What needs to be built

**1. Authentication (both apps)**
- Wire the login screen to `supabase.auth.signInWithPassword()`
- Wire "Register" to `supabase.auth.signUp()`
- Store the session and redirect to the correct home screen on success
- Add `supabase.auth.signOut()` to a settings or logout button
- Protect routes — if not logged in, redirect to `/welcome`

**2. Caregiver registers a senior (links them together)**
- The "New Senior" form (`/build/new-senior`) currently does nothing on submit
- On save: insert a row into the `patients` table with the `caregiver_id` set to the logged-in caregiver's user ID
- Generate a login code or invite link for the senior

**3. Senior is paired to caregiver account**
- The elderly app's login needs to look up the senior's `patient_id` from Supabase after sign-in
- All subsequent check-in writes should include that `patient_id`

**4. Check-in writes to Supabase**
- The elderly app's `/checkin` route currently cycles through mock questions
- On each answer: `insert` into a `checkin_responses` table
- On completion: mark the `checkins` row as `completed: true`

**5. Questionnaire builder persists to Supabase**
- The wizard (step 1–5) currently saves to an in-memory store (`wizard-store.ts`) that resets on reload
- On step 5 "Save": insert the new question into the `questions` table and link it to the senior's questionnaire

**6. Dashboard reads live data**
- Replace the mock-data helpers in `apps/caregiver/lib/mock-data.ts` with real Supabase queries
- The helper signatures (`getSenior(slug)`, `getLatestCheckin(senior)`, etc.) are the abstraction boundary — only the implementations inside those functions need to change, not the screens

**7. RLS (Row Level Security) policies**
- Caregivers should only be able to read/write data for their own seniors
- Seniors should only be able to read/write their own check-in data
- The current migrations in `supabase/migrations/0001_init.sql` have starter RLS — tighten before production
- Use the `security-review` MCP and `supabase:supabase` skill for this

**8. Alerts / notifications (real-time)**
- Currently alerts are hardcoded in the mock JSON
- Real alerts: a Supabase Edge Function or Postgres trigger should evaluate consecutive-days thresholds after each check-in is completed and insert into an `alerts` table
- The notification panel in the dashboard should query this table

### Abstraction boundary (don't change screens, only change data layer)

```
apps/caregiver/lib/mock-data.ts   ← swap implementations here
apps/elderly/lib/mock-data.ts     ← and here

packages/shared/src/supabase.ts   ← lazy Supabase client (already set up)
```

The Supabase client is already initialised as a lazy Proxy in `packages/shared/src/supabase.ts`. Call it with `getSupabase().from('patients').select(...)` etc.

---

## Verified routes (current state — with mock data)

`pnpm -r typecheck` passes across all 3 workspace packages.

**Elderly** (port 8081):
- `/welcome` → ENTER goes directly to `/login` (role-select removed)
- `/login` — brand + email + password + Sign In
- `/checkin` — Siti's first unanswered question with emoji scale
- `/checkin/complete` — completion screen

**Caregiver** (port 8082):
- `/welcome` → ENTER goes directly to `/login` (role-select removed)
- `/login` — login form
- `/dashboard` — SELECT USER + 3 seniors + notification bell (opens panel)
- `/dashboard/siti/trends` — line chart + alert banner + time range pills
- `/dashboard/siti/heatmap` — monthly calendar heatmap
- `/dashboard/siti/heatmap-day/2026-05-09` — day detail
- `/dashboard/siti/insights` — collapsible AlertCards (collapsed by default)
- `/build` — questionnaire list
- `/build/new-senior` — new senior form
- `/build/senior/siti/questionnaire/generic-8q` — question builder
- `/build/senior/:id/questionnaire/:questionnaireId/wizard/step-1-emoji` — emoji picker
- `/build/senior/:id/questionnaire/:questionnaireId/wizard/step-2-describe`
- `/build/senior/:id/questionnaire/:questionnaireId/wizard/step-3-response`
- `/build/senior/:id/questionnaire/:questionnaireId/wizard/step-4-threshold`
- `/build/senior/:id/questionnaire/:questionnaireId/wizard/step-5-done`

> **Wizard URL note (FIXED):** The wizard IS nested under `[questionnaireId]` in the file system. Correct URL format: `/build/senior/siti/questionnaire/generic-8q/wizard/step-1-emoji`. Both `seniorId` and `questionnaireId` are available as URL params in all wizard steps.

---

## Open items / polish list

1. **Wire to Supabase** — the #1 priority for the next session. See "Next Milestone" above.
2. **BodyPainMap silhouettes** — geometric shapes (circle head, polygon torso). Replace with proper line-art SVGs.
3. **BrandTreesMark** — hand-rolled inline SVG. Closer to Figma than expected but not a faithful trace.
4. **TrendLineChart** — plain `react-native-svg`, no markers/tooltips/axis polish. Needs `victory-native` or `react-native-skia` for production.
5. **Wizard step 4 slider** — 10-cell tap-dot row, not a real draggable slider. Replace with `@react-native-community/slider`.
6. **Drag-reorder in Question Builder** — `GripVertical` icon is visual only. Wire `react-native-draggable-flatlist` for real drag-and-drop.
7. **Date-range pills** — 90D/1Y/Custom pills cap to 30 days of mock data. Extend mock data or hide longer ranges until real data exists.
8. **Typed routes** — off in both `app.json`s. Re-enable after a full `npx expo start` regenerates `.expo/types/router.d.ts`.
9. **`shadow*` deprecation warnings** — fills dev console on web. Migrate `shadows` token in `design-tokens.ts` to use `boxShadow` (or split per platform).
10. **Secrets rotation** — Supabase PAT and Anthropic key were pasted in plaintext in session #1 chat history. Rotate at https://supabase.com/dashboard/account/tokens and https://console.anthropic.com/settings/keys.

---

## Known quirk — Claude Preview screenshot tool

The `mcp__Claude_Preview__preview_screenshot` tool works reliably **only on the first navigation after a fresh `preview_start`**. After any navigation, it times out at 30s even though the page is fully rendered.

**Workaround:** use `mcp__Claude_Preview__preview_eval` with `document.querySelector('#root')?.innerText` for content verification. Use screenshots only for the first load.

---

## Resume commands

```powershell
# Sanity check (run from repo root)
cd C:\Users\chery\projects\seraya
pnpm -r typecheck

# Run apps locally
pnpm elderly:web      # → http://localhost:8081
pnpm caregiver:web    # → http://localhost:8082

# Push current branch to remote for review
# First check which branch you are on:
git branch --show-current

# Then push your branch:
git push -u origin <your-branch-name>
```

## Vercel deployment (re-deploy after every code change)

Both apps are deployed as static Expo web exports. **Vercel does NOT auto-update** — every time code changes you must manually re-export and re-deploy.

**IMPORTANT:** `expo export` wipes and recreates `dist/` every time, which removes the Vercel project link. You must copy the `.vercel` config into `dist/` after each export before deploying. Run in PowerShell, one line at a time:

```powershell
# Caregiver app → https://seraya-caregiver.vercel.app
cd C:\Users\chery\projects\seraya\apps\caregiver
npx expo export --platform web
mkdir -p dist/.vercel
cp .vercel/project.json dist/.vercel/project.json
vercel dist --prod

# Elderly app → https://seraya-elderly.vercel.app
cd C:\Users\chery\projects\seraya\apps\elderly
npx expo export --platform web
mkdir -p dist/.vercel
cp .vercel/project.json dist/.vercel/project.json
vercel dist --prod
```

- The `.vercel/project.json` files in each app folder are the persistent project links — do not delete them
- Elderly project ID: `prj_ngpzBgjbTJV1Q5KNDnVokfTXTPjM`
- To tear down: `vercel rm <project-name>` or delete from the Vercel dashboard

## EAS (Android builds for device testing)

EAS does NOT auto-update either. After significant changes, build a new APK:

```powershell
cd C:\Users\chery\projects\seraya\apps\caregiver
eas build --profile preview --platform android

cd C:\Users\chery\projects\seraya\apps\elderly
eas build --profile preview --platform android
```

Builds take 10–20 min in the cloud. EAS generates a new shareable link + QR code. Testers download and install the new APK manually.

---

## Key files cheat-sheet

| What | Where |
|---|---|
| Project conventions | `CLAUDE.md` (repo root) |
| Design tokens (colours, fonts, spacing, icons) | `packages/shared/src/design-tokens.ts` |
| Figma source mockups | `docs/figma-exports/*.png` (23 PNGs) |
| Design inventory (screen audit) | `docs/design-inventory.md` |
| Mock data (3 seniors × 30 days) | `supabase/seed-data/seraya-mock-data.json` |
| Mock data helpers | `apps/<app>/lib/mock-data.ts` |
| Supabase client (lazy) | `packages/shared/src/supabase.ts` |
| Supabase schema | `supabase/migrations/0001_init.sql` |
| Supabase seed | `supabase/seed.sql` |
| Elderly app screens | `apps/elderly/app/` |
| Caregiver app screens | `apps/caregiver/app/` |
| Shared components | `apps/<app>/components/` |
| Preview launch configs | `.claude/launch.json` |

## Environment

- `.env` at repo root — real Supabase URL / anon key / service role key / PAT + Anthropic key. **Not in git.** Each developer creates their own from `.env.example`.
- Node 20+, pnpm 11.1.2
- Supabase project ID: `dulxshbpkivndkjhscui` (region: `ap-southeast-1`)

---

## 2026-05-20 Docs Branch Update

- Current branch: `docs/shared-context`.
- Latest milestone: added shared context docs, MVP question/resource docs, ignored raw Notion exports, and added collaboration workflow docs.
- Exact next action: open or refresh the PR from `docs/shared-context` into `main`, then ask Cheryl to review.
- Verified facts: `.env`, `.obsidian/`, `Notion Resources/`, and `docs/context/*.local.md` are ignored; `AGENTS.md` is a symlink to `CLAUDE.md`.
- Known live issue: no code typecheck was run for docs-only changes.
- Suggested commit message: `docs: add collaboration workflow`.
- Uncommitted-file diff snapshot before this commit: `CONTRIBUTING.md`, `CLAUDE.md`, and this handoff update.
