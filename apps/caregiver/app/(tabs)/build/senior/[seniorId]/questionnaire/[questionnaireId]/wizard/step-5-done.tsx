import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";
import { Icon } from "../../../../../../../../components/Icon";
import { ScreenHeader } from "../../../../../../../../components/ScreenHeader";
import { getDraft, resetDraft } from "../../../../../../../../lib/wizard-store";

const RESPONSE_LABEL: Record<string, string> = {
  scale: "1-5 Scale",
  binary: "Yes / No",
  multiselect: "Pain Location",
};

export default function WizardStep5Done() {
  const params = useLocalSearchParams<{ seniorId: string; questionnaireId: string }>();
  const router = useRouter();
  const seniorId = params.seniorId ?? "";
  const questionnaireId = params.questionnaireId ?? "";
  const draft = getDraft(seniorId, questionnaireId);

  const responseLabel = draft.responseType ? RESPONSE_LABEL[draft.responseType] ?? draft.responseType : "—";

  const createAnother = () => {
    resetDraft(seniorId, questionnaireId);
    router.replace(
      `/build/senior/${seniorId}/questionnaire/${questionnaireId}/wizard/step-1-emoji`,
    );
  };

  const viewAll = () => {
    resetDraft(seniorId, questionnaireId);
    router.replace(`/build/senior/${seniorId}/questionnaire/${questionnaireId}`);
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack={false} />
      <View style={styles.body}>
        <View style={styles.successDisc}>
          <Icon name="lucide:Check" size={42} color={colors.textOnAccent} strokeWidth={3} />
        </View>
        <Text style={styles.headline}>Question Saved!</Text>
        <Text style={styles.sub}>Your custom question has been created</Text>
        <View style={styles.preview}>
          <Text style={styles.previewEmoji}>{draft.emoji ?? "❓"}</Text>
          <Text style={styles.previewText}>{draft.description ?? "Untitled question"}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Response Type:</Text>
            <Text style={styles.metaValue}>{responseLabel}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Alert Threshold:</Text>
            <Text style={styles.metaValue}>{draft.consecutiveDays ?? "—"} days</Text>
          </View>
        </View>
      </View>
      <View style={styles.cta}>
        <Pressable style={[styles.btn, styles.btnSolid]} onPress={createAnother}>
          <Text style={[styles.btnLabel, styles.btnSolidLabel]}>Create Another Question</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnGhost]} onPress={viewAll}>
          <Text style={[styles.btnLabel, styles.btnGhostLabel]}>View All Questions</Text>
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
  body: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  successDisc: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.statusGood,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
  headline: {
    fontSize: typography.h1.size,
    fontWeight: typography.h1.weight,
    color: colors.textPrimary,
  },
  sub: {
    fontSize: typography.body.size,
    color: colors.textSecondary,
  },
  preview: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.card,
    marginTop: spacing.md,
  },
  previewEmoji: {
    fontSize: 36,
  },
  previewText: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
  metaValue: {
    fontSize: typography.caption.size,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  cta: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  btn: {
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    alignItems: "center",
  },
  btnLabel: {
    fontSize: typography.body.size,
    fontWeight: "700",
  },
  btnSolid: {
    backgroundColor: colors.accent,
  },
  btnSolidLabel: {
    color: colors.textOnAccent,
  },
  btnGhost: {
    backgroundColor: colors.surfaceMuted,
  },
  btnGhostLabel: {
    color: colors.textPrimary,
  },
});
