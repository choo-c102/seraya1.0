import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@seraya/shared";

export type TopTab = "trends" | "heatmap" | "insights";

const LABELS: Record<TopTab, string> = {
  trends: "Trends",
  heatmap: "Heatmap",
  insights: "Insights",
};

const ORDER: TopTab[] = ["trends", "heatmap", "insights"];

type Props = {
  active: TopTab;
  onChange: (tab: TopTab) => void;
};

export function TopTabBar({ active, onChange }: Props) {
  return (
    <View style={styles.row}>
      {ORDER.map((t) => {
        const isActive = t === active;
        return (
          <Pressable key={t} onPress={() => onChange(t)} style={styles.tab}>
            <Text style={[styles.label, isActive && styles.labelActive]}>{LABELS[t]}</Text>
            <View style={[styles.underline, isActive && styles.underlineActive]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  label: {
    fontSize: typography.tab.size,
    fontWeight: typography.tab.weight,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.accent,
  },
  underline: {
    width: "60%",
    height: 2,
    marginTop: spacing.sm,
    backgroundColor: "transparent",
  },
  underlineActive: {
    backgroundColor: colors.accent,
  },
});
