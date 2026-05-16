import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";
import { BrandTreesMark } from "../components/BrandTreesMark";
import { Icon } from "../components/Icon";

export default function LoginScreen() {
  const router = useRouter();
  const notImplemented = () => Alert.alert("Not implemented", "Coming soon");
  const goToDashboard = () => router.push("/dashboard");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topRow}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Icon name="lucide:ChevronLeft" size={28} color={colors.textPrimary} />
        </Pressable>
      </View>
      <View style={styles.brandBlock}>
        <BrandTreesMark size={110} />
        <Text style={styles.wordmark}>SERAYA</Text>
        <Text style={styles.tagline}>Tall as wisdom. Rooted in care.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Value"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Value"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />
        <Pressable style={styles.signIn} onPress={goToDashboard}>
          <Text style={styles.signInLabel}>Sign In</Text>
        </Pressable>
        <View style={styles.linksRow}>
          <Pressable onPress={notImplemented}>
            <Text style={styles.link}>Forgot password?</Text>
          </Pressable>
          <Pressable onPress={notImplemented}>
            <Text style={[styles.link, styles.linkBold]}>Have an invite? Register here.</Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={goToDashboard}>
        <Text style={styles.guest}>Log in as guest</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  topRow: {
    paddingVertical: spacing.sm,
  },
  brandBlock: {
    alignItems: "center",
    marginVertical: spacing.lg,
    gap: spacing.sm,
  },
  wordmark: {
    fontSize: typography.h1.size,
    fontWeight: typography.display.weight,
    letterSpacing: typography.display.letterSpacing,
    color: colors.textPrimary,
  },
  tagline: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    gap: spacing.sm,
    ...shadows.card,
  },
  label: {
    fontSize: typography.body.size,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body.size,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  signIn: {
    backgroundColor: colors.buttonDark,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  signInLabel: {
    color: colors.textOnDark,
    fontSize: typography.body.size,
    fontWeight: "700",
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
  },
  link: {
    fontSize: typography.caption.size,
    color: colors.textPrimary,
    textDecorationLine: "underline",
  },
  linkBold: {
    fontWeight: "700",
  },
  guest: {
    fontSize: typography.body.size,
    fontStyle: "italic",
    color: colors.textPrimary,
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: spacing.xl,
  },
});
