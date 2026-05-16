import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, spacing, typography } from "@seraya/shared";
import { ScreenHeader } from "../../../../../../../../components/ScreenHeader";
import { getDraft, updateDraft } from "../../../../../../../../lib/wizard-store";

const MIN = 1;
const MAX = 10;

export default function WizardStep4Threshold() {
  const params = useLocalSearchParams<{ seniorId: string; questionnaireId: string }>();
  const router = useRouter();
  const seniorId = params.seniorId ?? "";
  const questionnaireId = params.questionnaireId ?? "";
  const initial = getDraft(seniorId, questionnaireId).consecutiveDays ?? 3;
  const [days, setDays] = useState<number>(initial);

  const next = () => {
    updateDraft(seniorId, questionnaireId, { consecutiveDays: days });
    router.push(
      `/build/senior/${seniorId}/questionnaire/${questionnaireId}/wizard/step-5-done`,
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack />
      <View style={styles.heading}>
        <Text style={styles.title}>Alert Threshold</Text>
        <Text style={styles.sub}>Set when you want to be notified</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>For how many consecutive days?</Text>
        <View style={styles.sliderRow}>
          <View style={styles.slider}>
            {Array.from({ length: MAX - MIN + 1 }, (_, i) => i + MIN).map((n) => (
              <Pressable
                key={n}
                onPress={() => setDays(n)}
                style={[styles.stepDot, n <= days && styles.stepDotActive]}
              />
            ))}
          </View>
          <View style={styles.bubble}>
            <Text style={styles.bubbleLabel}>{days}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>
            You&apos;ll be alerted after {days} consecutive day{days === 1 ? "" : "s"} of concerning responses.
          </Text>
        </View>
      </View>
      <View style={styles.cta}>
        <Pressable style={styles.btn} onPress={next}>
          <Text style={styles.btnLabel}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.h2.size,
    fontWeight: typography.h2.weight,
    color: colors.textPrimary,
  },
  sub: {
    fontSize: typography.body.size,
    color: colors.textSecondary,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  label: {
    fontSize: typography.body.size,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  slider: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.border,
  },
  stepDotActive: {
    backgroundColor: colors.accent,
  },
  bubble: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.buttonBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleLabel: {
    color: colors.textOnAccent,
    fontWeight: "700",
    fontSize: typography.h3.size,
  },
  info: {
    backgroundColor: colors.accentSoft,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  infoText: {
    fontSize: typography.body.size,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  cta: {
    padding: spacing.lg,
  },
  btn: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    alignItems: "center",
  },
  btnLabel: {
    color: colors.textOnAccent,
    fontWeight: "700",
    fontSize: typography.body.size,
  },
});
