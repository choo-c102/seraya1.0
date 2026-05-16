import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "@seraya/shared";

export type StatusPillTone =
  | "urgent"
  | "monitor"
  | "positive"
  | "active"
  | "inactive"
  | "info";

const TONE_MAP: Record<StatusPillTone, { bg: string; fg: string; label: string }> = {
  urgent: { bg: colors.pillUrgentBg, fg: colors.pillUrgentFg, label: "Urgent" },
  monitor: { bg: colors.pillMonitorBg, fg: colors.pillMonitorFg, label: "Monitor" },
  positive: { bg: colors.pillPositiveBg, fg: colors.pillPositiveFg, label: "Positive" },
  active: { bg: colors.pillActiveBg, fg: colors.pillActiveFg, label: "Active" },
  inactive: { bg: colors.pillInactiveBg, fg: colors.pillInactiveFg, label: "Inactive" },
  info: { bg: colors.pillInfoBg, fg: colors.pillInfoFg, label: "Info" },
};

type Props = {
  tone: StatusPillTone;
  label?: string;
};

export function StatusPill({ tone, label }: Props) {
  const cfg = TONE_MAP[tone];
  return (
    <View style={[styles.pill, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.label, { color: cfg.fg }]}>{label ?? cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: typography.pill.size,
    fontWeight: typography.pill.weight,
    letterSpacing: 0.3,
  },
});
