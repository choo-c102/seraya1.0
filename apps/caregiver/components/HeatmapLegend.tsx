import { StyleSheet, Text, View } from "react-native";
import { colors, heatmapTones, radii, spacing, typography } from "@seraya/shared";

const ENTRIES: { tone: keyof typeof heatmapTones; label: string }[] = [
  { tone: "noData", label: "No data" },
  { tone: "low", label: "Low" },
  { tone: "mid", label: "Mid" },
  { tone: "high", label: "High" },
];

export function HeatmapLegend() {
  return (
    <View style={styles.row}>
      {ENTRIES.map((e) => (
        <View key={e.tone} style={styles.chip}>
          <View style={[styles.swatch, { backgroundColor: heatmapTones[e.tone] }]} />
          <Text style={styles.label}>{e.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  swatch: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },
  label: {
    fontSize: typography.pill.size,
    color: colors.textPrimary,
    fontWeight: "600",
  },
});
