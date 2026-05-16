# Seraya

Health monitoring for seniors and caregivers.

> "Tall as wisdom. Rooted in care."

## Apps

- `apps/elderly` — daily check-in app for the senior user (React Native + Expo).
- `apps/caregiver` — dashboard, trends, heatmap, insights, and questionnaire builder (React Native + Expo).
- `packages/shared` — shared Supabase client, types, and utilities.
- `supabase/` — database migrations + seed data.
- `docs/` — design inventory pulled from Figma.

## Stack

- React Native + Expo (SDK 52)
- Expo Router (file-based routing)
- TypeScript strict mode
- pnpm workspaces
- Supabase (Auth + Postgres + Storage) — `ap-southeast-1` (Singapore)
- `react-native-reanimated` for animations

## Local setup

```sh
# 1. Install deps
pnpm install

# 2. Copy env template — fill in real values, do NOT commit .env
cp .env.example .env

# 3. Run an app — pick a target
pnpm elderly:web          # opens elderly in your browser  (recommended on Windows)
pnpm caregiver:web        # opens caregiver in your browser
pnpm elderly              # Metro dev server — for Expo Go on phone, iOS sim, or Android
pnpm caregiver            # Metro dev server (same — for device / simulator)
```

### "It stops at `Starting Metro Bundler`" — that's normal

`expo start` (the plain `pnpm elderly` / `pnpm caregiver` scripts) launches Metro, the JavaScript bundler. Metro is a **long-running dev server** that keeps waiting for a device or browser to connect — it never exits on its own. After the "Starting Metro Bundler" line you should see:

- a QR code (scan it with **Expo Go** on your iPhone/Android), and
- a hint row like `› Press w │ open web`.

If the terminal looks frozen, press `w` to open the web build, `i` for iOS Simulator (Mac only), or `a` for Android emulator. On Windows the easiest path is `pnpm elderly:web` / `pnpm caregiver:web`, which goes straight to the browser.

The first browser load triggers a ~30 s one-time bundle compile (≈7 MB) — subsequent reloads are near-instant.

## Environment

The two `EXPO_PUBLIC_*` keys are bundled into the client apps. The `SUPABASE_SERVICE_ROLE_KEY` and `ANTHROPIC_API_KEY` are server-only and must never be exposed to a built mobile binary.

## Status

Initial scaffold. Screens listed in `docs/design-inventory.md` are pending implementation.
