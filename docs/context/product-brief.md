# SERAYA Product Brief

SERAYA is a mobile-first health and symptom tracking MVP for elderly users and their caregivers. The core problem is that elderly people often struggle to track symptoms, pain, appetite, mood, breathing, energy, medication effects, and daily wellbeing consistently. Existing apps and paper tracking are often too complicated, inconsistent, or not useful enough for caregivers.

The MVP should make daily health check-ins simple enough for seniors while turning the captured data into useful trend views and rule-based alerts for caregivers.

## Primary Users

### Elderly seniors

- May have low digital literacy.
- May not read much English or may prefer visual cues.
- Need very large buttons, simple flows, clear icons/emojis, high contrast, and minimal typing.
- The check-in should feel lightweight, warm, and not intimidating.

### Caregivers and family members

- Need to set up what each senior should track.
- Need dashboard summaries, trends, heatmaps, and alerts.
- Need to understand "so what?" from the data: what changed, what needs attention, and what action or resource may be relevant.

## App Structure

SERAYA is intentionally split into two separate apps for the MVP:

- `apps/elderly`: senior-facing daily check-in experience.
- `apps/caregiver`: caregiver dashboard, insights, alerts, and questionnaire builder.

The split supports different UX needs, separate distribution, stronger screen-level isolation, and independent release cycles. Shared logic belongs in `packages/shared/` so the apps can stay separate without duplicating common code.

## MVP Focus

The initial MVP focuses on symptom and pain tracking, especially for elderly people with chronic illness, cancer, palliative care needs, or general ageing-related decline.

The prototype should demonstrate:

1. A senior can complete a simple daily check-in.
2. A caregiver can configure what to track.
3. A caregiver can view trends and alerts.
4. The app turns symptom data into simple, actionable caregiver insight.

Prioritize usability and clarity over feature completeness.

## Core MVP Features

### Senior check-in flow

- Very simple daily wellness check.
- One question at a time is preferred.
- Questions should use emojis/icons plus short text.
- Avoid long forms and typing where possible.
- Suggested topics: overall feeling, pain severity, pain location, appetite, energy/tiredness, breathing/shortness of breath, mood/worry, sleep, and anything else / other problems.
- Inputs should stay simple: emoji scale, yes/no, 0-10 pain scale, or tap body area for pain location.

### Pain tracking

- Include pain severity, ideally 0-10.
- Include pain location.
- A simple front/back body diagram can be used for pain location.
- For MVP, usability matters more than medical precision.

### Caregiver dashboard

- Show each senior being monitored.
- Show check-in status: completed, pending, missed.
- Show symptom trends over 7/30/90 days.
- Show heatmap-style severity or daily status view.
- Highlight urgent or worsening patterns such as pain worsening for 3 days, appetite low for 3 days, fatigue severe for several days, and missed check-ins.

### Questionnaire builder

- Caregiver can create or choose question sets.
- Suggested templates: Daily Wellness Check, Pain Check, Mood Check, Symptom Check.
- Caregiver should be able to choose which symptoms to track because not every senior needs every symptom.
- Custom icons/images may be useful later, but keep the MVP manageable.

### Insights and alerts

- Do not build a full AI agent yet.
- Use simple rule-based alerts first.
- Example alert rules: pain score >= 7 for 2 consecutive days is urgent; appetite poor for 3 days needs monitoring; breathing worsens is urgent.
- Caregiver summaries should be short and plain-language.
- Example tone: "Pain has increased over the last 3 days. Consider checking medication timing or contacting a healthcare professional if this persists."

### Resources

- Include placeholder resource cards for now.
- Future versions may include verified medical resources from trusted sources.
- Do not scrape medical websites automatically for the MVP.
- Resources should be clearly marked as informational, not medical diagnosis.

## Design Principles

- Mobile-first.
- Elderly-friendly.
- Large touch targets.
- High contrast.
- Minimal text.
- Emoji/icon-supported questions.
- Warm, calm, non-clinical design.
- Avoid overwhelming seniors.
- Caregiver side can be more detailed than senior side.
- Senior side should not require frequent login or complicated authentication.
- Make the senior flow feel like "help me keep track", not "fill in a medical form".

## Out of Scope for MVP

- Smart medication scheduling.
- Push notification logic.
- AI chatbot.
- Telegram bot.
- Full medical diagnosis.
- Complex validated clinical questionnaires.
- Full resource scraping pipeline.
- Wearable device integrations.
- Multi-language production support.
- Hospital/clinic integration.

## Future Considerations

- Validated questionnaire templates such as ECOG, ESAS, PHQ-9, GAD-7, ADL/IADL, etc.
- AI-generated caregiver summaries.
- Voice input for caregivers.
- Multilingual support.
- Verified medical resources.
- Medication tracker as a separate module or future app.
- Hospice / palliative care pilot testing.
