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

# 3. Run an app
pnpm elderly      # or:  pnpm caregiver
```

## Environment

The two `EXPO_PUBLIC_*` keys are bundled into the client apps. The `SUPABASE_SERVICE_ROLE_KEY` and `ANTHROPIC_API_KEY` are server-only and must never be exposed to a built mobile binary.

## Status

Initial scaffold. Screens listed in `docs/design-inventory.md` are pending implementation.
