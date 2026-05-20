# SERAYA MVP Question Set

This is the first proposed senior-facing question set distilled from local Notion notes. It is intentionally simpler than validated clinical instruments and should be reviewed with Cheryl before implementation.

## Daily Check-In

| Order | Meaning | Prompt label | Question icon | Response options |
| --- | --- | --- | --- | --- |
| 1 | Overall wellbeing | Today | 🌤️ | 😀 🙂 😐 😣 😭 |
| 2 | Pain severity | Pain | 🪡 | 😀 🙂 😐 😣 😭 |
| 3 | Pain location | Where | 📍 | 🧠 🫀 🫁 🦴 🤲 🦵 🦶 ❓ |
| 4 | Energy | Energy | 🔋 | 🔋 🙂 😐 😴 🪫 |
| 5 | Appetite | Eat | 🍚 | 😋 🙂 😐 😕 🚫 |
| 6 | Breathing | Breathing | 🫁 | 🙂 😐 😮‍💨 🆘 |
| 7 | Mood | Mood | 🙂 | 😀 🙂 😐 😢 😭 |
| 8 | Nausea / vomiting | Vomit | 🤢 | 😀 🙂 😐 🤢 🤮 |
| 9 | Drowsiness | Sleepy | 😴 | 👀 🙂 😐 😴 💤 |

## Implementation Notes

- Keep the senior flow one question per screen.
- Keep labels short; icons and response emojis should carry most of the meaning.
- Cheryl should confirm whether all 9 questions belong in the default daily check-in or whether some should be optional templates.
- Pain location may need a body-map UI later; for MVP, the emoji/body-area choices can be used first.
- These are product prompts, not validated questionnaire copies.

## Reference-Only Instruments

The Notion notes mention ECOG, ADLs, ESAS-r, GAD-7, PHQ-9, HADS, and numeric pain scales. Treat these as references for future research, not as direct MVP content unless licensing, clinical fit, and implementation scope are reviewed.

- Do not reproduce HADS content in the app unless licensing is resolved.
- GAD-7 and PHQ-9 may be future mood-screening references, but the MVP senior check-in should stay simpler.
- ESAS-r is relevant to symptom tracking, especially palliative/cancer use cases, but the MVP should use plain-language prompts unless Cheryl decides otherwise.
