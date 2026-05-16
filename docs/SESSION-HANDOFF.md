# Seraya — Session Handoff

> **Convention:** This file MUST be kept current. Update it as the working session approaches a context / plan / token limit, OR at every meaningful milestone, whichever comes first. The cold-start agent reads this file before doing anything else.

Last updated: 2026-05-16 (mid-day, after the screen scaffold + web verification attempts).

---

## TL;DR — where we are right now

1. **Foundations done & committed (2 commits on `main`):**
   - `c7f5300` initial scaffold (monorepo, 9 Supabase tables seeded, Figma inventory written from metadata).
   - `dc0a352` web preview wired + visual audit of all 23 Figma frames + design tokens extracted to `packages/shared/src/design-tokens.ts`.
2. **23 screens scaffolded but NOT YET COMMITTED.** A general-purpose subagent built every route documented in `docs/design-inventory.md` and wired them to mock data. `pnpm -r typecheck` passes cleanly. Both web bundles compile. Elderly Welcome screen renders correctly in browser.
3. **Stuck on screenshot verification.** The Welcome screen's `react-native-reanimated` spinner uses `withRepeat(..., -1)` which keeps `requestAnimationFrame` busy on web *forever*. The Claude Preview screenshot tool waits for renderer idle, so screenshots time out at 30 s on every route. This does NOT mean the screens are broken — DOM eval confirms they render. It's just a verification blocker.
4. **Two preview servers are currently running** (will need to be re-started on resume):
   - `elderly-web` on port 8081, server id was `b2430e9b-e537-4108-9ca3-b099ef1cc129`.
   - `caregiver-web` on port 8082, server id was `c1b64492-1ead-4314-a67c-e09f1507ab78`.
   - Stop them with `mcp__Claude_Preview__preview_stop` or `taskkill //PID <pid> //F` if they're still alive. Restart via `mcp__Claude_Preview__preview_start` with names `elderly-web` / `caregiver-web` (already in `.claude/launch.json`).

## Immediate next action (do this first on resume)

1. **Stop & restart the dev preview servers** to clear any zombie state.
2. **Fix the spinner so reanimated stops infinite-RAF on web.** Two equivalent options:
   - In `apps/elderly/app/welcome.tsx` and `apps/caregiver/app/welcome.tsx` (if present), guard the `withRepeat` call behind `Platform.OS !== "web"`, OR replace the entire spinner animation with a tiny CSS `@keyframes` rule applied on web only via `style={{ animation: "spin 1.4s linear infinite" }}` (RN-Web passes raw style strings through).
   - Cleanest: build a `<Spinner />` component in `apps/<app>/components/` that uses reanimated on native and a CSS-only rotation on web. Add `@keyframes spin { to { transform: rotate(360deg); } }` to the document head once via `useEffect` on mount.
3. **Re-take the elderly tour:** `/`, `/welcome`, `/role-select`, `/login`, `/checkin/question/[first-question-id]`, `/checkin/complete`. Use `mcp__Claude_Preview__preview_eval` with `window.location.href = '/path'` to navigate, then `mcp__Claude_Preview__preview_screenshot`.
4. **Repeat the tour for caregiver** on port 8082: `/`, `/welcome`, `/role-select`, `/login`, `/(tabs)/dashboard`, `/(tabs)/dashboard/siti/trends`, `/(tabs)/dashboard/siti/heatmap`, `/(tabs)/dashboard/siti/insights`, `/(tabs)/build`, `/(tabs)/build/senior/siti/questionnaire/<qid>`, then walk through the 5 wizard steps.
5. **Commit the screen scaffolding** as a single milestone once at least the elderly flow has been visually confirmed. Suggested message in the "Suggested commit" section below.
6. **Send to the user** a concise "what's working / what's rough / what's broken" summary so they can pilot the next decision.

## Verified facts (don't redo this work)

- `pnpm -r typecheck` PASSES on all 3 workspace packages (`packages/shared`, `apps/elderly`, `apps/caregiver`).
- Both apps' web bundles compile via `npx expo export --platform web` — ~3.6 MB JS each, 2536 modules.
- The dev-server bundle compiles in ~22 s (elderly) / ~30 s (caregiver) on first hit. ~10.5 MB JS in dev mode.
- Welcome screen renders correctly on web: cream background, line-art 3-tree mark, SERAYA wordmark, tagline, ENTER pill. Visually matches the Figma reference closely.
- `packages/shared/src/supabase.ts` was rewritten this session to **lazy-init** via a Proxy — the old version threw at module import time when env vars were missing, which crashed every screen that touched the shared barrel. Lazy version is committed to disk but not yet committed to git.

