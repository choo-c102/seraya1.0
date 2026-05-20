# Seraya

Health monitoring for seniors and caregivers.

> "Tall as wisdom. Rooted in care."

Seraya is a two-app React Native + Expo MVP for senior daily health check-ins and caregiver monitoring. The current build uses mock data end-to-end while the app screens, navigation, design tokens, deployment flow, and Android test distribution are in place.

## Live preview

Both apps are deployed on Vercel. They are designed for mobile screens — follow the steps below to get the intended experience in your browser.

| App | URL |
|---|---|
| **Elderly app** (senior user) | https://seraya-elderly.vercel.app |
| **Caregiver app** (caregiver / healthcare worker) | https://seraya-caregiver.vercel.app |

### Simulating a mobile screen in Chrome

#### Windows / Linux

1. Open the app link in Chrome.
2. Press **`Ctrl + Shift + I`** to open DevTools.
3. Press **`Ctrl + Shift + M`** to toggle the device toolbar.
4. In the toolbar that appears at the top of the preview, choose a device — **iPhone 14** or **Galaxy S20** work well — or type **390** in the width field.
5. Press **`Ctrl + R`** to refresh if the layout does not reflow immediately.

#### Mac

1. Open the app link in Chrome.
2. Press **`Cmd + Option + I`** to open DevTools.
3. Press **`Cmd + Shift + M`** to toggle the device toolbar.
4. Choose a device from the dropdown or set the width to **390**.
5. Press **`Cmd + R`** to refresh if needed.

> **Tip:** Once the device toolbar is open you can drag the edges of the preview pane to resize it freely. Closing DevTools returns the page to normal desktop view.

---

## Current status

- MVP scaffold is complete.
- Both apps run on web via Expo export and Vercel.
- Android preview builds are distributed through EAS.
- All 23 MVP screens render with mock data.
- `pnpm -r typecheck` passes across the workspace.
- Supabase client, schema, migrations, and seed data are present, but screens are not yet wired to live Supabase reads/writes.

## Monorepo structure

```txt
seraya/
  apps/
    elderly/       # Senior daily check-in app
    caregiver/     # Caregiver dashboard and questionnaire builder
  packages/
    shared/        # Design tokens, shared types, Supabase client, utilities
  supabase/        # Database migrations, schema, and seed/mock data
  docs/            # Design inventory and Figma exports
```

## Apps

### `apps/elderly`

The senior-facing app for simple daily check-ins.

Built screens:

1. Welcome / splash screen
2. Login screen
3. Check-in flow with one question at a time
4. Check-in complete screen

### `apps/caregiver`

The caregiver-facing app for monitoring seniors, reviewing trends, and building questionnaires.

Built screens:

1. Welcome / splash screen
2. Login screen
3. Dashboard / senior selection
4. Trends chart
5. Monthly heatmap
6. Heatmap day detail
7. Insights / alert cards
8. Questionnaire list
9. New senior form
10. Question builder
11. Question wizard step 1 — emoji / condition icon
12. Question wizard step 2 — description
13. Question wizard step 3 — response type
14. Question wizard step 4 — alert threshold
15. Question wizard step 5 — confirmation

## Stack

- React Native + Expo SDK 52
- Expo Router 4
- TypeScript strict mode
- pnpm workspaces
- Supabase Auth + Postgres + Realtime
- React Native SVG for chart and custom visual components
- Lucide icons
- Vercel for Expo web deployment
- EAS for Android preview builds

## Data layer

The current app state is mock-data driven.

```txt
supabase/seed-data/seraya-mock-data.json
```

The mock dataset includes three fictional seniors with 30 days of check-in history, alerts, questionnaire data, and dashboard state.

The abstraction layer is intentionally kept in:

```txt
apps/elderly/lib/mock-data.ts
apps/caregiver/lib/mock-data.ts
```

When wiring live Supabase data, replace the implementations inside these helper files while keeping the screen-level API stable.

The shared Supabase client is located at:

```txt
packages/shared/src/supabase.ts
```

## Design system

Shared design tokens live in:

```txt
packages/shared/src/design-tokens.ts
```

This file centralises:

- colours
- typography
- spacing
- border radii
- shadows
- icon keys
- condition icon mappings

Screen files should import design values from `@seraya/shared` instead of hardcoding hex values or magic pixel values.

## Key files

