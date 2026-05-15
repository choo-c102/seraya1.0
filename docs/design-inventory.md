# Seraya Design Inventory

Source: Figma file `Iq3sfl74xGIGo6aQR6bqMr` — captured 2026-05-16.
Viewport: all screens are **393 x 852** (iPhone 14 Pro logical size).
Approach: Figma layer names are not authoritative (the designer is a beginner). Semantic names below are assigned by Claude based on the layer structure, text content, and child component types pulled from Figma's metadata XML.

> **Caveat:** the Figma MCP server hit a Starter-plan rate limit on 2026-05-16 before screenshots could be downloaded. This inventory is therefore inferred from structural metadata only — it has not been visually verified. Items marked `(unverified)` should be sanity-checked against Figma manually. Re-running the inventory once the quota resets (or after exporting frames as PNGs to `docs/figma-exports/`) will produce a visually-confirmed version.

## Document structure

The Figma file appears to contain **four logical clusters** plus a small set of reusable wizard-step symbols:

| Cluster | Screens | App side |
|---|---|---|
| Auth / Onboarding | Welcome, User Selection, Log in (+ variant) | Shared |
| Elderly daily check-in | Question 1, Question 2, Question 3, Completion | Elderly |
| Caregiver senior management | Select User, Build-Edit User, Question Builder | Caregiver |
| Caregiver dashboard | Trends ×3, Heatmap, Heatmap day-detail ×2, Insights | Caregiver |
| Question-builder wizard symbols | 5 small off-canvas templates | Caregiver (sub-flow) |

---

## Auth / Onboarding

### WelcomeScreen — `6:2`
- **Original Figma name:** Welcome
- **App side:** Shared
- **Purpose (inferred):** Splash / app entry; brand introduction before role selection.
- **Visible elements:**
  - Wordmark / logo "SERAYA"
  - Tagline text: "Tall as wisdom. Rooted in care."
  - A loader / progress indicator instance
  - A primary call-to-action button (likely "Get started" / continue)
- **Data fields shown:** none
- **Interactive elements:** primary CTA button → `UserSelectionScreen`
- **Image-only frames / sketches:** none observed in metadata.
- **Suggested component names:** `BrandWordmark`, `TaglineText`, `Loader`, `PrimaryButton`
- **Open assumptions:** Loader presence suggests a brief auto-advance; treat as either a 1-tap splash or a timed splash.

### UserSelectionScreen — `6:7`
- **Original Figma name:** User Selection
- **App side:** Shared
- **Purpose (inferred):** Role picker — decides whether to enter the senior (elderly) app or the caregiver app.
- **Visible elements:**
  - Heading: "WHO ARE YOU?"
  - Two large icon buttons labelled "SENIOR" and "CAREGIVER"
  - Secondary copy referencing a Borneo tree (brand metaphor)
- **Data fields shown:** none
- **Interactive elements:**
  - `SENIOR` button → elderly check-in flow (likely `LoginScreen` then `CheckinQuestionScreen` 1)
  - `CAREGIVER` button → caregiver flow (`LoginScreen` then `SelectSeniorScreen`)
- **Image-only frames / sketches:** likely a stylised tree illustration; treat as `BrandIllustration`.
- **Suggested component names:** `RolePickerCard`, `BrandIllustration`
- **Open assumptions:** Role pick may be persisted to local storage so the user lands directly on the right app next launch.

### LoginScreen — `9:964`
- **Original Figma name:** Log in
- **App side:** Shared
- **Purpose (inferred):** Email / phone + password login (reused by both apps).
- **Visible elements:**
  - SERAYA wordmark
  - `Login-Signup Form component` instance (input fields + submit)
  - Sign-up text link below the form
  - Back arrow (top-left)
- **Data fields shown:** input labels (likely email/phone + password) — exact strings need visual confirmation.
- **Interactive elements:** form submit → role-based home; signup link → registration; back arrow → previous screen.
- **Image-only frames / sketches:** none.
- **Suggested component names:** `LoginForm`, `BackArrow`, `LinkText`
- **Open assumptions:** Single login screen shared across apps; role context comes from `UserSelectionScreen` rather than from the form itself.

