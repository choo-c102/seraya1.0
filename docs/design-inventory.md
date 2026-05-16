# Seraya Design Inventory

Source: Figma file `Iq3sfl74xGIGo6aQR6bqMr` — captured 2026-05-16, **visually verified** 2026-05-16 from PNG exports in `docs/figma-exports/`.
Viewport: all main-flow screens are **393 x 852** (iPhone 14 Pro logical size). The five wizard symbols (`64:289`–`64:293`) are exported inside an iPhone bezel mock-up at a smaller off-canvas size — same intent, different framing.
Approach: Figma layer names are not authoritative (the designer is a beginner). Semantic names below are assigned by Claude based on the visuals, child component types, and text content.

> **Visual pass complete.** Each section below describes what is actually on the canvas, not what the metadata XML inferred. Where copy is a placeholder in Figma (e.g. `<Condition> rated <score>`, "Senior Name 1", "Age 00 · Questionnaire name · X questions"), the placeholder is recorded verbatim because the implementation will substitute live data into those exact slots.
>
> **Open-source icon substitution:** the user has approved swapping the hand-drawn Figma icons for Phosphor / Lucide / Feather equivalents (or emoji on the elderly smiley scale). The proposed mapping per icon family lives in the relevant screen sections and is collated in `packages/shared/src/design-tokens.ts` (`conditionIcons`).
>
> The 23 node IDs (for cross-reference with Figma):
> `6:2`, `6:7`, `9:964`, `43:245`, `9:965`, `33:832`, `33:254`, `11:109`, `9:1312`, `33:1036`, `33:915`, `11:93`, `33:311`, `33:423`, `33:590`, `48:335`, `48:465`, `33:706`, `64:289`, `64:290`, `64:291`, `64:292`, `64:293`.

## Document structure

The Figma file contains **four logical clusters** plus a five-step "Build a Question" wizard sub-flow:

| Cluster | Screens | App side |
|---|---|---|
| Auth / Onboarding | Welcome, User Selection, Log in (+ visual duplicate) | Shared |
| Elderly daily check-in | Question 1 (scale), Question 2 (binary), Question 3 (multiselect), Completion | Elderly |
| Caregiver senior management | Select User, Build (senior list), Question Builder | Caregiver |
| Caregiver dashboard | Trends ×3 (state variants), Heatmap, Heatmap-day-detail ×2 (state variants), Insights | Caregiver |
| Question-builder wizard | 5 steps: emoji pick, describe, response type, threshold, confirmation | Caregiver (sub-flow) |

---

## Auth / Onboarding

### WelcomeScreen — `6:2`
- **Original Figma name:** Welcome
- **App side:** Shared
- **Purpose:** Splash / app entry. Brand introduction before role selection.
- **Visible elements:**
  - Spinner glyph (8-spoke radial burst, near-black stroke) centred high on the screen.
  - Hand-drawn 3-tree illustration mid-screen (two tall trees flanking a small middle tree, all line-art).
  - Wordmark "SERAYA" — large, bold, wide letter-spacing (~4–5 px tracking).
  - Tagline "Tall as wisdom. Rooted in care." in small body weight.
  - Primary pill-shaped CTA labelled **ENTER** — white fill, thin black outline, soft drop shadow.
- **Data fields shown:** none.
- **Interactive elements:** `ENTER` pill → `UserSelectionScreen`.
- **Icon substitutions:**
  - Spinner → `lucide:LoaderCircle` (or any animated spinner).
  - Tree illustration → keep as SVG asset (`assets/brand/seraya-trees.svg`) — it's the brand mark and shouldn't be substituted.
- **Suggested component names:** `BrandWordmark`, `BrandTagline`, `BrandTreesMark`, `Spinner`, `PillButton`.

### UserSelectionScreen — `6:7`
- **Original Figma name:** User Selection
- **App side:** Shared
- **Purpose:** Role picker. Routes the user into the senior (elderly) app or the caregiver app.
- **Visible elements:**
  - Heading "WHO ARE YOU?" — uppercase, bold, ~32 px.
  - Two round role tiles side-by-side (~150 px diameter), each with a thin near-black outline, soft drop shadow, cream interior:
    - **SENIOR** tile — line-icon of a person's head/shoulders with radiating sun rays above.
    - **CAREGIVER** tile — line-icon of two cupped hands holding a heart-with-medical-cross.
  - Label below each tile (uppercase, wide-tracked).
  - Italic centred caption at the very bottom: *"Named for Borneo's tallest tropical tree, its great height held up by wide buttress roots, just as our elders' wisdom rests on the care that surrounds them."*
- **Data fields shown:** none.
- **Interactive elements:**
  - **SENIOR** tile → elderly `LoginScreen` then `CheckinQuestionScaleScreen`.
  - **CAREGIVER** tile → caregiver `LoginScreen` then `SelectSeniorScreen`.
- **Icon substitutions:**
  - Senior tile glyph → `lucide:UserRound` framed with `lucide:Sun` rays (or compose with `phosphor:UserCircleGear`).
  - Caregiver tile glyph → `phosphor:HandHeart` (preferred — most faithful) or `lucide:HeartHandshake`.
- **Suggested component names:** `RolePickerTile`, `RolePickerGroup`, `BrandFooterCaption`.

### LoginScreen — `9:964`
- **Original Figma name:** Log in
- **App side:** Shared
- **Purpose:** Email + password sign-in. Single shared screen — role context is captured upstream in `UserSelectionScreen` and stored in client state.
- **Visible elements:**
  - Top-left back chevron (`lucide:ChevronLeft`).
  - Centred brand block (trees mark + "SERAYA" wordmark + tagline).
  - White rounded card (~16 px radius, ~24 px internal padding) containing:
    - "Email" label + outlined text input with placeholder "Value".
    - "Password" label + outlined text input with placeholder "Value".
    - Full-width primary button **Sign In** — dark charcoal fill `#2C2C2C`, white text, ~16 px radius.
    - Inline underlined link "Forgot password?" (left-aligned).
    - Right-aligned bold link "Have an invite? Register here."
  - Below the card, italic underlined "Log in as guest" link.
