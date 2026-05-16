import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "@seraya/shared";

export type DateRange = "7D" | "30D" | "90D" | "1Y" | "Custom";

const ORDER: DateRange[] = ["7D", "30D", "90D", "1Y", "Custom"];

type Props = {
  active: DateRange;
  onChange: (range: DateRange) => void;
};

export function DateRangePicker({ active, onChange }: Props) {
  return (
    <View style={styles.row}>
      {ORDER.map((r) => {
        const isActive = r === active;
        return (
          <Pressable
            key={r}
            onPress={() => onChange(r)}
            style={[styles.pill, isActive ? styles.pillActive : styles.pillInactive]}
          >
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {r}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
  },
  pillActive: {
    backgroundColor: colors.accent,
  },
  pillInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: typography.pill.size,
    fontWeight: typography.pill.weight,
  },
  labelActive: {
    color: colors.textOnAccent,
  },
  labelInactive: {
    color: colors.textPrimary,
  },
});
