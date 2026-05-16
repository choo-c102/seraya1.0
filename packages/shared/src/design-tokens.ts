/**
 * Seraya design tokens.
 *
 * Values derived by visual inspection of the 23 Figma frame exports in
 * `docs/figma-exports/`. Where adjacent screens rendered the same logical
 * colour with minor variation the values were rounded to a single canonical
 * hex per role. See `docs/design-inventory.md` for the visual audit.
 *
 * Pure data — no imports, no React Native dependencies. Apps consume this
 * through `@seraya/shared`.
 */

// ---------------------------------------------------------------------------
// Colours
// ---------------------------------------------------------------------------

export const colors = {
  // Surfaces
  background: "#F1E8DA", // warm cream parchment, used on every main-flow screen
  backgroundAlt: "#FFFFFF", // pure white (wizard sub-flow background)
  surface: "#FFFFFF", // white cards / inputs
  surfaceMuted: "#F4F4F6", // wizard tile / disabled-button fill
  border: "#D9D9D9", // hairline borders, input outlines, inactive pills
  divider: "#E5E5E5", // top-tab underline, hairline rules

  // Text
  textPrimary: "#1A1A1A", // body + headings on cream / white
  textSecondary: "#4A4A4A", // sub-lines, meta text ("Age 00 · ...")
  textMuted: "#8A8A8A", // placeholders, inactive tab labels
  textOnAccent: "#FFFFFF", // text on solid teal / dark buttons
  textOnDark: "#FFFFFF", // text on the dark Sign In button

  // Accent (brand teal / forest green)
  accent: "#1B5C4F", // active tabs, primary teal fills, Preview text
  accentMuted: "#B9E0CD", // mint pill backgrounds (Active / Positive)
  accentSoft: "#E4F2EA", // subtle teal tint (wizard step-5 success disc)

  // Buttons
  buttonDark: "#2C2C2C", // Login "Sign In" button fill
  buttonBlue: "#3478F6", // wizard primary button (will be retuned to accent at impl time)
  buttonDisabled: "#C8C8CC", // wizard Next button while input is empty

  // Status
  statusGood: "#2E9E5B", // green status dot, smiley-5
  statusWarning: "#E89346", // orange status dot, smiley-2
  statusUrgent: "#D14545", // red, smiley-1
  statusNeutral: "#E5BE3F", // yellow, smiley-3

  // Status pills (bg + fg pairs)
  pillUrgentBg: "#F4B5AC",
  pillUrgentFg: "#A8261E",
  pillMonitorBg: "#F5C99B",
  pillMonitorFg: "#7A3F12",
  pillPositiveBg: "#B9E0CD",
  pillPositiveFg: "#15663F",
  pillActiveBg: "#B9E0CD",
  pillActiveFg: "#15663F",
  pillInactiveBg: "#E4E4E4",
  pillInactiveFg: "#5A5A5A",
  pillInfoBg: "#E4F2EA",
  pillInfoFg: "#1B5C4F",

  // Alert banner
  alertBg: "#F4A89F", // salmon coral
  alertIcon: "#F5C518", // yellow warning triangle
  alertText: "#1A1A1A",

  // Smiley faces (scale 1–5, low → high)
  smiley1: "#D14545", // red — Bad
  smiley2: "#E89346", // orange — Poor
  smiley3: "#E5BE3F", // yellow — Average
  smiley4: "#8FC8A0", // light green — Good
  smiley5: "#2E9E5B", // deep green — Great

  // Binary check-in
  binaryYes: "#2BC04A", // green check disc
  binaryNo: "#E94B4B", // red X disc

  // Pain-point illustrations
  painDot: "#E94B4B", // red dot marking the painful body part
  painHalo: "#A4A7D8", // lavender circle behind the figure

  // Heatmap legend tones
  heatNoData: "#D9D9D9",
  heatLow: "#B3261E", // deep red, NOT orange
  heatMid: "#A8D5BA", // light green
  heatHigh: "#157A45", // dark green

  // Chart
  chartStroke: "#8A8FE2", // muted lavender / purple
  chartGrid: "#E5E5E5",
  chartAxisLabel: "#1A1A1A",

  // Misc
  trash: "#E94B4B", // red trash icon in QuestionBuilder
  shadow: "rgba(0, 0, 0, 0.10)", // soft card / button drop shadow
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

/**
 * Figma does not pin a custom font for the file; the rendered text matches the
 * iOS / Android system stack. Apps should default to System.
 *
 * Sizes are tuned to the 393×852 viewport. `letterSpacing` is in absolute px
 * (React Native semantics).
 */
export const typography = {
  family: "System",

  // SERAYA wordmark — wide-tracked all-caps
  display: { size: 36, weight: "700", letterSpacing: 4, lineHeight: 44 },

  // Screen titles ("WHO ARE YOU?", "SELECT USER", "BUILD")
  h1: { size: 28, weight: "700", letterSpacing: 2, lineHeight: 34 },

  // Card titles ("Latest Check-in Summary", "Senior Name 1"), section titles
  h2: { size: 22, weight: "700", letterSpacing: 0, lineHeight: 28 },

  // Sub-section titles ("Daily General Check-in")
  h3: { size: 18, weight: "700", letterSpacing: 0, lineHeight: 24 },

  // Body / button labels
  body: { size: 16, weight: "400", letterSpacing: 0, lineHeight: 22 },
  bodyBold: { size: 16, weight: "700", letterSpacing: 0, lineHeight: 22 },

  // Sub-lines, meta rows ("Age 00 · Questionnaire name · X questions")
  caption: { size: 13, weight: "400", letterSpacing: 0, lineHeight: 18 },

  // Status pill labels, legend chip labels
  pill: { size: 12, weight: "600", letterSpacing: 0, lineHeight: 16 },

  // Tab bar labels
  tab: { size: 14, weight: "600", letterSpacing: 0, lineHeight: 18 },

  // Wide-tracked uppercase section labels ("SUGGESTED ACTIONS", "RESOURCES")
  overline: { size: 12, weight: "700", letterSpacing: 1.5, lineHeight: 16 },
} as const;

// ---------------------------------------------------------------------------
// Spacing & radii
// ---------------------------------------------------------------------------

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8, // pills, small chips
  md: 12, // medium tiles
  lg: 16, // cards, primary buttons
  xl: 20,
  pill: 999,
} as const;

