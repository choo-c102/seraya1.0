# SERAYA Decisions

Confirmed decisions for Kah Yan and Cheryl. Keep entries short, dated, and action-oriented.

## 2026-05-20

### Two-App Architecture

- Keep SERAYA as two separate apps for the MVP: `apps/elderly` for seniors and `apps/caregiver` for caregivers.
- This was a deliberate UX and security decision, not a technical default.
- The senior app should optimize for maximum simplicity: large text, one action per screen, emoji-supported responses, and minimal cognitive load.
- The caregiver app should optimize for data density: dashboards, charts, heatmaps, alert review, and questionnaire building.
- Separate distribution is part of the intended flow: a family member can hand the senior a phone with only the senior app installed, while caregivers use a separate EAS build/link.
- The role-select screen is intentionally unnecessary while the apps remain separate.
- Security isolation is a core reason for the split: senior users cannot navigate to caregiver dashboards because those screens do not exist in the senior app binary.
- Independent release cycles are useful: caregiver UI changes can ship without touching the senior app, and failures in one app are less likely to affect the other.
- Shared logic should stay in `packages/shared/` so auth, design tokens, Supabase client code, and shared types are maintained once.

- Share only durable collaboration context in `docs/context/`: `README.md`, `product-brief.md`, `open-questions.md`, and `decisions.md`.
- Keep personal notes, raw dated notes, and repo cheatsheets local using `docs/context/*.local.md`.
- Keep `docs/SESSION-HANDOFF.md` as an AI/session continuity file, not as a shared product context document.
- Preserve `AGENTS.md` as a symlink to `CLAUDE.md` so Codex reads the same repo instructions when working here.
