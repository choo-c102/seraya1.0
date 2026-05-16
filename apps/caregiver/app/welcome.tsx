import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, typography } from "@seraya/shared";
import { BrandTreesMark } from "../components/BrandTreesMark";
import { PillButton } from "../components/PillButton";
import { Spinner } from "../components/Spinner";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.spinnerWrap}>
        <Spinner size={36} color={colors.textPrimary} strokeWidth={2.5} />
      </View>
      <View style={styles.brand}>
        <BrandTreesMark size={160} />
        <Text style={styles.wordmark}>SERAYA</Text>
        <Text style={styles.tagline}>Tall as wisdom. Rooted in care.</Text>
      </View>
      <View style={styles.cta}>
        <PillButton label="ENTER" onPress={() => router.push("/login")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: spacing.xxxl,
  },
  spinnerWrap: {
    marginTop: spacing.xxxl,
  },
  brand: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  wordmark: {
    fontSize: typography.display.size,
    fontWeight: typography.display.weight,
    letterSpacing: typography.display.letterSpacing,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  tagline: {
    fontSize: typography.body.size,
    color: colors.textSecondary,
    textAlign: "center",
  },
  cta: {
    width: "100%",
    alignItems: "center",
  },
});
