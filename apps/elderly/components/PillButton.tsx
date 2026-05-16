import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";

export type PillButtonTone = "light" | "dark" | "accent";

type Props = {
  label: string;
  onPress: () => void;
  tone?: PillButtonTone;
  disabled?: boolean;
};

export function PillButton({ label, onPress, tone = "light", disabled = false }: Props) {
  const bg =
    tone === "dark"
      ? colors.buttonDark
      : tone === "accent"
        ? colors.accent
        : colors.surface;
  const fg =
    tone === "dark" || tone === "accent" ? colors.textOnAccent : colors.textPrimary;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.pill,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        tone === "light" ? styles.lightBorder : null,
      ]}
    >
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    minWidth: 160,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.button,
  },
  lightBorder: {
    borderWidth: 1,
    borderColor: colors.textPrimary,
  },
  label: {
    fontSize: typography.body.size,
    fontWeight: typography.bodyBold.weight,
    letterSpacing: 1,
  },
});