### LoginScreenVariant — `43:245` *(unverified — likely deprecated)*
- **Original Figma name:** Log in
- **App side:** Shared
- **Purpose (inferred):** Alternate/exploration version of the login screen. Sits detached from the main auth row at x=-10 and includes stray condition-icon thumbnails (sleeping/appetite/visions/slowed-movement/auditory) that don't belong on a login surface.
- **Suggested component names:** treat as **deprecated**; do not implement.
- **Open assumptions:** Pick `9:964` as the canonical login; ask the user to confirm `43:245` can be archived.

---

## Elderly daily check-in

### CheckinQuestionScaleScreen — `9:965`
- **Original Figma name:** Question 1
- **App side:** Elderly
- **Purpose (inferred):** A daily check-in question rendered as a 1–5 emoji scale (e.g. "How is your vision today?").
- **Visible elements:**
  - Large topic illustration ("visions" / eye illustration)
  - Question text
  - Five emoji rating buttons in a row, labelled **1-Bad / 2-Poor / 3-Average / 4-Good / 5-Great**
  - Likely a progress dot indicator (question N of M) — confirm visually
- **Data fields shown:** scale labels (1-Bad, 2-Poor, 3-Average, 4-Good, 5-Great)
- **Interactive elements:** five `SmileyButton`s → record score and advance; back arrow → previous question.
- **Image-only frames / sketches:** topic illustration ("visions"). Other topic illustrations expected per question: sleeping, appetite, balance, hearing, memory, toothache.
- **Suggested component names:** `CheckinQuestionScaleScreen`, `SmileyButton`, `EmojiScale`, `QuestionIllustration`, `ProgressDots`
- **Open assumptions:** A single shared screen template likely renders all "scale" questions from the questionnaire — illustration + question text are data-driven.

### CheckinQuestionBinaryScreen — `33:832`
- **Original Figma name:** Question 2
- **App side:** Elderly
- **Purpose (inferred):** A binary yes/no question (e.g. "Did you take your medicine?") — distinct interaction from the 1–5 scale.
- **Visible elements:**
  - Topic illustration ("medicine")
  - Question text
  - Two large affirm/decline rectangles (check + cross)
- **Data fields shown:** likely "Yes" / "No" labels (verbatim TBD).
- **Interactive elements:** affirm tile → record yes; decline tile → record no.
- **Image-only frames / sketches:** medicine illustration.
- **Suggested component names:** `CheckinQuestionBinaryScreen`, `BinaryChoiceTile`
- **Open assumptions:** Type not present in the mock-data questionnaire JSON (which only has `scale` and `multiselect`). Treat as a **future question type** — flagged below.

### CheckinQuestionMultiSelectScreen — `33:254`
- **Original Figma name:** Question 3
- **App side:** Elderly
- **Purpose (inferred):** Multi-select question (e.g. "Where do you feel pain today?"). Renders a gallery of small images / icons the user can tap to toggle.
- **Visible elements:**
  - Question text
  - Grid of 7 image tiles (named image 7–13 in Figma) — likely pain-point body diagrams (lower_back, stomach, knee, neck, wrist, chest, ankle, etc.)
- **Data fields shown:** option labels per tile (TBD; ties to `pain.options` in mock-data: lower_back, stomach, knee, neck, wrist, chest, ankle, tailbone, shoulder, headache, elbow, upper_traps).
- **Interactive elements:** tile tap → toggle selection; submit → next question.
- **Image-only frames / sketches:** 7 pain-location illustrations.
- **Suggested component names:** `CheckinQuestionMultiSelectScreen`, `PainPointTile`, `MultiSelectGrid`
- **Open assumptions:** Figma shows 7 tiles but mock-data has 12 pain options — the UI likely scrolls or the screen represents a partial sample. Confirm grid is scrollable.

### CheckinCompletionScreen — `11:109`
- **Original Figma name:** Completion
- **App side:** Elderly
- **Purpose (inferred):** Success state after the last question in a daily check-in.
- **Visible elements:**
  - Large checkmark icon
  - Likely a confirmation message and a button back to home (TBD)
- **Data fields shown:** none directly; may show "Check-in saved" timestamp.
- **Interactive elements:** dismiss → senior home.
- **Image-only frames / sketches:** decorative checkmark.
- **Suggested component names:** `CheckinCompletionScreen`, `SuccessCheckmark`

---

## Caregiver — senior management