- **Data fields shown:** input labels Email / Password, all placeholders read "Value" (Figma stub).
- **Interactive elements:**
  - Sign In → role-appropriate home.
  - Forgot password? → password reset (route TBD — not in inventory).
  - Have an invite? Register here. → registration (route TBD).
  - Log in as guest → seed-data demo session.
  - Back arrow → `UserSelectionScreen`.
- **Icon substitutions:** back chevron → `lucide:ChevronLeft`.
- **Suggested component names:** `LoginForm`, `LabeledInput`, `PrimaryButtonSolid` (dark variant), `TextLink`, `GuestLoginLink`, `BackChevron`.

### LoginScreen (visual duplicate) — `43:245`
- **Original Figma name:** Log in
- **App side:** Shared
- **Purpose:** Pixel-identical duplicate of `9:964`. No structural or copy differences observed between the two PNGs. The inventory had previously flagged "stray condition-icon thumbnails" — this is **false**; nothing of the kind is on the rendered frame.
- **Suggested component names:** none new — same as `9:964`.
- **Recommendation:** Archive in Figma; implement only `9:964`. The duplicate is a remnant of design iteration.

---

## Elderly daily check-in

### CheckinQuestionScaleScreen — `9:965`
- **Original Figma name:** Question 1
- **App side:** Elderly
- **Purpose:** Daily 1–5 emoji-scale question (e.g. vision today?).
- **Visible elements:**
  - Large topic illustration centred in the upper third of the screen. For Q1 it's a hand-drawn eye-with-eyelash-rays in black line-art (~180 × 180).
  - **No question text rendered in the frame** — the question prompt is delivered visually by the illustration alone. The text label is data-driven and lives only in `EmojiScale`'s anchor labels at run time.
  - Row of five `SmileyButton`s spanning the bottom of the screen, each a coloured outline circle ~60 px:
    1. Red `#D14545` — frowning, tear/sweat drop.
    2. Orange `#E89346` — sad / unhappy.
    3. Yellow `#E5BE3F` — neutral half-smile.
    4. Light green `#8FC8A0` — content smile.
    5. Deep green `#2E9E5B` — broad smile.
- **Data fields shown:** none in the frame; the screen relies on the data layer to supply (a) the topic illustration key and (b) the per-question anchor strings (e.g. vision uses "Very blurry → Very clear").
- **Interactive elements:** tap a `SmileyButton` → record score 1–5 and advance to next question. No back arrow visible — assume hardware/swipe back.
- **Icon substitutions:**
  - Eye illustration → `phosphor:Eye` (line-weight variant) at large size.
  - Other topic illustrations (rendered elsewhere): see `conditionIcons` map in design-tokens.
  - Smiley faces → emoji fallback (`😢 😟 😐 🙂 😄`) is acceptable; preferred is a custom coloured-outline component matching the Figma scale colours.
- **Suggested component names:** `CheckinQuestionScaleScreen`, `SmileyButton`, `EmojiScale`, `QuestionIllustration`.
- **Note on `ProgressDots`:** none visible in the frame. Drop from the component glossary unless added in a later spec.

### CheckinQuestionBinaryScreen — `33:832`
- **Original Figma name:** Question 2
- **App side:** Elderly
- **Purpose:** Binary yes/no daily question (e.g. "Did you take your medicine?"). Same chrome and illustration treatment as the scale screen.
- **Visible elements:**
  - Topic illustration upper-centre: hand-drawn pill capsule + circular tablet, black line-art (~200 × 180).
  - **No prompt text in the frame** — like the scale screen, the question label is data-driven.
  - Two large solid circular response buttons at the bottom, ~110 px diameter:
    - Left: red fill `#E94B4B` with cream/white X glyph (negative).
    - Right: green fill `#2BC04A` with white check glyph (affirmative).
- **Data fields shown:** none in the frame.
- **Interactive elements:** red circle → record `false`; green circle → record `true`.
- **Icon substitutions:**
  - Medicine illustration → `phosphor:Pill` or `lucide:Pill`.
  - X glyph → `lucide:X`.
  - Check glyph → `lucide:Check`.
- **Suggested component names:** `CheckinQuestionBinaryScreen`, `BinaryChoiceButton` (renamed from `BinaryChoiceTile` — they are circles, not tiles), `BinaryChoiceRow`.

