import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";
import type { MockAlert, MockSenior } from "../lib/mock-data";
import { daysSince } from "../lib/mock-data";
import { Icon } from "./Icon";
import { StatusPill } from "./StatusPill";

type Props = {
  senior: MockSenior;
  alert: MockAlert;
};

const SUGGESTED_BY_TYPE: Record<string, string[]> = {
  sleep_decline: [
    "Encourage a consistent bedtime routine.",
    "Limit caffeine after 2pm and reduce evening screen time.",
    "Check the bedroom for noise, light, or temperature issues.",
    "Note any new medications or pain that may be affecting sleep.",
    "Schedule a check-in with the primary care doctor if it persists.",
  ],
  appetite_decline: [
    "Offer small, frequent meals throughout the day.",
    "Try favourite foods or texture-modified options.",
    "Ensure adequate hydration between meals.",
    "Track weight weekly and note significant changes.",
    "Consult a dietitian or doctor if intake remains low for 5+ days.",
  ],
  toothache_persistent: [
    "Inspect mouth gently for visible swelling, decay, or ulcers.",
    "Offer warm salt-water rinses to relieve discomfort.",
    "Switch to softer foods until the pain resolves.",
    "Book a dental appointment within the week.",
  ],
  post_chemo_appetite: [
    "Coordinate with the oncology team about anti-nausea meds.",
    "Offer cold, bland foods (toast, crackers, yogurt).",
    "Encourage small sips of nutrition shakes through the day.",
    "Monitor for weight loss > 2kg in 7 days — escalate if seen.",
  ],
  fatigue_severe: [
    "Prioritise rest and avoid scheduling non-essential activities.",
    "Track energy patterns to identify peak hours.",
    "Ensure adequate hydration and protein at each meal.",
    "Discuss with the oncology team — may need cycle delay.",
  ],
  pain_persistent: [
    "Apply warm or cool packs to affected areas as preferred.",
    "Maintain gentle, regular movement to prevent stiffness.",
    "Consider topical pain relief (capsaicin / lidocaine cream).",
    "Track which sites flare and report to the care team.",
  ],
  vision_blur: [
    "Check blood glucose levels at the time symptoms appear.",
    "Avoid driving until vision stabilises.",
    "Book an eye exam within two weeks.",
    "Note any headaches or dizziness alongside the blur.",
  ],
  neuropathy_pain: [
    "Inspect feet daily for cuts, blisters, or numb spots.",
    "Wear cushioned, well-fitting shoes — avoid walking barefoot.",
    "Review medication for neuropathy management.",
    "Refer to a podiatrist for foot-care guidance.",
  ],
};

const RESOURCES: { name: string; phone: string }[] = [
  { name: "Senior Health Service - General Care", phone: "+65 6321 4567" },
  { name: "NUH Telemedicine 24/7 Hotline", phone: "+65 6678 0000" },
  { name: "Tan Tock Seng Hospital - Geriatric Clinic", phone: "+65 6256 6011" },
];

export function AlertCard({ senior, alert }: Props) {
  const [expanded, setExpanded] = useState(true);
  const actions = SUGGESTED_BY_TYPE[alert.type] ?? [
    "Review with the primary caregiver.",
    "Contact the senior's GP within 48 hours.",
  ];
  const triggeredAgo = daysSince(alert.triggered_date);
  const title = formatTitle(alert);

  return (
    <View style={styles.card}>
      <Pressable onPress={() => setExpanded((e) => !e)} style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>Triggered {triggeredAgo} days ago</Text>
        </View>
        <View style={styles.headerRight}>
          <StatusPill tone="active" />
          <Icon
            name="lucide:ChevronDown"
            size={20}
            color={colors.textPrimary}
            strokeWidth={2}
          />
        </View>
      </Pressable>
      {expanded ? (
        <View style={styles.body}>
          <Text style={styles.narrative}>
            {senior.name} has shown {alert.message.toLowerCase()}. Patterns suggest a sustained
            change worth investigating with the care team. Use the suggested actions below to
            establish next steps and the resources to escalate if symptoms persist.
          </Text>
          <Text style={styles.overline}>SUGGESTED ACTIONS</Text>
          <View style={styles.list}>
            {actions.map((a, i) => (
              <Text key={i} style={styles.listItem}>
                {i + 1}. {a}
              </Text>
            ))}
          </View>
          <Text style={styles.overline}>RESOURCES</Text>
          <View style={styles.resources}>
            {RESOURCES.map((r) => (
              <View key={r.name} style={styles.resourceRow}>
                <View style={styles.resourceText}>
                  <Text style={styles.resourceName}>{r.name}</Text>
                  <Text style={styles.resourcePhone}>{r.phone}</Text>
                </View>
                <StatusPill tone="info" label="Call" />
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}

function formatTitle(alert: MockAlert): string {
  const metric = alert.threshold.metric;
  const days = alert.threshold.consecutive_days;
  switch (alert.type) {
    case "sleep_decline":
      return `Sleep quality decline - ${days} consecutive days`;
    case "appetite_decline":
      return `Appetite decline - ${days} consecutive days`;
    case "toothache_persistent":
      return `Persistent tooth pain - ${days}+ days`;
    case "post_chemo_appetite":
      return `Severe appetite loss post-chemo - ${days} days`;
    case "fatigue_severe":
      return `Severe fatigue - ${days} consecutive days`;
    case "pain_persistent":
      return `Multiple pain sites - ${days}+ days`;
    case "vision_blur":
      return `Vision blur (glucose-related) - ${days} days`;
    case "neuropathy_pain":
      return `Neuropathy monitoring - ${days}+ days`;
    default:
      return `${metric} threshold alert`;
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    ...shadows.card,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
  },
  headerText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  sub: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    marginTop: 2,
  },
  body: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  narrative: {
    fontSize: typography.caption.size,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  overline: {
    fontSize: typography.overline.size,
    fontWeight: typography.overline.weight,
    letterSpacing: typography.overline.letterSpacing,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  list: {
    gap: spacing.xs,
  },
  listItem: {
    fontSize: typography.caption.size,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  resources: {
    gap: spacing.sm,
  },
  resourceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: spacing.sm,
  },
  resourceText: {
    flex: 1,
  },
  resourceName: {
    fontSize: typography.caption.size,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  resourcePhone: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
});