## Known live issues / hand-fix list

In order of urgency:

1. **Reanimated infinite RAF on web** — see "Immediate next action" above. Symptom: `preview_screenshot` times out.
2. **Welcome spinner spec drift on second app.** Verify the same fix lands in `apps/caregiver/app/welcome.tsx` if/once that file uses the same animation pattern.
3. **Body pain map silhouettes are rough geometry**, not anatomical drawings. Recognisable but ugly. Replace with proper SVG assets when a designer is available.
4. **BrandTreesMark** is inline SVG with hand-rolled paths — serviceable, not a faithful trace of the Figma original. Could be exported from Figma as an asset later.
5. **TrendLineChart** is plain `react-native-svg` with one line, no markers, no tooltips, no axis labels styling beyond what tokens dictate. Fine for demo; needs a real charting lib (`victory-native` or `react-native-skia`) for shipping.
6. **Wizard step 4 "slider"** is a 10-cell tap-dot row, not a draggable knob — avoids adding `@react-native-community/slider`. Replace if real slider UX matters.
7. **Drag-reorder in `QuestionBuilderScreen`** is purely visual (a `GripVertical` icon next to each row). Wire `react-native-draggable-flatlist` for real DnD.
8. **Wizard output is not persisted.** When the user hits step 5 "Save", nothing is written anywhere. Either commit to local AsyncStorage / Zustand store, or wire to Supabase. The mock-data JSON is read-only.
9. **`phosphor:Tooth` → `lucide:Bone` substitution** in `apps/<app>/components/Icon.tsx` looks weird in context (e.g. the Toothache condition icon shows a bone). Acceptable workarounds: inline a custom tooth SVG, or use an emoji 🦷 wrapped in a tile.
10. **Date-range pills** 90D / 1Y cap to 30 days of data (mock JSON only has 30 days). Either generate more mock data or hide the longer ranges in the UI.
11. **Bell icon on Select Senior** triggers a stub `Alert.alert` instead of opening a notifications panel.
12. **Typed routes are disabled** in both `app.json`s (`experiments.typedRoutes: false`) because the auto-generated `.expo/types/router.d.ts` only listed `/` and `/_sitemap` at scaffold time. Re-enable later by running `npx expo start` which regenerates the types, then flipping the flag back on. Doing so is **not** trivial — it requires hand-correcting every `router.push("/...")` call to match the typed route shape.
13. **`shadow*` style props deprecated warning** is filling the dev console on web. RN-Web prefers `boxShadow` now. Migrate the `shadows` token in `design-tokens.ts` to use the new prop, OR conditionally compose shadow styles per platform.

## Suggested commit (once verification is done)

```
feat: scaffold all 23 routes wired to mock data

- Build out every screen in docs/design-inventory.md for both apps:
  elderly check-in flow (welcome → role-select → login → 3 question
  types → completion) and caregiver dashboard (senior list → top-tab
  trends/heatmap/insights → heatmap day-detail) + build flow
  (questionnaire list → builder → 5-step wizard).
- New shared components in apps/<app>/components/: Icon, PillButton,
  Avatar, ScreenHeader, SeniorProfileSummary, AlertBanner, TopTabBar,
  StatusPill, TrendLineChart, HeatmapGrid, HeatmapLegend, DayDetailCard,
  ConditionChipStrip, DateRangePicker, LatestCheckinSummary, AlertCard,
  EmojiScale, BinaryChoice, BodyPainMap, BrandTreesMark.
- lib/mock-data.ts in each app reads the seed JSON via Metro JSON
  import; lib/wizard-store.ts holds in-memory wizard state.
- metro.config.js in each app adds the supabase/seed-data/ folder to
  watchFolders so the JSON resolves through pnpm.
- Lazy-init Supabase client in packages/shared/src/supabase.ts via a
  Proxy so screens that only consume mock data don't trip the missing-
  env-var throw at module load.
- Typed routes turned off in app.json for both apps (router.d.ts only
  declared / and /_sitemap at scaffold time; re-enable once the routes
  stabilise and Expo regenerates the manifest).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

## Open user decisions / pending items

- **Wizard emoji style:** user picked "native OS emojis for now, with the option to change in the next version update." A `<Emoji>` component should be the swap point — verify the subagent created one (in `apps/<app>/components/`).
- **Create New on Build screen:** user picked "New senior + new questionnaire." Route is `/(tabs)/build/new-senior.tsx` → wizard step 1. Verify the subagent wired this correctly.
- **Pain-point silhouettes:** dual front/back silhouettes with tap zones, per the previous conversation. The subagent built rough geometric silhouettes — adequate for demo, will need real artwork later.
- **Figma plan upgrade:** user is on Starter (capped). Visual sweep is unblocked by the manual PNG export. No further Figma MCP calls needed for now.
- **Secrets rotation (from session #1):** Supabase PAT `sbp_56f5b4...49908` and Anthropic key `sk-ant-api03-bYdV...gftfOQ-nnvP7wAA` were both pasted in plaintext earlier. Should be rotated at <https://supabase.com/dashboard/account/tokens> and <https://console.anthropic.com/settings/keys>. Still **not yet rotated**.

## Repo state at handoff time

### Commits

```
dc0a352 feat: web preview + visual audit + design tokens          ← HEAD
c7f5300 init: monorepo scaffold
```

### Uncommitted files (the screen scaffold + supabase lazy-fix)

```
M apps/caregiver/app.json                 # typedRoutes: false
M apps/caregiver/app/_layout.tsx          # cream bg, Stack header off
M apps/caregiver/app/index.tsx            # Redirect → /welcome
M apps/caregiver/tsconfig.json
M apps/elderly/app.json                   # typedRoutes: false
M apps/elderly/app/_layout.tsx
M apps/elderly/app/index.tsx
M apps/elderly/tsconfig.json
M packages/shared/src/supabase.ts         # lazy-init Proxy

