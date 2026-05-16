# Seraya — Claude Code project conventions

This file is read automatically by Claude Code at session start. Anything written here is treated as a hard rule for the assistant working on this repo.

## Hard rules

1. **Always keep `docs/SESSION-HANDOFF.md` current.** Before any of the following, update the handoff:
   - The working session is approaching a plan / context / token limit (proactively, not reactively).
   - A meaningful milestone lands (commit, working feature, big decision).
   - You are about to spawn a long-running subagent whose result the next session may need.

   The handoff must contain: TL;DR of state, the *exact next action* to resume, verified facts so they aren't redone, known live issues, suggested commit message for any uncommitted work, and uncommitted-file diff snapshot.

2. **Do not commit secrets.** `.env` is gitignored and stays that way. `.env.example` is the only env-template that goes into git.

3. **Use the design tokens.** Components must import colours, typography, spacing, radii, shadows from `@seraya/shared` (re-exporting `packages/shared/src/design-tokens.ts`). No hardcoded hex strings or magic pixel values in screen JSX.

4. **TypeScript strict mode is on.** No `any`. If you genuinely need an unknown shape, use `unknown` and narrow. The pre-commit gate is `pnpm -r typecheck`.

5. **Prefer the web preview for visual verification.** Use `pnpm elderly:web` / `pnpm caregiver:web` (or the Claude Preview launch configs `elderly-web` / `caregiver-web` in `.claude/launch.json`). The native dev server (`pnpm elderly` / `pnpm caregiver`) is for device / simulator runs.

## Repo shape

- `apps/elderly` — Expo Router app for the senior user.
- `apps/caregiver` — Expo Router app for the caregiver.
- `packages/shared` — typed Supabase client (lazy via Proxy), design tokens, types.
- `supabase/` — schema migration (`migrations/0001_init.sql`), seed (`seed.sql`), seed source (`seed-data/seraya-mock-data.json`), and helper scripts under `scripts/`.
- `docs/` — `design-inventory.md` (visually verified), `figma-exports/*.png` (23 source PNGs), `SESSION-HANDOFF.md`.

## Stack pin-points

- Expo SDK 52, Expo Router 4, React Native 0.76.9, React 18.3.1, TypeScript 5.4.
- `react-native-reanimated` for animations. **Caveat:** reanimated's web shim uses `requestAnimationFrame` continuously, which blocks Claude Preview's screenshot tool. Guard infinite animations (`withRepeat(..., -1)`) behind `Platform.OS !== "web"` or use CSS keyframes on web.
- `lucide-react-native` for iconography. `apps/<app>/components/Icon.tsx` is the central resolver — it accepts string keys like `"lucide:Eye"` and maps to actual imports.
- `react-native-svg` for charts, heatmap cells, body silhouettes, brand mark. No heavy charting library is in use.
- pnpm workspaces with `node-linker=hoisted` + `shamefully-hoist=true`. Metro's resolver does not follow pnpm's symlink tree well — if a transitive dep can't be found, add it as an **explicit** devDependency in the app that imports it (precedent: `@babel/runtime`).

## Routing conventions

- `app/index.tsx` redirects to `/welcome`.
- Auth flow: `/welcome` → `/role-select` → `/login` → app home.
- Caregiver app uses a `(tabs)` group for bottom-tab navigation (`Dashboard` / `Build`). Per-senior surface uses a top-tab strip rendered as an in-page component (`TopTabBar`), NOT a nested `MaterialTopTabs` layout.
- Typed routes are currently **off** in `app.json` because the auto-generated `.expo/types/router.d.ts` only contained the placeholder routes at scaffold time. Re-enable later, after a full `npx expo start` regenerates the manifest, by flipping `experiments.typedRoutes` back to `true` in both apps.

## Mock data vs. Supabase

The scaffolded screens read from `supabase/seed-data/seraya-mock-data.json` via Metro's JSON-import support, not from Supabase. Each app has `lib/mock-data.ts` as the data layer. Switching to Supabase reads is a clearly bounded refactor — the helper signatures (`getSenior(slug)`, `getQuestion(id)`, etc.) are the abstraction boundary.

## Style notes

- File-scoped `StyleSheet.create` at the bottom of each screen.
- Named exports for shared components; default export only on Expo Router route files (that's the Expo Router contract).
- No new files unless asked.
- No emojis in user-facing UI unless the design calls for them (it does in the wizard step-1 emoji picker).

## Commit conventions

- Conventional Commit prefixes: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.
- Body wrapped to ~72 chars.
- Trailer: `Co-Authored-By: Claude <model-name> <noreply@anthropic.com>`.
- Never `--amend`, never skip hooks, never force-push.

## When stuck

If a problem looks intractable in-session, write down the state in `docs/SESSION-HANDOFF.md` with a clear "Immediate next action" stanza and stop. Burning context on a stuck problem makes the next session worse.
