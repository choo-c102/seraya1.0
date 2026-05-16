import { StyleSheet, Text, View } from "react-native";
import { colors, conditionIcons, radii, shadows, spacing, typography } from "@seraya/shared";
import type { MockCheckin } from "../lib/mock-data";
import { Icon } from "./Icon";

type Props = {
  questionIds: string[];
  checkin: MockCheckin | undefined;
};

export function LatestCheckinSummary({ questionIds, checkin }: Props) {
  const dateLabel = checkin
    ? new Date(`${checkin.date}T${checkin.time ?? "08:00"}:00`).toLocaleDateString("en-SG", {
        month: "short",
        day: "numeric",
      })
    : "—";
  const timeLabel =
    checkin && checkin.time
      ? formatTime12h(checkin.time)
      : "—";

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Latest Check-in Summary</Text>
        <View>
          <Text style={styles.dateLabel}>{dateLabel}</Text>
          <Text style={styles.timeLabel}>{timeLabel}</Text>
        </View>
      </View>
      <View style={styles.iconRow}>
        {questionIds.map((id) => {
          const iconName = conditionIcons[id as keyof typeof conditionIcons] ?? "lucide:Circle";
          const dotTone = scoreToDot(id, checkin);
          return (
            <View key={id} style={styles.iconCell}>
              <Icon name={iconName} size={22} color={colors.textPrimary} strokeWidth={1.6} />
              <View style={[styles.dot, { backgroundColor: dotTone }]} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

function scoreToDot(questionId: string, checkin: MockCheckin | undefined): string {
  if (!checkin || !checkin.completed || checkin.scores === null) return colors.textMuted;
  const scores = checkin.scores as Record<string, number | string[] | undefined>;
  const v = scores[questionId];
  if (typeof v === "number") {
    return v >= 4 ? colors.statusGood : v >= 3 ? colors.statusNeutral : colors.statusWarning;
  }
  if (Array.isArray(v)) {
    return v.length === 0 ? colors.statusGood : colors.statusWarning;
  }
  return colors.textMuted;
}

function formatTime12h(hhmm: string): string {
  const parts = hhmm.split(":");
  const hStr = parts[0] ?? "0";
  const mStr = parts[1] ?? "0";
  const h = Number(hStr);
  const m = Number(mStr);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  dateLabel: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    textAlign: "right",
  },
  timeLabel: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    textAlign: "right",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
  },
  iconCell: {
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
