import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, spacing, typography } from "@seraya/shared";
import { ScreenHeader } from "../../../../../../../components/ScreenHeader";
import { getDraft, updateDraft } from "../../../../../../../lib/wizard-store";

export default function WizardStep2Describe() {
  const params = useLocalSearchParams<{ seniorId: string; questionnaireId: string }>();
  const router = useRouter();
  const seniorId = params.seniorId ?? "";
  const questionnaireId = params.questionnaireId ?? "";
  const draft = getDraft(seniorId, questionnaireId);
  const [text, setText] = useState(draft.description ?? "");
  const canNext = text.trim().length > 0;

  const next = () => {
    updateDraft(seniorId, questionnaireId, { description: text.trim() });
    router.push(
      `/build/senior/${seniorId}/questionnaire/${questionnaireId}/wizard/step-3-response`,
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack />
      <View style={styles.body}>
        <Text style={styles.title}>Add Description</Text>
        <View style={styles.preview}>
          <Text style={styles.previewEmoji}>{draft.emoji ?? "❓"}</Text>
        </View>
        <Text style={styles.label}>What does this represent?</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline
          placeholder="e.g., Morning headache severity"
          placeholderTextColor={colors.textMuted}
        />
      </View>
      <View style={styles.cta}>
        <Pressable
          onPress={canNext ? next : undefined}
          style={[styles.btn, !canNext && styles.btnDisabled]}
        >
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
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.h2.size,
    fontWeight: typography.h2.weight,
    color: colors.textPrimary,
  },
  preview: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  previewEmoji: {
    fontSize: 64,
  },
  label: {
    fontSize: typography.body.size,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    fontSize: typography.body.size,
    minHeight: 120,
    textAlignVertical: "top",
    color: colors.textPrimary,
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
  btnDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  btnLabel: {
    color: colors.textOnAccent,
    fontWeight: "700",
    fontSize: typography.body.size,
  },
});