### SelectSeniorScreen — `9:1312`
- **Original Figma name:** Select User
- **App side:** Caregiver
- **Purpose (inferred):** Picker for the caregiver to choose which senior to view; lists all seniors under the caregiver's care.
- **Visible elements:**
  - Heading: "SELECT USER"
  - Multiple `Senior Selection Button` instances (one per senior — photo, name, last check-in)
  - Notifications indicator (top-right)
  - Back arrow
- **Data fields shown:** senior name, photo, possibly last-check-in time, status badge.
- **Interactive elements:** senior row tap → caregiver dashboard for that senior (`CaregiverDashboardTrends`); notifications icon → alerts list.
- **Image-only frames / sketches:** none (uses senior photos).
- **Suggested component names:** `SeniorRow`, `NotificationBell`, `ScreenHeader`
- **Open assumptions:** "Last check-in" string format probably matches the `Build-Edit User` screen ("Today, 9:14 AM").

### SeniorListAdminScreen — `33:1036`
- **Original Figma name:** Build-Edit User
- **App side:** Caregiver
- **Purpose (inferred):** Caregiver's senior list in **admin/management mode** — used to add, edit, or remove seniors, and access their questionnaire builder.
- **Visible elements:**
  - Heading: "BUILD"
  - 3 `Senior Selection Button` rows, each showing:
    - Senior photo
    - Senior name
    - "Last check-in: Today, 9:14 AM"
    - Status pill (e.g. **Urgent** / **Active**)
    - Completion indicator (e.g. ring/percent)
  - Bottom tab navigation with two tabs: **Dashboard page**, **Build page**
- **Data fields shown:** "Last check-in: Today, 9:14 AM"; status (Urgent/Active); completion percentage.
- **Interactive elements:** senior row → `QuestionBuilderScreen`; Dashboard tab → trends; Build tab → this screen.
- **Image-only frames / sketches:** none.
- **Suggested component names:** `SeniorRow` (shared), `StatusPill`, `CompletionRing`, `BottomTabBar`, `BottomTab`
- **Open assumptions:** "BUILD" mode vs "SELECT" mode (`9:1312`) may be selected via the bottom tab. The same `SeniorRow` component should accept a `mode` prop.

### QuestionBuilderScreen — `33:915`
- **Original Figma name:** Senior Build, Edit, Delete, Preview, Save
- **App side:** Caregiver
- **Purpose (inferred):** Editor for a senior's daily questionnaire. Shows the current question list and exposes Add / Preview / Save actions.
- **Visible elements:**
  - Title: "Daily General Check-in"
  - 3 `Condition build` rows (each row = one question in the questionnaire; supports edit/delete inline)
  - Three action tiles: **Add Question**, **Preview**, **Save & Activate**
  - Bottom tab navigation
- **Data fields shown:** questionnaire name; per-row condition label.
- **Interactive elements:** row tap → edit question (likely enters wizard `64:289`); Add Question → wizard; Preview → preview-as-senior; Save & Activate → persist + close.
- **Image-only frames / sketches:** none.
- **Suggested component names:** `QuestionBuilderScreen`, `ConditionRow`, `ActionTile`
- **Open assumptions:** Whether Delete is a swipe action vs an inline icon is unclear. Tentatively swipe-to-delete.

---

## Caregiver — dashboard / trends / heatmap / insights

### CaregiverDashboardTrends — `11:93`
- **Original Figma name:** Senior Dashboard Trends 1
- **App side:** Caregiver
- **Purpose (inferred):** Per-senior trends dashboard — line chart of question scores over time with date-range filter and tab navigation between Trends / Insights / Heatmap views.
- **Visible elements:**
  - Senior profile summary (top — photo + name + age)
  - Date-range filter: **7D / 30D / 90D / 1Y / Custom**
  - Top tabs: **Trends | Insights | Heatmap**
  - Condition filter chips (multi-select)
  - Line chart with y-axis labels 5, 4, 3, 2, 1 and multiple line series (`Line 1`–`Line 7`)
  - `Daily Summary` card
  - Bottom tab navigation
- **Data fields shown:** y-axis labels 1–5; date range selection; condition labels.
- **Interactive elements:** range pill → reflow chart; condition chip → toggle line visibility; tab → switch view; chart point → drill into day-detail; bottom tabs → switch surface.
- **Image-only frames / sketches:** none.
- **Suggested component names:** `SeniorProfileSummary`, `DateRangePicker`, `TopTabBar`, `ConditionChip`, `TrendLineChart`, `DailySummaryCard`, `BottomTabBar`

