import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@seraya/shared";
import { Icon } from "./Icon";

type Props = {
  title: string;
  showBack?: boolean;
  trailingIcon?: string;
  onTrailingPress?: () => void;
  onBackPress?: () => void;
};

export function ScreenHeader({
  title,
  showBack = true,
  trailingIcon,
  onTrailingPress,
  onBackPress,
}: Props) {
  const router = useRouter();
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {showBack ? (
          <Pressable
            onPress={() => {
              if (onBackPress) onBackPress();
              else if (router.canGoBack()) router.back();
            }}
            hitSlop={12}
          >
            <Icon name="lucide:ChevronLeft" size={28} color={colors.textPrimary} />
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.side, styles.sideRight]}>
        {trailingIcon ? (
          <Pressable onPress={onTrailingPress} hitSlop={12}>
            <Icon name={trailingIcon} size={26} color={colors.textPrimary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  side: {
    width: 36,
    alignItems: "flex-start",
  },
  sideRight: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: typography.h1.size,
    fontWeight: typography.h1.weight,
    letterSpacing: typography.h1.letterSpacing,
    color: colors.textPrimary,
  },
});
