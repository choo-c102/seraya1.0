import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "@seraya/shared";
import { Icon } from "./Icon";

type Props = {
  message: string;
  onPress?: () => void;
};

export function AlertBanner({ message, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.banner}>
      <Icon name="lucide:TriangleAlert" size={20} color={colors.alertIcon} />
      <Text style={styles.text} numberOfLines={2}>
        {message}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.alertBg,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
  },
  text: {
    flex: 1,
    fontSize: typography.caption.size,
    color: colors.alertText,
    fontWeight: "600",
  },
});
