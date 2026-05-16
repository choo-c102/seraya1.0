import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, typography } from "@seraya/shared";
import { Icon } from "../../components/Icon";
import { PillButton } from "../../components/PillButton";

export default function CheckinCompleteScreen() {
  const router = useRouter();
  const now = new Date();
  const dateLabel = now.toLocaleDateString("en-SG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeLabel = now.toLocaleTimeString("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.center}>
        <View style={styles.disc}>
          <Icon name="lucide:Check" size={56} color={colors.textOnAccent} strokeWidth={3} />
        </View>
        <Text style={styles.heading}>Check-in complete!</Text>
        <Text style={styles.meta}>
          {dateLabel} · {timeLabel}
        </Text>
      </View>
      <PillButton label="Done" tone="accent" onPress={() => router.replace("/")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  disc: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: colors.statusGood,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: typography.h1.size,
    fontWeight: typography.h1.weight,
    color: colors.textPrimary,
  },
  meta: {
    fontSize: typography.body.size,
    color: colors.textSecondary,
  },
});
