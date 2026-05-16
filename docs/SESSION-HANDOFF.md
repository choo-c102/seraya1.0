# Seraya — Session Handoff

> **Convention:** This file MUST be kept current. Update it as the working session approaches a context / plan / token limit, OR at every meaningful milestone, whichever comes first. The cold-start agent reads this file before doing anything else.

Last updated: 2026-05-16 (after the screen-scaffold milestone landed and was committed).

---

## TL;DR — where we are right now

Three commits on `main`, **all clean**. Nothing uncommitted. Both apps preview in the browser; every route in `docs/design-inventory.md` is reachable and renders with mock data wired through.

```
026b675 feat: scaffold all 23 routes wired to mock data        ← HEAD
dc0a352 feat: web preview + visual audit + design tokens
c7f5300 init: monorepo scaffold
```

**Not pushed to `origin/main` yet** — the user hasn't asked for it.

## Verified end-to-end (don't redo)

`pnpm -r typecheck` passes across all 3 workspace packages. Both apps' dev bundles compile (~10.5 MB) and production bundles export cleanly (~3.6 MB). All routes below were content-verified via DOM eval on a live web preview:

**Elderly** (port 8081):
- `/` → `/welcome` redirect ✓
- `/welcome` — SERAYA splash + line-art trees + ENTER pill (screenshot captured in chat)
- `/role-select` — WHO ARE YOU? + Senior / Caregiver tiles + Borneo caption
- `/login` — brand + email + password + Sign In + Forgot/Register/Guest links
- `/checkin` — auto-routes to Siti's first unanswered question: "1/8 How is your vision today? 😢 😟 😐 🙂 😄"
- `/checkin/complete` — "Check-in complete! 16 May 2026 · 11:49 pm Done"

**Caregiver** (port 8082):
- `/` → `/welcome` redirect ✓
- `/welcome`, `/role-select`, `/login` — same auth flow as elderly
- `/dashboard` — "SELECT USER" + 3 seniors: Siti (Monitor pill), Liew (Urgent pill), Sivakumar (Monitor pill), each with last-checkin times and avatar initials
- `/dashboard/siti/trends` — profile + alert banner ("Sleep quality rated ≤2 for 4 consecutive days") + top tabs + Latest Check-in Summary + 7D/30D/90D/1Y/Custom pills + line chart
- `/dashboard/siti/heatmap` — same profile + April 2026 calendar grid + No-data/Low/Mid/High legend
- `/dashboard/siti/heatmap-day/2026-05-09` — same chrome + selected-day detail card
- `/dashboard/siti/insights` — same profile + AlertCard "Sleep quality decline - 4 consecutive days · Triggered 3 days ago · Active"
- `/build` — questionnaire list (3 rows: Generic 8 Questions / Pancreatic Cancer / Diabetes) + Create New CTA + bottom tabs
- `/build/new-senior` — Name / Age / Gender / Diagnosis form + Save & build questionnaire CTA
- `/build/senior/siti/questionnaire/generic-8q` — Question Builder: all 8 questions listed (Vision/Sleep/Appetite/Balance/Hearing/Memory/Toothache/Pain) with type labels
- `/build/senior/<id>/questionnaire/wizard/step-1-emoji` — 30-emoji grid picker
- `/build/senior/<id>/questionnaire/wizard/step-2-describe` — description field
- `/build/senior/<id>/questionnaire/wizard/step-3-response` — 3 response-type cards (Scale / Yes-No / Pain Location)
- `/build/senior/<id>/questionnaire/wizard/step-4-threshold` — consecutive-days "slider" (tap-row of 1–10)
- `/build/senior/<id>/questionnaire/wizard/step-5-done` — "Question Saved!" + Create Another / View All buttons

**Note on the wizard URL:** the path doesn't include a `[questionnaireId]` segment — the wizard is a sibling of the questionnaire detail page and reads its target via `apps/caregiver/lib/wizard-store.ts`. Don't be confused by `/build/senior/siti/questionnaire/generic-8q/wizard/...` 404ing — that's the WRONG path.

## Open items / hand-fix list (in priority order)

1. **Push to `origin/main`** when the user asks. Three local commits ahead of remote.
2. **Polish the rough screens**, in particular:
   - `BodyPainMap` — silhouettes are geometric shapes (head circle, torso polygon, arms/legs). Recognisable but ugly. Replace with proper line-art SVGs.
   - `BrandTreesMark` — inline SVG paths, hand-rolled. Closer to the Figma than I expected but not a faithful trace.
   - `TrendLineChart` — single line, plain `react-native-svg`, no markers / tooltips / axis polish. Fine for demo, needs `victory-native` or `react-native-skia` for shipping.
