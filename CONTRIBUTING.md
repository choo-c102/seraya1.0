# Contributing To SERAYA

This repo is shared between Kah Yan and Cheryl. Use this workflow before coding so both collaborators start from the latest version and avoid avoidable merge conflicts.

## Before You Start Coding

Run these from the repo root:

```bash
git status
git fetch origin
gh pr list --state open --base main
git switch main
git pull --ff-only origin main
```

Then check the open PRs:

- If an open PR touches the same files you plan to edit, pause and coordinate before coding.
- If open PRs are unrelated, create a focused branch from updated `main`.
- Do not work directly on `main` unless Kah Yan or Cheryl explicitly agrees that the change can go straight to `main`.

Create a branch:

```bash
git switch -c type/short-description
```

Examples:

```text
docs/shared-context
design/dashboard-polish
feat/supabase-auth
fix/checkin-routing
```

## Before You Push A Branch

Run:

```bash
git status
git fetch origin
git merge origin/main
pnpm -r typecheck
```

Use `git merge origin/main` rather than rebasing a branch that has already been pushed. This avoids force-pushes and keeps the repo easier to reason about.

Then push:

```bash
git push -u origin type/short-description
```

Open a Pull Request into `main` and ask for review.

## Secrets And Local Files

Never stage or commit:

- `.env` or any `.env*` file with real values.
- API keys, Supabase service-role keys, Supabase access tokens, or Anthropic keys.
- `.obsidian/` workspace files.
- `Notion Resources/` raw exports.
- `docs/context/*.local.md` personal notes.
- build outputs such as `dist/`, `.expo/`, `ios/`, `android/`, APKs, or AABs.

Use `.env.example` as the only committed environment template.

## If `gh` Is Not Installed

Install GitHub CLI or check open Pull Requests in the GitHub web UI before coding. The point is to see whether Cheryl has active work that may touch the same files.