// ---------------------------------------------------------------------------
// Shadows (object form for React Native's StyleSheet shadow*** props)
// ---------------------------------------------------------------------------

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

// ---------------------------------------------------------------------------
// Condition icon map
//
// Maps each `question_id` used in the mock-data questionnaire JSON to the
// open-source icon (Phosphor / Lucide preferred) the user has approved as a
// stand-in for the Figma hand-drawn glyphs.
//
// Keys are the mock-data ids (`vision`, `sleep`, ...). The previous Figma
// "token" names (visions / sleeping / slowed-movement / auditory / cognition /
// pain-point) are aliased so existing references still resolve.
// ---------------------------------------------------------------------------

export const conditionIcons = {
  // Canonical mock-data ids
  vision: "lucide:Eye",
  sleep: "lucide:MoonStar",
  appetite: "lucide:UtensilsCrossed",
  balance: "lucide:Footprints",
  hearing: "lucide:Ear",
  memory: "lucide:BrainCircuit",
  toothache: "phosphor:Tooth",
  pain: "lucide:Crosshair",
  tired: "lucide:BatteryLow",

  // Figma-token aliases (point to the same icons)
  visions: "lucide:Eye",
  sleeping: "lucide:MoonStar",
  "slowed-movement": "lucide:Footprints",
  auditory: "lucide:Ear",
  cognition: "lucide:BrainCircuit",
  "pain-point": "lucide:Crosshair",
} as const satisfies Record<string, string>;

// ---------------------------------------------------------------------------
// Misc icon map (non-condition icons substituted for hand-drawn Figma glyphs)
// ---------------------------------------------------------------------------

export const uiIcons = {
  backChevron: "lucide:ChevronLeft",
  forwardChevron: "lucide:ChevronRight",
  downChevron: "lucide:ChevronDown",
  bell: "lucide:Bell",
  trash: "lucide:Trash2",
  edit: "lucide:SquarePen",
  dragHandle: "lucide:GripVertical",
  check: "lucide:Check",
  cross: "lucide:X",
  circleCheck: "lucide:CircleCheck",
  circle: "lucide:Circle",
  spinner: "lucide:LoaderCircle",
  warning: "lucide:TriangleAlert",
  // Bottom-tab icons
  tabDashboard: "lucide:LayoutGrid",
  tabBuild: "lucide:Wrench",
  // Wizard step-3 response-type previews use the same condition / binary icons
  upload: "lucide:Upload",
} as const satisfies Record<string, string>;

// ---------------------------------------------------------------------------
// Heatmap tone helper
// ---------------------------------------------------------------------------

export const heatmapTones = {
  noData: colors.heatNoData,
  low: colors.heatLow,
  mid: colors.heatMid,
  high: colors.heatHigh,
} as const;

// ---------------------------------------------------------------------------
// Type exports
// ---------------------------------------------------------------------------

export type ColorToken = keyof typeof colors;
export type TypographyToken = keyof typeof typography;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radii;
export type ConditionIconKey = keyof typeof conditionIcons;
export type UiIconKey = keyof typeof uiIcons;
export type HeatmapTone = keyof typeof heatmapTones;