### CaregiverDashboardTrendsState2 — `33:311`
- **Original Figma name:** Senior Dashboard Trends 2
- **App side:** Caregiver
- **Purpose (inferred):** Same as `11:93` but in a different data state — adds "Latest Check-in Summary" header, named condition icons (sleeping/appetite/visions/slowed-movement/auditory/pain-point/toothache), timestamp "08:50 AM 24 May", and ellipse data points.
- **Suggested component names:** uses the same components as `11:93`.
- **Open assumptions:** Treat as a **state variant** of `CaregiverDashboardTrends`, not a separate route. Implement as one screen driven by state.

### CaregiverDashboardTrendsState3 — `33:423`
- **Original Figma name:** Senior Dashboard Trends 3
- **App side:** Caregiver
- **Purpose (inferred):** Another state variant of trends — structurally identical to `33:311`. Likely a "filtered" or "after-applying-condition-chip" state.
- **Open assumptions:** Merge into `CaregiverDashboardTrends` as a state.

### CaregiverHeatmapScreen — `33:590`
- **Original Figma name:** Heatmap
- **App side:** Caregiver
- **Purpose (inferred):** Calendar-style heatmap of overall daily wellness for the selected senior. Cells coloured by aggregate score.
- **Visible elements:**
  - Senior profile summary
  - Weekday header labels (Mo / Tu / We / Th ...)
  - ~31-cell coloured grid (likely a month view)
  - Legend: "No data / Low / Mid / High"
  - Top tab bar (Trends | Insights | Heatmap) — `Heatmap` active
  - Back arrow + alert icon on chrome
  - Bottom tab navigation
- **Data fields shown:** legend labels; date cells.
- **Interactive elements:** cell tap → `HeatmapDayDetailScreen`.
- **Image-only frames / sketches:** none.
- **Suggested component names:** `CaregiverHeatmapScreen`, `HeatmapGrid`, `HeatmapDay`, `HeatmapLegend`

### HeatmapDayDetailScreen — `48:335` / `48:465`
- **Original Figma names:** Heatmap - Individual Day 1, Heatmap - Individual Day 2
- **App side:** Caregiver
- **Purpose (inferred):** Day-drill-down — same heatmap grid (with the selected day highlighted) plus a summary section showing each question's score for that day.
- **Visible elements:**
  - Heatmap grid (with selected day highlighted)
  - Header: "Showing April 29, 2026"
  - ~26 ellipses (likely per-question score dots — one per check-in metric)
- **Data fields shown:** selected date; per-question dot indicators.
- **Interactive elements:** tap another day cell → swap detail.
- **Suggested component names:** `HeatmapDayDetailScreen`, `QuestionScoreDot`
- **Open assumptions:** `48:335` and `48:465` look like two **dates' worth of data**, not two separate screens. Implement as one screen driven by a date prop.

### CaregiverInsightsScreen — `33:706`
- **Original Figma name:** Insights
- **App side:** Caregiver
- **Purpose (inferred):** Lists active alerts and AI-style suggestions for the senior. The hero card matches the Siti mock-data alert pattern (sleep decline, 4 consecutive days).
- **Visible elements:**
  - Senior profile summary
  - Top tab bar (Trends | Insights | Heatmap) — `Insights` active
  - Expandable alert card with title "Sleep quality decline - 4 consecutive days"
  - Sub-line: "Triggered 3 days ago"
  - Status button (likely Active / Resolved)
  - Narrative paragraph about Siti
  - "SUGGESTED ACTIONS" heading + 5-item numbered list
  - Expand/collapse toggle
  - Bottom tab navigation
- **Data fields shown:** alert title, severity, "Triggered N days ago", suggestion list items.
- **Interactive elements:** card tap → expand/collapse; status button → update alert state; suggestion item → mark done / open guidance.
- **Suggested component names:** `CaregiverInsightsScreen`, `AlertCard`, `SuggestedActionList`, `SuggestedActionItem`, `StatusButton`
- **Open assumptions:** Suggestion list may be AI-generated (consistent with the `ANTHROPIC_API_KEY` slot in `.env.example`).

---