| Purpose | Path |
|---|---|
| Project conventions | `CLAUDE.md` |
| Design tokens | `packages/shared/src/design-tokens.ts` |
| Shared Supabase client | `packages/shared/src/supabase.ts` |
| Mock data | `supabase/seed-data/seraya-mock-data.json` |
| Elderly mock-data helpers | `apps/elderly/lib/mock-data.ts` |
| Caregiver mock-data helpers | `apps/caregiver/lib/mock-data.ts` |
| Supabase schema | `supabase/migrations/0001_init.sql` |
| Supabase seed script | `supabase/seed.sql` |
| Elderly screens | `apps/elderly/app/` |
| Caregiver screens | `apps/caregiver/app/` |
| Shared app components | `apps/<app>/components/` |
| Design inventory | `docs/design-inventory.md` |
| Figma exports | `docs/figma-exports/*.png` |

## Local setup

```sh
# Install dependencies
pnpm install

# Copy environment template and fill in real values
cp .env.example .env
```

Run the web apps:

```sh
pnpm elderly:web      # http://localhost:8081
pnpm caregiver:web    # http://localhost:8082
```

Run Expo / Metro for device or simulator testing:

```sh
pnpm elderly
pnpm caregiver
```

`expo start` launches Metro, which is a long-running dev server. It keeps running until stopped manually. Press `w` to open web, `a` for Android emulator, or scan the QR code with Expo Go.

## Type checking

Run from the repository root:

```sh
pnpm -r typecheck
```

## Environment variables

Create a local `.env` file from `.env.example`.

Expected values:

```txt
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

Notes:

- `EXPO_PUBLIC_*` values are bundled into the client apps.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed in a client build.
- `ANTHROPIC_API_KEY` is server-only and must not be committed.
- `.env` files must stay out of Git.

## Verified routes

### Elderly app

```txt
/welcome
/login
/checkin
/checkin/complete
```

### Caregiver app

```txt
/welcome
/login
/dashboard
/dashboard/siti/trends
/dashboard/siti/heatmap
/dashboard/siti/heatmap-day/2026-05-09
/dashboard/siti/insights
/build
/build/new-senior
/build/senior/siti/questionnaire/generic-8q
/build/senior/siti/questionnaire/generic-8q/wizard/step-1-emoji
/build/senior/siti/questionnaire/generic-8q/wizard/step-2-describe
/build/senior/siti/questionnaire/generic-8q/wizard/step-3-response
/build/senior/siti/questionnaire/generic-8q/wizard/step-4-threshold
/build/senior/siti/questionnaire/generic-8q/wizard/step-5-done
```

## Web deployment

Both apps are deployed as static Expo web exports. After code changes, export and deploy each app manually.

```powershell
# Caregiver app
cd C:\Users\chery\projects\seraya\apps\caregiver
npx expo export --platform web
vercel dist --prod

# Elderly app
cd C:\Users\chery\projects\seraya\apps\elderly
npx expo export --platform web
vercel dist --prod
```

`expo export` outputs to `dist/`, and `vercel dist --prod` uploads that directory.

## Android preview builds

Use EAS preview builds for Android device testing.

```powershell
cd C:\Users\chery\projects\seraya\apps\caregiver
eas build --profile preview --platform android

cd C:\Users\chery\projects\seraya\apps\elderly
eas build --profile preview --platform android
```

EAS returns a shareable install link and QR code for testers.

## Known technical gaps

The MVP currently renders complete mock-data flows. Production readiness requires the following technical work:

1. Wire Supabase auth for login, registration, session persistence, and sign-out.
2. Replace mock data helpers with live Supabase queries.
3. Persist caregiver-created seniors to the database.
4. Link senior accounts to caregiver accounts.
5. Persist check-in responses to Supabase.
6. Persist questionnaire builder output to Supabase.
7. Tighten Row Level Security policies.
8. Replace hardcoded alerts with real alert evaluation logic.
9. Add real notifications or real-time alert updates.
10. Improve chart interactions, markers, tooltips, and axes.
11. Replace geometric placeholder body silhouettes with production SVGs.
12. Implement actual drag-and-drop reordering in the question builder.
13. Replace wizard step 4 tap-dot threshold control with a real slider.
14. Re-enable typed routes after Expo regenerates router types.
15. Resolve web shadow deprecation warnings.

## Next technical milestone

Implement the live Supabase workflow:

1. Caregiver signs up or signs in.
2. Caregiver registers a senior.
3. Caregiver builds or edits a questionnaire.
4. Senior signs in or is paired to the caregiver.
5. Senior completes check-ins.
6. Check-in responses are written to Supabase.
7. Caregiver dashboard reads live trends, heatmap data, insights, and alerts from Supabase.

