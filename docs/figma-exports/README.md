# Figma frame exports

Drop PNG exports of the 23 Figma frames here. Once they all land, Claude can re-annotate `docs/design-inventory.md` against the visuals and start the screen build-out.

## Export settings (in Figma)

For each frame:

1. Select the frame on canvas.
2. Right panel → **Export** section.
3. Set **1×** scale, **PNG** format. Leave the suffix empty.
4. Click **Export <frame name>** and save into this folder using the filename in the table below.

The frames are already sized to the iPhone 14 Pro viewport (393 × 852 px), so 1× is enough. Bump to 2× if you want retina-sharp screenshots — Claude only needs them clear, not pixel-perfect.

If a frame is off-canvas / empty (the wizard symbols `64:289`–`64:293` showed 0 children in metadata), still export whatever's there — even an empty rectangle confirms the placeholder state.

## Expected files

Save each PNG with the exact name in the **Filename** column. The leading number is the Figma node ID with `:` → `-` so it sorts naturally.

### Auth / Onboarding

| Filename | Node ID | Figma layer name |
|---|---|---|
| `06-02-welcome.png` | `6:2` | Welcome |
| `06-07-user-selection.png` | `6:7` | User Selection |
| `09-964-login.png` | `9:964` | Log in |
| `43-245-login-variant.png` | `43:245` | Log in (variant — likely deprecated) |

### Elderly daily check-in

| Filename | Node ID | Figma layer name |
|---|---|---|
| `09-965-checkin-q1-scale.png` | `9:965` | Question 1 (1–5 scale) |
| `33-832-checkin-q2-binary.png` | `33:832` | Question 2 (binary yes/no) |
| `33-254-checkin-q3-multiselect.png` | `33:254` | Question 3 (multiselect) |
| `11-109-checkin-completion.png` | `11:109` | Completion |

### Caregiver — senior management

| Filename | Node ID | Figma layer name |
|---|---|---|
| `09-1312-select-senior.png` | `9:1312` | Select User |
| `33-1036-build-edit-senior.png` | `33:1036` | Build-Edit User |
| `33-915-question-builder.png` | `33:915` | Senior Build/Edit/Delete/Preview/Save |

### Caregiver — dashboard

| Filename | Node ID | Figma layer name |
|---|---|---|
| `11-93-trends-state-1.png` | `11:93` | Senior Dashboard Trends 1 |
| `33-311-trends-state-2.png` | `33:311` | Senior Dashboard Trends 2 |
| `33-423-trends-state-3.png` | `33:423` | Senior Dashboard Trends 3 |
| `33-590-heatmap.png` | `33:590` | Heatmap |
| `48-335-heatmap-day-detail-1.png` | `48:335` | Heatmap — Individual Day 1 |
| `48-465-heatmap-day-detail-2.png` | `48:465` | Heatmap — Individual Day 2 |
| `33-706-insights.png` | `33:706` | Insights |

### Question-builder wizard (off-canvas placeholders)

| Filename | Node ID | Figma layer name |
|---|---|---|
| `64-289-wizard-step1-question.png` | `64:289` | Build a question |
| `64-290-wizard-step2-emoji.png` | `64:290` | describe emoji |
| `64-291-wizard-step3-response-type.png` | `64:291` | response type |
| `64-292-wizard-step4-threshold.png` | `64:292` | threshold |
| `64-293-wizard-step5-done.png` | `64:293` | question done |

## After the PNGs land

Tell Claude "the Figma exports are ready" (or list which filenames are in this folder). Claude will then:

1. Inspect each PNG, fill in the visually-confirmed details in `design-inventory.md` (colors, spacing, button placement, icon glyphs, copy strings — everything currently marked `(unverified)` or `TBD`).
2. Reconcile the open questions at the bottom of the inventory (e.g. duplicate login screen, binary question type, pain-point grid count, icon-token map).
3. Start scaffolding the 23 routes as Expo Router files, one per screen, wired to the Supabase seed data.

## Notes

- This folder is **not gitignored** — exports will be committed. PNGs are ~200–800 KB each, so 23 frames ≈ 5–15 MB total. Fine for a private repo.
- If a frame needs to be re-exported later, just overwrite the file with the same name.
- The Figma file URL: <https://www.figma.com/design/Iq3sfl74xGIGo6aQR6bqMr/>.