## Question-builder wizard symbols (Caregiver sub-flow)

These five nodes sit off-canvas (x≈2630+, y≈-790 to -855) at ~340x620 size — smaller than a phone viewport. They look like step templates for a "Build a question" wizard, accessed from `QuestionBuilderScreen` (`33:915`).

> Figma metadata reports **0 children** for each — they may be empty placeholders that the designer hasn't built out yet. Implementation strategy: scaffold the wizard structure but expect content to be sparse until the user finishes designing them.

| Node ID | Original name | Inferred wizard step |
|---|---|---|
| `64:289` | Build a question | Step 1 — enter question prompt text |
| `64:290` | describe emoji | Step 2 — configure emoji labels / icons for the scale |
| `64:291` | response type | Step 3 — choose response widget (scale / binary / multiselect) |
| `64:292` | threshold | Step 4 — set alert threshold (matches `alerts.threshold` shape in mock-data: metric, condition, consecutive_days) |
| `64:293` | question done | Step 5 — confirmation / save |

**Suggested component names:** `QuestionWizard`, `WizardStepHeader`, `WizardNavButtons`, `ThresholdConfigForm`.

---

## Component Glossary

Reusable components observed across screens (PascalCase, definition):

| Name | Where used | Description |
|---|---|---|
| `BrandWordmark` | Welcome, Login | The SERAYA logo text element. |
| `TaglineText` | Welcome | Brand tagline copy. |
| `BrandIllustration` | Welcome, User Selection | Decorative tree illustration. |
| `Loader` | Welcome, anywhere async | Spinning loader indicator. |
| `PrimaryButton` | Welcome, multiple | Primary CTA button. |
| `RolePickerCard` | User Selection | Large icon+label tile for choosing Senior vs Caregiver. |
| `BackArrow` | Login, Select User, Heatmap, etc. | Top-left navigation back chevron. |
| `LinkText` | Login | Inline text link (e.g. "Sign up"). |
| `LoginForm` | Login | Email/phone + password form composite. |
| `SmileyButton` | Check-in scale screen | One of the five emoji rating buttons. |
| `EmojiScale` | Check-in scale screen | Row of five `SmileyButton`s. |
| `QuestionIllustration` | All check-in scale questions | Topic-specific illustration above the question (eye, moon, plate, ear, brain, tooth, etc.). |
| `ProgressDots` | Check-in flow | "N of M" progress indicator. |
| `BinaryChoiceTile` | Binary check-in question | Large yes/no choice block. |
| `PainPointTile` | Multi-select check-in | Tappable image tile in the pain-point grid. |
| `MultiSelectGrid` | Multi-select check-in | Layout grid wrapping `PainPointTile`s. |
| `SuccessCheckmark` | Completion | Decorative success icon. |
| `SeniorRow` | Select User, Build-Edit User | Senior's photo + name + last-check-in + status row. Accepts a `mode` prop ("select" vs "manage"). |
| `NotificationBell` | Select User | Top-right bell icon with badge. |
| `StatusPill` | Senior rows | Coloured pill (Urgent / Active / etc.). |
| `CompletionRing` | Senior rows | Circular progress indicator. |
| `ScreenHeader` | Most caregiver screens | Title + optional back/icon row. |
| `BottomTabBar` | Caregiver app | Bottom tab strip (Dashboard / Build tabs). |
| `BottomTab` | Caregiver app | Single tab item in `BottomTabBar`. |
| `ConditionRow` | Question Builder | Row representing one question in the editor. |
| `ActionTile` | Question Builder | Large action button (Add / Preview / Save). |
| `SeniorProfileSummary` | All caregiver dashboard screens | Header showing senior's photo, name, age. |
| `DateRangePicker` | Trends | 7D/30D/90D/1Y/Custom pill row. |
| `TopTabBar` | Trends / Insights / Heatmap | Switch between dashboard views. |
| `ConditionChip` | Trends | Toggleable filter chip for one question metric. |
| `TrendLineChart` | Trends | Multi-series line chart of scores over time. |
| `DailySummaryCard` | Trends | Card summarising one day's check-in. |
| `HeatmapGrid` | Heatmap, day-detail | Weekday × week grid. |
| `HeatmapDay` | Heatmap | Single coloured cell. |
| `HeatmapLegend` | Heatmap | "No data / Low / Mid / High" key. |
| `QuestionScoreDot` | Day-detail | Per-question dot indicator. |
| `AlertCard` | Insights | Expandable alert card with severity + narrative. |
| `SuggestedActionList` | Insights | Numbered list of recommended actions. |
| `SuggestedActionItem` | Insights | One row in `SuggestedActionList`. |
| `StatusButton` | Insights, alerts | Toggle between Active / Acknowledged / Resolved states. |
| `QuestionWizard` | Question builder wizard | Multi-step modal flow. |
| `WizardStepHeader` | Wizard | Step title + step indicator. |
| `WizardNavButtons` | Wizard | Back / Next / Save buttons. |
| `ThresholdConfigForm` | Wizard step 4 | Form for metric + condition + consecutive_days. |