3. **Wizard step 4 "slider"** is a 10-cell tap-dot row, not a draggable knob. Replace with `@react-native-community/slider` if real slider UX matters.
4. **Drag-reorder in `QuestionBuilderScreen`** is visual only (a `GripVertical` icon). Wire `react-native-draggable-flatlist` for real DnD.
5. **Wizard output not persisted.** When the user hits step 5 "Save", nothing is written anywhere. Either commit to AsyncStorage / Zustand, or wire to Supabase.
6. **`phosphor:Tooth` → `lucide:Bone` substitution** in `components/Icon.tsx` looks weird for the Toothache condition icon (shows a bone). Inline a custom tooth SVG or use the 🦷 emoji.
7. **Date-range pills** 90D / 1Y cap to 30 days of data (mock JSON only has 30 days). Generate more mock data or hide the longer ranges in the UI.
8. **Bell icon on Select Senior** triggers a stub `Alert.alert` instead of opening a notifications panel.
9. **Typed routes** are off in both `app.json`s. Re-enable once the routes stabilise and Expo regenerates the `.expo/types/router.d.ts` manifest.
10. **`shadow*` style props deprecated warning** fills the dev console on web. Migrate the `shadows` token in `design-tokens.ts` to use `boxShadow` (or split per platform).
11. **Wire to Supabase.** Currently every screen reads `supabase/seed-data/seraya-mock-data.json` via Metro JSON import. The helper signatures in `apps/<app>/lib/mock-data.ts` (`getSenior(slug)`, `getQuestion(id)`, etc.) are the abstraction boundary — swap their implementations to call `getSupabase().from(...)` and the screens shouldn't need to change. The Supabase client in `@seraya/shared` is already lazy-init via Proxy.
12. **Secrets rotation (still pending from session #1):** Supabase PAT and Anthropic key were pasted in plaintext in that chat. Should be rotated at <https://supabase.com/dashboard/account/tokens> and <https://console.anthropic.com/settings/keys>.

## Known quirk — Claude Preview screenshot tool

The `mcp__Claude_Preview__preview_screenshot` tool works reliably **only on the first navigation after a fresh `preview_start`** for these apps. After any `window.location.href = '...'` or `history.pushState(...)` navigation, the screenshot tool times out at 30 s. Cause is unclear — page content is fully rendered, `document.readyState === "complete"`, no pending network requests, no infinite animations. May be a Playwright internals quirk specific to RN-Web + expo-router combos.

**Workaround:** use `mcp__Claude_Preview__preview_eval` to read `document.querySelector('#root')?.innerText` for content-level verification. Use screenshots only when you specifically need a visual capture, and accept that you'll need to restart the preview between captures.

## Resume commands

```sh
# Sanity check
cd C:/Users/chery/projects/seraya && pnpm -r typecheck

# Launch a preview (configs are wired in .claude/launch.json)
#   mcp__Claude_Preview__preview_start  name="elderly-web"     → port 8081
#   mcp__Claude_Preview__preview_start  name="caregiver-web"   → port 8082
#
# First load triggers a ~20–35 s Metro bundle compile. Subsequent navigations are fast.

# Push to remote (when user asks)
cd C:/Users/chery/projects/seraya && git push origin main
```

## Key files / paths cheat-sheet

- **Conventions:** `CLAUDE.md` at the repo root.
- **Design vocabulary:** `docs/design-inventory.md` (visually verified) + `docs/figma-exports/*.png` (23 source PNGs).
- **Tokens:** `packages/shared/src/design-tokens.ts` (colours, typography, spacing, radii, shadows, conditionIcons, uiIcons, heatmapTones). Re-exported via `@seraya/shared`.
- **Mock data:** `supabase/seed-data/seraya-mock-data.json` (3 seniors × 30 days). Consumed by `apps/<app>/lib/mock-data.ts`.
- **Apps:** `apps/elderly/app/` and `apps/caregiver/app/` are Expo Router route trees. Per-app components in `apps/<app>/components/`. Per-app data hooks in `apps/<app>/lib/`.
- **Supabase schema:** `supabase/migrations/0001_init.sql` + `supabase/seed.sql` (already applied to project `dulxshbpkivndkjhscui` in `ap-southeast-1`).
- **Preview configs:** `.claude/launch.json` defines `elderly-web` (port 8081) and `caregiver-web` (port 8082).

## Environment

- `.env` was set up in session #1 with real Supabase URL / anon key / service role key / PAT and a real Anthropic key. Confirmed working against the live Supabase project.
- Node 20+, pnpm 11.1.2.

## What to tell the user when you resume

> "Three commits on main. Every screen in the design inventory is wired and renders with mock data. Ready to push to remote, polish rough spots, or move to Supabase wiring — your call."

Don't summarise what's already done — it's in the verified list above. Just say what's next.
