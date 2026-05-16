import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { colors, conditionIcons, radii, spacing } from "@seraya/shared";
import { Icon } from "./Icon";

type Props = {
  questionIds: string[];
  active: string;
  onChange: (id: string) => void;
};

export function ConditionChipStrip({ questionIds, active, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {questionIds.map((id) => {
        const isActive = id === active;
        const iconName = conditionIcons[id as keyof typeof conditionIcons] ?? "lucide:Circle";
        return (
          <Pressable
            key={id}
            onPress={() => onChange(id)}
            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
          >
            <Icon
              name={iconName}
              size={22}
              color={isActive ? colors.textOnAccent : colors.textPrimary}
              strokeWidth={1.8}
            />
          </Pressable>
        );
      })}
      <View style={{ width: spacing.lg }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  chip: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: colors.accent,
  },
  chipInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
