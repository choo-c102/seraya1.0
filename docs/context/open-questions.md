# SERAYA Open Questions

These are clarifications noticed while comparing Kah Yan's product brief with Cheryl's current codebase. Use this as the running discussion list for Kah Yan, Cheryl, and AI collaborators.

## To Review With Cheryl

### MVP Question Set Review

Kah Yan has provided the first proposed MVP senior-facing question set in `docs/context/mvp-question-set.md`. Cheryl should review whether all questions belong in the default daily check-in or whether some should become optional templates.

Compare the proposal against:

- `supabase/seed-data/seraya-mock-data.json`
- `apps/elderly/lib/mock-data.ts`
- `apps/caregiver/lib/mock-data.ts`
- Questionnaire builder screens under `apps/caregiver/app/(tabs)/build/`

### MVP Resource Set Review

Kah Yan has provided the first proposed MVP resource set in `docs/context/mvp-resource-set.md`. Cheryl should review which resources should appear in the caregiver app first and whether resource cards should be static mock data or Supabase-backed.

## Technical Follow-Ups

### Supabase Types

`packages/shared/src/types.ts` currently has an empty generated-style Supabase `Database` type. If live Supabase becomes the next milestone, this likely needs proper generated or hand-authored table types.

### Mock Dates

Existing mock dates appear fixed around 2026-05-09 in helper code, while the current real date for this session is 2026-05-20. This is fine for static mock demos but should be revisited before live data or date-sensitive UX work.
