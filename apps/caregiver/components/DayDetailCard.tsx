import { StyleSheet, Text, View } from "react-native";
import { colors, conditionIcons, radii, shadows, spacing, typography } from "@seraya/shared";
import { getQuestion, type MockCheckin } from "../lib/mock-data";
import { Icon } from "./Icon";

type Props = {
  dateLabel: string;
  questionIds: string[];
  checkin: MockCheckin | undefined;
};

export function DayDetailCard({ dateLabel, questionIds, checkin }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{dateLabel}</Text>
      {checkin && checkin.completed && checkin.scores ? (
        questionIds.map((id) => {
          const q = getQuestion(id);
          if (!q) return null;
          const scores = checkin.scores as Record<string, number | string[] | undefined>;
          const value = scores[id];
          const iconName = conditionIcons[id as keyof typeof conditionIcons] ?? "lucide:Circle";
          return (
            <View key={id} style={styles.row}>
              <View style={styles.rowLeft}>
                <Icon name={iconName} size={20} color={colors.textPrimary} strokeWidth={1.8} />
                <Text style={styles.label}>{capitalize(q.id)}</Text>
              </View>
              <View style={styles.rowRight}>
                {q.type === "scale" && typeof value === "number" ? (
                  <DotScore score={value} />
                ) : null}
                {q.type === "multiselect" && Array.isArray(value) ? (
                  <View style={styles.pills}>
                    {value.length === 0 ? (
                      <Text style={styles.noPain}>None</Text>
                    ) : (
                      value.map((v) => (
                        <View key={v} style={styles.pill}>
                          <Text style={styles.pillLabel}>{prettify(v)}</Text>
                        </View>
                      ))
                    )}
                  </View>
                ) : null}
              </View>
            </View>
          );
        })
      ) : (
        <Text style={styles.empty}>No data for this day.</Text>
      )}
    </View>
  );
}

function DotScore({ score }: { score: number }) {
  return (
    <View style={styles.dots}>
      {[1, 2, 3, 4, 5].map((i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i === score ? colors.statusGood : colors.border },
          ]}
        />
      ))}
    </View>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function prettify(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    ...shadows.card,
  },
  title: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: typography.body.size,
    color: colors.textPrimary,
  },
  dots: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    maxWidth: 180,
    justifyContent: "flex-end",
  },
  pill: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  pillLabel: {
    fontSize: typography.pill.size,
    color: colors.textPrimary,
  },
  noPain: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  empty: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    textAlign: "center",
    paddingVertical: spacing.md,
  },
});
