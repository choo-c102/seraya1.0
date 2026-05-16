import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";
import { ScreenHeader } from "../../../../../../../components/ScreenHeader";
import { updateDraft, type WizardResponseType } from "../../../../../../../lib/wizard-store";

const OPTIONS: { id: WizardResponseType; title: string; desc: string; preview: string }[] = [
  { id: "scale", title: "1-5 Scale", desc: "Rate from 1 to 5 using smiley faces", preview: "😢 😟 😐 🙂 😄" },
  { id: "binary", title: "Yes/No", desc: "Simple yes or no question", preview: "✅ / ❌" },
  { id: "multiselect", title: "Pain Location", desc: "Select body part affected", preview: "🧍" },
];

export default function WizardStep3Response() {
  const params = useLocalSearchParams<{ seniorId: string; questionnaireId: string }>();
  const router = useRouter();
  const seniorId = params.seniorId ?? "";
  const questionnaireId = params.questionnaireId ?? "";

  const pick = (id: WizardResponseType) => {
    updateDraft(seniorId, questionnaireId, { responseType: id });
    router.push(
      `/build/senior/${seniorId}/questionnaire/${questionnaireId}/wizard/step-4-threshold`,
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack />
      <View style={styles.heading}>
        <Text style={styles.title}>Response Type</Text>
        <Text style={styles.sub}>How should users answer this question?</Text>
      </View>
      <View style={styles.list}>
        {OPTIONS.map((o) => (
          <Pressable key={o.id} style={styles.card} onPress={() => pick(o.id)}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{o.title}</Text>
              <Text style={styles.cardDesc}>{o.desc}</Text>
            </View>
            <Text style={styles.preview}>{o.preview}</Text>
          </Pressable>
        ))}
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
  list: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardText: {
    gap: spacing.xs,
  },
  cardTitle: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  cardDesc: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
  preview: {
    fontSize: 22,
    marginTop: spacing.sm,
  },
});