?? apps/caregiver/app/(tabs)/             # 11 nested route files
?? apps/caregiver/app/login.tsx
?? apps/caregiver/app/role-select.tsx
?? apps/caregiver/app/welcome.tsx
?? apps/caregiver/components/             # ~17 components
?? apps/caregiver/lib/                    # mock-data.ts, wizard-store.ts
?? apps/caregiver/metro.config.js

?? apps/elderly/app/checkin/              # 4 files: _layout, index, question/[id], complete
?? apps/elderly/app/login.tsx
?? apps/elderly/app/role-select.tsx
?? apps/elderly/app/welcome.tsx
?? apps/elderly/components/               # 6 components
?? apps/elderly/lib/                      # mock-data.ts
?? apps/elderly/metro.config.js
```

## Key files / paths cheat-sheet

- **Design vocabulary:** `docs/design-inventory.md` (visually verified) + `docs/figma-exports/*.png` (23 source PNGs).
- **Tokens:** `packages/shared/src/design-tokens.ts` (colors, typography, spacing, radii, shadows, conditionIcons, uiIcons, heatmapTones). Re-exported via `@seraya/shared`.
- **Mock data:** `supabase/seed-data/seraya-mock-data.json` (3 seniors × 30 days). Read by `apps/<app>/lib/mock-data.ts`.
- **Apps:** `apps/elderly/app/` and `apps/caregiver/app/` are Expo Router route trees. Shared components duplicated under each app's `components/`.
- **Supabase schema:** `supabase/migrations/0001_init.sql` + `supabase/seed.sql` (already applied to project `dulxshbpkivndkjhscui`).

## Resume commands

```sh
# Sanity-check (already verified at handoff time, but cheap to re-run):
cd C:/Users/chery/projects/seraya && pnpm -r typecheck

# Launch elderly web preview (Claude Preview launch config is wired):
#   mcp__Claude_Preview__preview_start  name="elderly-web"
#   → port 8081

# Launch caregiver:
#   mcp__Claude_Preview__preview_start  name="caregiver-web"
#   → port 8082

# Compile bundles eagerly so the first nav is fast:
curl -s -o /dev/null --max-time 300 "http://localhost:8081/$(curl -s http://localhost:8081/ | grep -oE '/node_modules/[^\"]*\.bundle[^\"]*')"
curl -s -o /dev/null --max-time 300 "http://localhost:8082/$(curl -s http://localhost:8082/ | grep -oE '/node_modules/[^\"]*\.bundle[^\"]*')"
```

## Environment

- `.env` was set up in session #1 with real Supabase URL / anon key / service role key / PAT and a real Anthropic key. The values are NOT in this file; check `.env` directly. Confirmed working against the live Supabase project (`dulxshbpkivndkjhscui` in `ap-southeast-1`).
- Node 20+, pnpm 11.1.2 (locked via `packageManager`).

## What to tell the user when you resume

> "Picking up from the screen scaffold. Typecheck passes, both web bundles compile, Welcome renders. The verification screenshot tour was blocked on a `react-native-reanimated` infinite-RAF issue on web — fixing that now, then I'll commit the milestone and walk you through the tour."

Do not summarise what's already done — they know. Just say what's next.