---

## Shared Patterns

- **Viewport:** 393 x 852 (iPhone 14 Pro). Use device-safe-area insets on top and bottom.
- **Two app shells:**
  - Elderly app — minimal chrome, no bottom tabs; check-in flow is linear question screens; ends on `CheckinCompletionScreen`.
  - Caregiver app — bottom tab bar with at least **Dashboard / Build** tabs; per-senior surface has a top tab strip **Trends | Insights | Heatmap**.
- **Senior identity model:** all caregiver screens show a `SeniorProfileSummary` at the top — name, photo, age. Photo is supplied by the senior (placeholder default expected).
- **Scoring scale:** all "scale" questions use **1–5** with consistent verbal anchors. The check-in UI uses `1-Bad / 2-Poor / 3-Average / 4-Good / 5-Great` while the mock-data labels are per-question (e.g. vision: "Very blurry → Very clear"). Treat the per-question labels in the JSON as the source of truth.
- **Status palette:** "Urgent" pill (high-severity), "Active" pill (default). Heatmap legend uses "No data / Low / Mid / High". Map directly onto a small color tokens table — pending visual confirmation of exact hexes.
- **Time format:** "Last check-in: Today, 9:14 AM" — short relative date + 12-hour clock with am/pm.
- **Date format:** "April 29, 2026" — full month name in heatmap day detail.
- **Iconography:** condition icons referenced by short tokens: `sleeping, appetite, visions, slowed-movement, auditory, pain-point, toothache`. These will need to align with the question IDs in mock-data (`vision`, `sleep`, `appetite`, `balance`, `hearing`, `memory`, `toothache`, `pain`, `tired`). Mapping table needed (flagged below).

---

## Open Questions & Assumptions

1. **Duplicate Log-in screen (`43:245`):** treated as deprecated. Confirm with user before deleting from Figma.
2. **Wizard symbol nodes (`64:289`–`64:293`):** metadata shows 0 children — likely empty placeholders. Wizard scaffolding will be built but step content is `TBD` until visually verified.
3. **Question Builder scope (`33:915`):** treated as one screen with multiple inline states (build / edit / delete via swipe / preview / save), not five separate screens.
4. **Trends state variants (`11:93`, `33:311`, `33:423`):** treated as **one** screen `CaregiverDashboardTrends` rendered in different data/filter states.
5. **Heatmap day detail variants (`48:335`, `48:465`):** treated as one screen driven by a date prop.
6. **Binary question type (`33:832`):** Figma includes a binary yes/no question, but the mock-data questionnaire JSON only defines `scale` and `multiselect` types. We will plan for a `binary` type in the schema and surface a TODO.
7. **Pain-point grid count:** Figma shows 7 tiles, JSON defines 12 pain locations. Grid must scroll or paginate.
8. **Icon-token mapping:** Figma uses tokens `sleeping / appetite / visions / slowed-movement / auditory / pain-point / toothache`; mock-data uses IDs `vision / sleep / appetite / balance / hearing / memory / toothache / pain / tired`. Recommended map:
   - `visions` → `vision`
   - `sleeping` → `sleep`
   - `appetite` → `appetite`
   - `slowed-movement` → `balance` *(assumed — confirm)*
   - `auditory` → `hearing`
   - `pain-point` → `pain`
   - `toothache` → `toothache`
   - (no Figma icon yet for `memory`, `tired`)
9. **Exact colours, type scale, spacing:** all pending visual verification. To unblock, either re-run the inventory once the Figma quota resets, or export each frame as PNG to `docs/figma-exports/` and re-inspect.