### CheckinQuestionMultiSelectScreen — `33:254`
- **Original Figma name:** Question 3
- **App side:** Elderly
- **Purpose:** Multi-select question — "where do you feel pain today?" — rendered as a gallery of pain-point illustrations the senior taps to toggle.
- **Visible elements:**
  - Vertical column of pain-point illustrations, **7 visible** in the export, each ~150 × 150 px. Every illustration is a stylised cartoon human with a purple-grey halo behind a red dot marking the body part:
    1. Knee (foot up on a step, hands on knee).
    2. Wrist / hand (one hand cradling the other's wrist).
    3. Lower back (figure clutching lower back).
    4. Neck (figure cradling neck).
    5. Hip / pelvis (figure with leg up on a step, hand on hip).
    6. Chest (figure with hand on chest).
    7. Shoulders / upper traps (figure with arms raised, both hands on shoulders).
  - **No question text, no submit button, no header chrome** visible in the export — the screen is just the gallery. Tapping likely toggles a state (no selected-state visible) and a submit affordance lives off-frame in the implementation (the export appears to be a scroll-content snapshot).
- **Data fields shown:** none in the frame; option labels come from data (`pain.options`: lower_back, stomach, knee, neck, wrist, chest, ankle, tailbone, shoulder, headache, elbow, upper_traps).
- **Interactive elements:** tile tap → toggle selection.
- **Icon substitutions:** keep these illustrations as bespoke SVG assets — they're more communicative than a Phosphor body-part icon. Acceptable fallback per option:
  - knee → `lucide:Footprints` (weak fit; prefer SVG)
  - wrist → `lucide:Hand`
  - lower_back → no good icon; SVG only
  - neck / chest / shoulder → `phosphor:Person` with annotation overlay
- **Suggested component names:** `CheckinQuestionMultiSelectScreen`, `PainPointTile`, `PainPointGrid`.
- **Layout note:** Figma renders the tiles in a single vertical column with **two** per row except a single tile dangling at the bottom — implementation should scroll vertically and tile in a 2-column grid; full 12-option set is data-driven.

### CheckinCompletionScreen — `11:109`
- **Original Figma name:** Completion
- **App side:** Elderly
- **Purpose:** Success state after the last question.
- **Visible elements:**
  - **Nothing but** a centred solid green circle (~80 px) with a white check glyph. No text, no button, no banner. The Figma frame is otherwise empty cream.
- **Data fields shown:** none.
- **Interactive elements:** none rendered. Implementation should auto-dismiss after ~1.5 s or render a tap-anywhere-to-continue affordance not in the Figma.
- **Icon substitutions:** check → `lucide:Check` inside a filled green disc; or `lucide:CircleCheck` (filled).
- **Suggested component names:** `CheckinCompletionScreen`, `SuccessCheckMark`.

---

## Caregiver — senior management

### SelectSeniorScreen — `9:1312`
- **Original Figma name:** Select User
- **App side:** Caregiver
- **Purpose:** Picks which senior the caregiver wants to view. Top-level home for the caregiver app.
- **Visible elements:**
  - Top bar: back chevron (left) · centred bold uppercase title **SELECT USER** · bell icon (right).
  - Three vertically stacked rounded white cards (~16 px radius, soft shadow), each `SeniorRow`:
    - Left: large green outline check-mark circle (~70 px) — placeholder for senior photo / status. **Not** a photo in this mock.
    - Centre: bold "Senior Name N" on first line, smaller "Last check-in: Today, 9:14 AM" on second line.
    - Right: status pill, rounded, ~24 px tall:
      - Row 1: **Urgent** — salmon-pink bg, dark-red text.
      - Row 2: **Monitor** — peach/apricot bg, brown text.
      - Row 3: **Positive** — mint-green bg, dark-green text.
  - No bottom tab bar on this screen (despite the next two screens having one — this is a pre-tab "pick a senior" gate).
- **Data fields shown:** senior name, "Last check-in: Today, 9:14 AM" / "Today, 8:30 AM" / "Yesterday, 4:00 PM", status (Urgent / Monitor / Positive).
- **Interactive elements:** card tap → `CaregiverDashboardTrends`; bell → alerts list (route TBD); back → `UserSelectionScreen`.
- **Icon substitutions:**
  - Back chevron → `lucide:ChevronLeft`.
  - Bell → `lucide:Bell`.
  - Photo placeholder green-check → `lucide:CircleCheck` (kept as placeholder; replace with senior avatar when uploaded).
- **Suggested component names:** `SelectSeniorScreen`, `ScreenHeader` (back · title · trailing icon), `SeniorRow`, `StatusPill` (with `tone` prop: `urgent | monitor | positive | active | inactive`), `NotificationBell`.

### SeniorListBuildScreen — `33:1036`
- **Original Figma name:** Build-Edit User
- **App side:** Caregiver
- **Purpose:** Caregiver's senior-management list. Each row is one senior's *questionnaire* (not the senior themselves). Tapping a row opens the question-builder for that senior.
- **Visible elements:**
  - Top bar: back chevron · uppercase bold **BUILD** title (left-aligned) · solid teal "Create New" pill button (right).
  - Three white rounded `QuestionnaireRow` cards, each containing:
    - Left: empty green outline circle (no check inside — distinct from the `SelectSeniorScreen` rows).
    - Centre: bold "Senior Name N" on first line, sub-line is the questionnaire name (e.g. "Daily General Check-in", "Pain check", "Symptom check"), tiny status pill underneath (`Active`, `Acitve` (sic — typo in Figma), `Inactive`).
    - Right: edit pencil-on-paper icon (black line).
  - Bottom tab bar at the very bottom of the screen, two tabs:
    - **Dashboard** — 4-tile-grid icon, currently inactive (grey).
    - **Build** — gear-with-spanner/wrench icon, currently active (black).
- **Data fields shown:** senior name, questionnaire name, status (`Active` / `Inactive`).
- **Interactive elements:**
  - Row tap → `QuestionBuilderScreen` for that senior's questionnaire.
  - Edit pencil → same as row tap (or inline rename — TBD).
  - Create New → opens the question-builder wizard for a new questionnaire (or for a new senior — TBD; the label is ambiguous).
  - Back → `SelectSeniorScreen`.
  - Bottom tabs → `Dashboard` switches to `CaregiverDashboardTrends`; `Build` is the current surface.
- **Icon substitutions:**
  - Edit pencil → `lucide:SquarePen` (matches the framed-pencil glyph).
  - Empty status ring → `lucide:Circle` (or a stylised radial progress).
  - Dashboard tab icon → `lucide:LayoutGrid`.
  - Build tab icon → `phosphor:WrenchHammer` or `lucide:Wrench` (combined gear+wrench in Figma; pick one).
  - Back chevron → `lucide:ChevronLeft`.
- **Suggested component names:** `SeniorListBuildScreen`, `QuestionnaireRow` (renamed from generic `SeniorRow` because the row is anchored on a questionnaire, not the senior identity), `StatusPill` (shared, see `SelectSeniorScreen`), `BottomTabBar`, `BottomTab`, `PrimaryButtonPill` (teal variant).

### QuestionBuilderScreen — `33:915`
- **Original Figma name:** Senior Build, Edit, Delete, Preview, Save
- **App side:** Caregiver
- **Purpose:** Editor for one senior's daily questionnaire. Shows the current question list (drag-to-reorder, swipe/tap-delete) and exposes Add / Preview / Save & Activate.
- **Visible elements:**
  - Top: back chevron (left) · `SeniorProfileSummary` with circular grey photo placeholder, bold "Senior Name 1", sub-line "Age 00 · Questionnaire name · X questions".
  - Section title "Daily General Check-in" (bold ~24 px, left-aligned).
  - Three white rounded `ConditionRow` cards stacked vertically, each containing:
    - Left: 6-dot drag handle (`lucide:GripVertical`).
    - Centre-left: condition icon (Vision eye, Sleep Quality moon-with-Zzz, Appetite fork-with-X).
    - Centre: bold condition name + sub-line "Scale (1-5)".
    - Right: red trash icon `lucide:Trash2` (fill `#E94B4B`).
  - Three stacked action buttons (full-width, ~16 px radius):
    1. **Add Question** — white fill, no border, black bold label.
    2. **Preview** — white fill with thin teal outline, teal bold label.
    3. **Save & Activate** — solid teal fill, white bold label.
  - Bottom tab bar (same as `SeniorListBuildScreen`) — `Build` tab active.
- **Data fields shown:** "Senior Name 1", "Age 00 · Questionnaire name · X questions", questionnaire title "Daily General Check-in", per-row condition names + scale type label.
- **Interactive elements:**
  - Drag handle → reorder.
  - Row tap or condition icon → edit (likely re-enters wizard at step 2 with the existing values).
  - Trash → delete (with confirmation TBD).
  - **Add Question** → wizard step 1 (`64:289`).
  - **Preview** → preview-as-senior modal.
  - **Save & Activate** → persist + close.
- **Icon substitutions:**
  - Drag handle → `lucide:GripVertical`.
  - Trash → `lucide:Trash2`.
  - Vision → `lucide:Eye` (or `phosphor:Eye`).
  - Sleep Quality → `lucide:MoonStar` (the Figma glyph is a sleeping-face with Zz on the cheek; closest open-source semantic is moon-with-stars).
  - Appetite → `lucide:UtensilsCrossed` (fork-crossed, matches the "fork with X" Figma glyph) — `phosphor:ForkKnife` is acceptable.
- **Suggested component names:** `QuestionBuilderScreen`, `SeniorProfileSummary` (avatar + name + meta line), `ConditionRow`, `ActionButtonStack`, `PrimaryButton` (variant: `ghost | outline | solid`).

---

## Caregiver — dashboard / trends / heatmap / insights

> **Top tab order is `Trends | Heatmap | Insights`** — note the heatmap is the middle tab, not the last. Previous inventory had this wrong.

### CaregiverDashboardTrends — `11:93` / `33:311` / `33:423`
- **Original Figma names:** Senior Dashboard Trends 1 / 2 / 3
- **App side:** Caregiver
- **Purpose:** Per-senior trends dashboard. Shows latest-check-in summary, condition + date-range filters, and a line chart of the selected metric across the selected range.
- **Three frames are state variants of one screen:**
  - `11:93` → active filter: **vision** (eye). Chart: a flat-then-dip-then-flat line at 4 with a single dip to 3 on Thursday.
  - `33:311` → active filter: **sleep**. Chart: zig-zag with peak 4 on Wed, dip 2 on Fri.
  - `33:423` → active filter: **appetite**. Chart: alternating peaks at 4 and troughs at 3.
  - Latest-Check-in Summary, alert banner, top tabs, date range, condition strip, chart card, bottom tabs are **identical across all three**. Treat as ONE screen with the active condition chip driving the chart series.
- **Visible elements (composite description):**
  - Top: back chevron + `SeniorProfileSummary` (circular grey avatar placeholder, "Senior Name 1", "Age 00 · Questionnaire name · X questions").
  - Salmon-coral alert banner (`AlertBanner`) with a yellow warning triangle on the left and template text "`<Condition> rated <score> for <n> consecutive days`". The banner is a stub — production will render the real alert string with substitutions, or be hidden if no active alerts.
  - Top tab bar — `Trends` (active, teal) | `Heatmap` | `Insights`. Thin horizontal divider beneath.
  - White rounded `LatestCheckinSummary` card:
    - Title "Latest Check-in Summary" (bold) on the left, date "24 May" + time "08:50 AM" on the right.
    - Row of 8 condition icons (left-to-right): eye, moon-Zzz, fork-X, foot, ear-with-sound-waves, brain-with-?, tooth, bullseye-with-lightning-bolt.
    - Beneath each icon, a small status dot — green (`statusGood`) or orange (`statusWarning`). The dot pattern across the three states is constant: G O G O O G O G (so the dot row is rendered from the latest check-in's per-condition aggregate, not from filter state).
  - "Filter by:" label, bold.
  - Date-range row of pills: **7D** (active, teal solid, white text) | **30D** | **90D** | **1Y** | **Custom**. Inactive pills are white with thin outline.
  - Condition strip — 8 square rounded chip buttons in a single row matching the order in the summary card. Exactly one chip is active (teal solid, white-icon); the rest are inactive (white, black icon).
  - White rounded chart card (`TrendLineChart`):
    - Y-axis labels 5 → 1 (top to bottom), four light grey gridlines.
    - X-axis labels MON / TUE / WED / THU / FRI / SAT / SUN.
    - Single muted-lavender line (`chartStroke`) with no markers visible at this zoom level.
  - Bottom tab bar — Dashboard (active) | Build.
- **Data fields shown:** "24 May 08:50 AM"; "Senior Name 1", "Age 00", placeholder `<Condition>`, `<score>`, `<n>`; chart y-values 1–5; weekday labels.
- **Interactive elements:** alert banner tap → `CaregiverInsightsScreen`; tab → switch view; date pill → reflow chart range; condition chip → swap chart series; condition icon in summary card → presumably same as chip; chart point → drill into day detail (route TBD); bottom tab → switch surface.
- **Icon substitutions:**
  - Yellow alert triangle → `phosphor:WarningCircle` filled or `lucide:TriangleAlert`.
  - Per-condition icons → see `conditionIcons` in design-tokens.
- **Suggested component names:** `CaregiverDashboardTrends`, `AlertBanner`, `TopTabBar`, `LatestCheckinSummary`, `ConditionIconStrip`, `StatusDot`, `DateRangePicker`, `ConditionChipStrip`, `ConditionChip`, `TrendLineChart`, `BottomTabBar` (shared).

### CaregiverHeatmapScreen — `33:590`
- **Original Figma name:** Heatmap
- **App side:** Caregiver
- **Purpose:** Calendar-month heatmap of overall daily wellness for the selected senior.
- **Visible elements:**
  - Same `SeniorProfileSummary`, same alert banner, same top tab bar (`Heatmap` active), same bottom tab bar.
  - White rounded `HeatmapCard`:
    - Header row: "April 2026" on the left, `<` / `>` month nav arrows on the right.
    - Weekday header: Mo / Tu / We / Th / Fr / Sa / Su (no spaces; wide letter-spacing).
    - 5-row × 7-col grid of rounded squares (cells ~50 × 50 px, ~8 px radius). First four cells (Mo–Th week 1) are grey "no-data"; the rest are filled with either dark green (`heatHigh`) or one light-green (`heatMid`).
  - Legend row beneath the grid, four chips: grey "No data", deep-red "Low", light-green "Mid", dark-green "High". Note the **Low** state is **deep red**, not orange — this corrects the previous palette assumption.
- **Data fields shown:** month label, weekday labels, legend labels.
- **Interactive elements:** cell tap → reveal day-detail (`HeatmapDayDetailScreen` shows this as the same surface with a card slid in below).
- **Icon substitutions:**
  - Month nav chevrons → `lucide:ChevronLeft` / `lucide:ChevronRight`.
- **Suggested component names:** `CaregiverHeatmapScreen`, `HeatmapCard`, `HeatmapHeader`, `HeatmapGrid`, `HeatmapDay`, `HeatmapLegend`, `HeatmapLegendChip`.

### HeatmapDayDetailScreen — `48:335` / `48:465`
- **Original Figma names:** Heatmap - Individual Day 1 / 2
- **App side:** Caregiver
- **Purpose:** Same heatmap card with one cell highlighted (thin outline), plus a stacked `DayDetailCard` revealing per-condition scores for the selected day. **The two frames are two different scrolled states of the same screen, not two separate screens.**
  - `48:335` shows the top of the day-detail list: Vision · Sleep quality · Appetite · Mobility · Hearing — each with a 5-pip dot row indicating the score (filled vs. empty pips, green when filled).
  - `48:465` shows the rest scrolled into view: Toothache · Cognition · Pain. The Pain row is special — instead of a 5-pip score, it has a right-aligned text label "Lowerback" (the multiselect answer).
- **Visible elements (composite):**
  - Same chrome as `33:590` (avatar summary, alert banner, top tab bar, bottom tab bar).
  - Heatmap card identical to `33:590` but with one cell outlined.
  - Sub-header text "Showing April 29, 2026" left-aligned beneath the legend.
  - White rounded `DayDetailCard` titled "April 28, 2026" with `<` / `>` day-nav chevrons on the right.
  - Inside, list of `DayDetailRow`s — left: condition icon + name; right: either a 5-pip `DotScore` for scale answers or a free-text label for multiselect answers.
- **Note:** the visible "Showing April 29, 2026" header and "April 28, 2026" card title are mismatched in Figma. Treat this as a designer typo — the card title should match the highlighted cell. Implementation should drive both from a single `selectedDate`.
- **Data fields shown:** selected date string (full month name); per-condition pip counts; multiselect answer labels.
- **Interactive elements:** cell tap → swap detail card; day-nav chevrons → previous / next day with data.
- **Icon substitutions:** chevrons → `lucide:ChevronLeft` / `lucide:ChevronRight`; condition icons → see `conditionIcons`.
- **Suggested component names:** `HeatmapDayDetailScreen` (same route as `CaregiverHeatmapScreen`, just with `selectedDate` state set), `DayDetailCard`, `DayDetailRow`, `DotScore`, `MultiSelectAnswerLabel`.

### CaregiverInsightsScreen — `33:706`
- **Original Figma name:** Insights
- **App side:** Caregiver
- **Purpose:** Lists active alerts and suggested actions / resources for the selected senior. The export is small/compressed but the structure is legible.
- **Visible elements:**
  - Same chrome (avatar summary, top tab bar with `Insights` active, bottom tab bar). No alert banner — alerts are the page content.
  - Stack of expandable `AlertCard`s. Two are visible:
    1. **Sleep quality decline - 4 consecutive days**
       - Sub-line "Triggered 3 days ago".
       - Status pill (top-right) — green `Active` (acknowledged) state.
       - Body paragraph (Siti narrative — multi-line text about persistent low sleep scores).
       - "SUGGESTED ACTIONS" heading + numbered list (~5 items).
       - "RESOURCES" heading + 3 small white resource rows, each with category label (e.g. "Hospital / Clinic - Notable & Sleep Medicine Department", "NyOP - Telemedicine 24/7 Hotline", "Senior Citizen Health Service") and a trailing pill indicating action type.
       - Expand/collapse chevron.
    2. **Appetite decline with tasty appetite changes** (truncated, partly visible at the bottom of the export)
       - Same internal structure as the first card.
- **Data fields shown:** alert title, "Triggered N days ago", narrative paragraph, suggestion items, resource names + descriptors.
- **Interactive elements:** card chevron → expand/collapse; status pill → cycle through alert state (Triggered → Monitoring → Resolved); suggested-action item → mark done or open guidance; resource row → open external link / call.
- **Icon substitutions:**
  - Card chevron → `lucide:ChevronDown` (rotates).
  - Resource action pills (the trailing chip on each resource row) — preserve as `StatusPill` with `tone="info"`.
- **Suggested component names:** `CaregiverInsightsScreen`, `AlertCard`, `AlertCardHeader`, `AlertNarrative`, `SuggestedActionList`, `SuggestedActionItem`, `ResourceList`, `ResourceRow`, `StatusPill` (shared).
- **Open assumption:** Suggested actions and the narrative paragraph are AI-generated (consistent with `ANTHROPIC_API_KEY` in `.env.example`). Resources may be a static lookup keyed by alert metric.

---

## Question-builder wizard (Caregiver sub-flow)

**Update:** the previous metadata-only pass reported "0 children" for these nodes. **That was wrong.** Each wizard step is fully designed. They render inside an iPhone bezel mock-up rather than as a bare 393×852 frame, with a pure-white background instead of the cream parchment used elsewhere — implementation should still use cream to match the rest of the app, treating the white as an off-canvas presentation quirk. The primary button on every step is blue (`#3478F6`-ish), distinct from the teal accent used elsewhere; implementation should normalise this to the brand teal.

### QuestionWizardStep1EmojiPick — `64:289`
- **Original Figma name:** Build a question
- **Purpose:** Pick an emoji that visually represents the new question.
- **Visible elements:**
  - Title "Build a Question", sub-text "Select an emoji to represent your concern".
  - Category-tab strip: **All** (active blue pill) · Senses · Habits · Symptoms.
  - 4-column grid of 3D-style emoji tiles (e.g. happy smile, worried face, dizzy face, pill capsule, stethoscope, heart, brain, ear, eye, tooth, sleeping face, apple, poop, sick face, scared face, lungs, sneezing face).
  - Last cell is an upload-rectangle (dashed outline + upload arrow) for a custom image.
- **Data fields shown:** category names; emoji ids per cell.
- **Interactive elements:** category tab → filter grid; emoji tile → select + advance to step 2; upload tile → image picker.
- **Icon substitutions:** the emoji grid uses Microsoft Fluent 3D emojis. Acceptable production substitution: native platform emojis at large size (the app is single-platform mobile, so the OS emoji set is fine).
- **Suggested component names:** `WizardStep1EmojiPick`, `EmojiCategoryTabs`, `EmojiGrid`, `EmojiTile`, `EmojiUploadTile`.

### QuestionWizardStep2Description — `64:290`
- **Original Figma name:** describe emoji
- **Purpose:** Describe what the chosen emoji represents.
- **Visible elements:**
  - Back chevron + title "Add Description".
  - Selected emoji centred (~120 px) with subtle drop shadow.
  - Label "What does this represent?" + multi-line text input with placeholder "e.g., Morning headache severity".
  - Full-width **Next** button — disabled state shown (grey fill, lighter text). Becomes blue when input is non-empty.
- **Data fields shown:** placeholder example string.
- **Interactive elements:** type into textarea → enables Next; Next → step 3; back → step 1.
- **Suggested component names:** `WizardStep2Description`, `EmojiPreview`, `LabeledTextarea`, `PrimaryButtonSolid` (disabled-state aware).

### QuestionWizardStep3ResponseType — `64:291`
- **Original Figma name:** response type
- **Purpose:** Choose how the senior will answer this question.
- **Visible elements:**
  - Back chevron + title "Response Type".
  - Sub-text "How should users answer this question?".
  - Three vertically stacked option cards (large rounded rectangles with subtle grey border):
    1. **1-5 Scale** — "Rate from 1 to 5 using smiley faces" — preview row of 5 small coloured smiley emojis.
    2. **Yes/No** — "Simple yes or no question" — preview green-check + red-X.
    3. **Pain Location** — "Select body part affected" — small human-figure preview.
- **Data fields shown:** response-type labels + descriptions.
- **Interactive elements:** card tap → select + advance.
- **Suggested component names:** `WizardStep3ResponseType`, `ResponseTypeCard`.

### QuestionWizardStep4Threshold — `64:292`
- **Original Figma name:** threshold
- **Purpose:** Set the alert threshold — how many consecutive concerning responses trigger an alert.
- **Visible elements:**
  - Back chevron + title "Alert Threshold".
  - Sub-text "Set when you want to be notified".
  - Label "For how many consecutive days?" + horizontal slider (teal filled track, grey unfilled, ~16 px circular knob) + right-side blue-square `<n>` value bubble.
  - Pale-blue info card with text "You'll be alerted after `<n>` consecutive days of concerning responses".
  - Full-width blue **Next** button.
- **Data fields shown:** slider value (1–14 reasonable range; the export shows 6).
- **Interactive elements:** slider drag → live update value + info text; Next → step 5.
- **Note:** the data shape matches the `alerts.threshold` schema in mock data (`metric`, `condition`, `consecutive_days`). This screen only sets `consecutive_days`; `metric` is the question being built and `condition` is implied by response type (e.g. for a 1–5 scale, condition is "score ≤ 2"). Whether the wizard ever exposes a `condition` picker is unanswered by the visuals — assume not.
- **Suggested component names:** `WizardStep4Threshold`, `ThresholdSlider`, `InfoCard`.

### QuestionWizardStep5Done — `64:293`
- **Original Figma name:** question done
- **Purpose:** Confirmation step — preview the created question and offer follow-up actions.
- **Visible elements:**
  - Centred mint-bg disc with green check (success indicator).
  - "Question Saved!" headline, sub-text "Your custom question has been created".
  - Preview card: emoji + question text "Smiled today?" + meta rows "Response Type: Yes/No", "Alert Threshold: 6 days".
  - Two full-width buttons stacked: blue solid **Create Another Question**; grey ghost **View All Questions**.
- **Data fields shown:** the new question's emoji, prompt, response-type label, threshold-days value.
- **Interactive elements:** Create Another → step 1; View All → back to `QuestionBuilderScreen`.
- **Suggested component names:** `WizardStep5Done`, `SuccessHeader`, `QuestionPreviewCard`, `WizardActionStack`.

**Shared wizard components:** `QuestionWizard` (host that holds shared header + step state), `WizardBackChevron`, `WizardTitle`, `WizardSubtext`, `WizardNextButton`.

---

## Component Glossary

Reusable components observed across the visual pass (PascalCase):

| Name | Where used | Description |
|---|---|---|
| `BrandWordmark` | Welcome, Login | "SERAYA" wordmark, wide tracking. |
| `BrandTagline` | Welcome, Login | "Tall as wisdom. Rooted in care." tagline. |
| `BrandTreesMark` | Welcome, Login | Three-tree line-art brand mark. |
| `BrandFooterCaption` | User Selection | Long italic Borneo-tree caption. |
| `Spinner` | Welcome | 8-spoke radial spinner. |
| `PillButton` | Welcome ("ENTER") | White pill, thin black outline, soft shadow. |
| `RolePickerTile` | User Selection | Round outlined tile with icon + label. |
| `RolePickerGroup` | User Selection | Row of two `RolePickerTile`s. |
| `BackChevron` | Most screens | Top-left back-arrow chevron. |
| `ScreenHeader` | Caregiver screens | back · title · trailing-icon top bar. |
| `LabeledInput` | Login | Label + outlined text input. |
| `LabeledTextarea` | Wizard step 2 | Label + outlined multi-line input. |
| `LoginForm` | Login | Email + password + Sign In + links composite. |
| `TextLink` | Login, etc. | Underlined inline link. |
| `GuestLoginLink` | Login | Italic "Log in as guest" link beneath card. |
| `PrimaryButtonSolid` | Login (dark), Wizard (blue), Senior list ("Create New" teal), Question builder ("Save & Activate" teal) | Solid-fill pill button with `tone` prop. |
| `PrimaryButtonOutline` | Question builder ("Preview") | White fill, accent outline, accent text. |
| `PrimaryButtonGhost` | Question builder ("Add Question") | White fill, no border. |
| `ActionButtonStack` | Question builder | Three stacked full-width buttons. |
| `SmileyButton` | Check-in scale screen | One coloured-outline smiley in the 1–5 row. |
| `EmojiScale` | Check-in scale screen | Row of five `SmileyButton`s. |
| `QuestionIllustration` | Check-in screens | Topic-specific line-art illustration above the answer widget. |
| `BinaryChoiceButton` | Binary check-in | Large coloured circle with check or X glyph. |
| `BinaryChoiceRow` | Binary check-in | Row of two `BinaryChoiceButton`s. |
| `PainPointTile` | Multi-select check-in | Tappable pain-point illustration tile. |
| `PainPointGrid` | Multi-select check-in | 2-col scrollable grid of `PainPointTile`s. |
| `SuccessCheckMark` | Completion | Filled green disc with white check. |
| `SeniorRow` | Select User | photo-circle · name · last-check-in · status-pill row. |
| `QuestionnaireRow` | Build (senior list) | progress-ring · name · questionnaire-name · status-pill · edit-pencil row. |
| `StatusPill` | Senior rows, Insights | Coloured pill with `tone` prop: `urgent | monitor | positive | active | inactive | info`. |
| `NotificationBell` | Select User | Top-right bell icon (no badge rendered in current Figma). |
| `BottomTabBar` | Caregiver app | Bottom strip with Dashboard / Build tabs. |
| `BottomTab` | Caregiver app | Single tab item (icon + label). |
| `SeniorProfileSummary` | Question builder + all caregiver dashboard screens | Avatar circle + bold name + "Age N · Questionnaire · X questions" meta line. |
| `ConditionRow` | Question builder | drag-handle · icon · name · scale-type · trash-button. |
| `AlertBanner` | Caregiver dashboard screens | Salmon-coral pill banner with warning triangle + templated alert text. Tap → Insights. |
| `TopTabBar` | Caregiver dashboard | Trends · Heatmap · Insights tab strip. |
| `LatestCheckinSummary` | Trends | White card with title + timestamp + condition-icon strip + status-dot row. |
| `ConditionIconStrip` | LatestCheckinSummary | Row of 8 condition icons. |
| `StatusDot` | LatestCheckinSummary | Small filled circle, green or orange. |
| `DateRangePicker` | Trends | 7D / 30D / 90D / 1Y / Custom pill row. |
| `ConditionChipStrip` | Trends | Row of 8 square rounded chips. |
| `ConditionChip` | Trends | Single square rounded icon-chip with active/inactive state. |
| `TrendLineChart` | Trends | Y(1–5) × X(weekdays) line chart. |
| `HeatmapCard` | Heatmap, day detail | White card holding the heatmap grid. |
| `HeatmapHeader` | Heatmap | Month title + nav chevrons. |
| `HeatmapGrid` | Heatmap | 5×7 grid of `HeatmapDay`s. |
| `HeatmapDay` | Heatmap | One coloured rounded square; tones: noData / low / mid / high; selected outlined state. |
| `HeatmapLegend` | Heatmap | Row of four labelled tone chips. |
| `HeatmapLegendChip` | Heatmap | Single legend chip (colour + label). |
| `DayDetailCard` | Heatmap day detail | White card titled with the selected date. |
| `DayDetailRow` | Day detail | Condition icon + name + score widget. |
| `DotScore` | Day detail | 5-pip score readout (filled green / empty grey). |
| `MultiSelectAnswerLabel` | Day detail | Right-aligned text label for multi-select answers (e.g. "Lowerback"). |
| `AlertCard` | Insights | Expandable card with header, status pill, narrative, suggested actions, resources. |
| `AlertCardHeader` | Insights | Title + "Triggered N days ago" + status pill. |
| `AlertNarrative` | Insights | Multi-line paragraph (likely AI-generated). |
| `SuggestedActionList` | Insights | Numbered list. |
| `SuggestedActionItem` | Insights | One row in `SuggestedActionList`. |
| `ResourceList` | Insights | Stack of `ResourceRow`s. |
| `ResourceRow` | Insights | Resource name + descriptor + trailing pill. |
| `QuestionWizard` | Sub-flow host | Holds shared chrome (back, title, subtext, progress). |
| `WizardTitle` | All wizard steps | Step title. |
| `WizardSubtext` | All wizard steps | Step sub-text. |
| `WizardNextButton` | Wizard | Full-width primary button with disabled-state. |
| `EmojiCategoryTabs` | Wizard step 1 | All / Senses / Habits / Symptoms tabs. |
| `EmojiGrid` | Wizard step 1 | 4-column emoji tile grid. |
| `EmojiTile` | Wizard step 1 | One emoji cell. |
| `EmojiUploadTile` | Wizard step 1 | Dashed-outline upload cell. |
| `EmojiPreview` | Wizard step 2 | Centred large emoji. |
| `ResponseTypeCard` | Wizard step 3 | Large option card with title + description + preview. |
| `ThresholdSlider` | Wizard step 4 | Horizontal slider + value bubble. |
| `InfoCard` | Wizard step 4 | Pale-blue info / hint card. |
| `QuestionPreviewCard` | Wizard step 5 | Preview of the configured question. |
| `WizardActionStack` | Wizard step 5 | Stacked Create Another / View All buttons. |

(Components removed from the previous glossary because no visual evidence supports them: `Loader` (renamed `Spinner`), `BrandIllustration` (renamed `BrandTreesMark`), `ProgressDots` (not visible on the check-in flow), `CompletionRing` (the rings on senior-list rows are simple outlines, not progress arcs — use `lucide:Circle` or `lucide:CircleCheck`), `BinaryChoiceTile` (renamed `BinaryChoiceButton` — they're circles), `MultiSelectGrid` (renamed `PainPointGrid`), `DailySummaryCard` (the actual element is `LatestCheckinSummary` — different shape), `ThresholdConfigForm` (the wizard step is just a slider + info card, not a multi-field form), `WizardStepHeader` / `WizardNavButtons` (replaced with `WizardTitle` + `WizardNextButton` per the actual chrome).)

---

## Shared Patterns

- **Viewport:** 393 × 852 (iPhone 14 Pro). Use device-safe-area insets on top and bottom.
- **Two app shells:**
  - **Elderly app** — minimal chrome, no bottom tabs; no header text on check-in screens; the check-in flow is linear illustration + answer-widget screens; ends on `CheckinCompletionScreen`.
  - **Caregiver app** — bottom tab bar with **Dashboard / Build** tabs. The per-senior surface has a top tab strip **Trends | Heatmap | Insights**.
- **Senior identity model:** all caregiver dashboard / builder screens show `SeniorProfileSummary` at the top — circular avatar placeholder + bold name + "Age N · Questionnaire name · X questions" meta line. Photo placeholder is a flat grey disc in Figma; replace with real avatars when available.
- **Scoring scale:** all "scale" questions use **1–5**. Per-question anchor labels (e.g. vision: "Very blurry → Very clear") come from the mock-data JSON. The five smiley colours are red → orange → yellow → light-green → green (low → high).
- **Status palette:** `Urgent` (salmon / dark-red), `Monitor` (peach / brown), `Positive` and `Active` (mint / dark-green), `Inactive` (grey). The Heatmap legend uses a different set: `No data` (grey), `Low` (deep red), `Mid` (light green), `High` (dark green). All exact hexes live in `packages/shared/src/design-tokens.ts`.
- **Time format:** "Last check-in: Today, 9:14 AM" — short relative date + 12-hour clock with am/pm.
- **Date format:** "April 29, 2026" — full month name. Sub-header style is sentence-case; card title style is wide-tracked.
- **Iconography:** condition icons referenced by short tokens — see `conditionIcons` in `packages/shared/src/design-tokens.ts` for the open-source mapping.

---

## Open Questions & Assumptions

1. **Duplicate Log-in screen (`43:245`)** — **resolved.** The two login PNGs are visually identical (no stray icons, no copy diff). Treat `43:245` as a deprecated duplicate; implement only `9:964`.
2. **Wizard symbol nodes (`64:289`–`64:293`)** — **resolved.** Not empty — each step is fully designed (emoji picker, description, response type, threshold slider, success preview). The metadata-only pass was wrong. The frames are rendered inside iPhone bezel mock-ups against a pure-white background and use a blue accent rather than the brand teal — normalise both to brand defaults during implementation.
3. **Question Builder scope (`33:915`)** — **resolved.** One screen, with delete via an inline red trash icon (not swipe) and three stacked CTAs (Add Question / Preview / Save & Activate). Reorder via drag-handle on each row. No separate edit/delete/preview/save screens.
4. **Trends state variants (`11:93`, `33:311`, `33:423`)** — **resolved.** All three are the same screen with different `activeCondition` filter state (vision / sleep / appetite). The chart data shape, alert banner, Latest Check-in card, and tab bars are identical across all three. Implement as one route driven by `selectedCondition` state.
5. **Heatmap day detail variants (`48:335`, `48:465`)** — **resolved.** Same screen as `33:590` with a `selectedDate` state set and a `DayDetailCard` appended; `48:335` and `48:465` show two scroll positions / day-detail-list halves of the same card (Vision/Sleep/Appetite/Mobility/Hearing then Toothache/Cognition/Pain). Figma has a minor typo (header says April 29, card title says April 28) — drive both from one date in code.
6. **Binary question type (`33:832`)** — **resolved (still a schema TODO).** Figma confirms the type exists and is one big-red-X-circle vs big-green-check-circle. Mock-data JSON only has `scale` and `multiselect`; add `binary` to the schema. The wizard's response-type step (step 3) lists `Yes/No` alongside `1-5 Scale` and `Pain Location`, so all three types are part of the designer's intent.
7. **Pain-point grid count** — **resolved.** Figma shows 7 illustrations rendered in a vertical column (likely 2-column when wrapped to screen width). Mock data has 12 pain locations — the grid must scroll. The Figma is a snapshot of the top of the scroll, not a complete inventory of tiles. Bespoke SVG assets are needed for each location; no good open-source icon set covers them all.
8. **Icon-token mapping** — **resolved.** Final map (Figma token → mock-data question_id → open-source icon):
   - `visions` → `vision` → `lucide:Eye`
   - `sleeping` → `sleep` → `lucide:MoonStar`
   - `appetite` → `appetite` → `lucide:UtensilsCrossed`
   - `slowed-movement` → `balance` → `lucide:Footprints` (Figma glyph is a single foot — `lucide:Footprints` is the closest legible match; alternative `phosphor:PersonSimpleWalk`)
   - `auditory` → `hearing` → `lucide:Ear`
   - `cognition` → `memory` → `lucide:BrainCircuit` (Figma glyph is brain-with-?; `lucide:Brain` is also fine)
   - `toothache` → `toothache` → `phosphor:Tooth` (Lucide has no good tooth)
   - `pain-point` → `pain` → `lucide:Crosshair` (Figma glyph is bullseye-with-lightning-bolt; `lucide:Crosshair` covers the bullseye, layered with `lucide:Zap` for the bolt — or `phosphor:Target`)
   - (no Figma icon yet for `tired` — propose `lucide:BatteryLow` as a placeholder)
9. **Exact colours, type scale, spacing** — **resolved (best-fit hexes locked).** See `packages/shared/src/design-tokens.ts`. Source-of-truth values were sampled from `06-02-welcome.png`, `11-93-trends-state-1.png`, and `33-590-heatmap.png` and rounded for consistency where adjacent screens rendered the same logical colour with minor variation.

### Residual unknowns (not in the original 9; surfaced during the visual pass)

- **Top-tab order** — the Figma renders `Trends | Heatmap | Insights`. Some prior notes had `Trends | Insights | Heatmap` — go with the Figma order.
- **`Create New` button on the Build screen** — unclear whether it creates a new questionnaire for an existing senior or invites/creates a new senior. The label is ambiguous; defaulting to "create a new questionnaire" pending confirmation.
- **Wizard "condition" choice** — step 4 only exposes `consecutive_days`. There is no UI for the `condition` half of an alert threshold (e.g. score ≤ 2 vs score ≥ 4). Assume condition is implied by response type ("concerning" = bottom-two scores for scale, "No" for binary, any selection for multiselect).
- **Notification bell badge** — present in copy ("Notifications indicator") but no badge dot is drawn in the Figma. Render the icon without a badge for v1.
- **Welcome `ENTER` vs Welcome auto-advance** — the spinner suggests a timed splash but the explicit `ENTER` pill says manual advance. Use the pill; the spinner is decorative.
