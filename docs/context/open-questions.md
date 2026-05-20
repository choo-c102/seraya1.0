# SERAYA Open Questions

These are clarifications noticed while comparing Kah Yan's product brief with Cheryl's current codebase. Use this as the running discussion list for Kah Yan, Cheryl, and AI collaborators.

## To Discuss: Kah Yan + Cheryl

### Role Selection vs Two Apps

The product brief mentions "Role selection: Senior / Caregiver", but the current implementation is split into two separate apps: `apps/elderly` and `apps/caregiver`.

Kah Yan is not sure yet which direction is best. Discuss with Cheryl whether the MVP should remain two separate apps or eventually add a Senior/Caregiver role-selection experience.

Questions to resolve:

- Is the two-app setup intentional for distribution, testing, or caregiver/senior separation?
- Would a shared app with role selection simplify onboarding or make the MVP more confusing?
- For demo purposes, which approach tells the SERAYA story more clearly?

## Kah Yan To Provide Later

### Finalized Question Sets

Kah Yan has finalized questions and sets but will provide them later. Do not over-invest in changing the questionnaire content until those are available.

Current product brief mentions these possible categories:

- Overall feeling.
- Pain severity.
- Pain location.
- Appetite.
- Energy/tiredness.
- Breathing/shortness of breath.
- Mood/worry.
- Sleep.
- Anything else / other problems.

Current observed seed question keys do not obviously include all of these as first-class tracked fields. Once Kah Yan provides the finalized sets, compare them against:

- `supabase/seed-data/seraya-mock-data.json`
- `apps/elderly/lib/mock-data.ts`
- `apps/caregiver/lib/mock-data.ts`
- Questionnaire builder screens under `apps/caregiver/app/(tabs)/build/`

## Technical Follow-Ups

### Supabase Types

`packages/shared/src/types.ts` currently has an empty generated-style Supabase `Database` type. If live Supabase becomes the next milestone, this likely needs proper generated or hand-authored table types.

### Mock Dates

Existing mock dates appear fixed around 2026-05-09 in helper code, while the current real date for this session is 2026-05-19. This is fine for static mock demos but should be revisited before live data or date-sensitive UX work.
