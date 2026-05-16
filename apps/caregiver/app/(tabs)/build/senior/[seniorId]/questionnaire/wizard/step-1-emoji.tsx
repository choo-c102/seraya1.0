import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, spacing, typography } from "@seraya/shared";
import { ScreenHeader } from "../../../../../../../components/ScreenHeader";
import { updateDraft } from "../../../../../../../lib/wizard-store";

const EMOJIS = [
  "😴",
  "🍽️",
  "👁️",
  "👂",
  "🧠",
  "🦷",
  "⚡",
  "🦶",
  "💊",
  "🚶",
  "💪",
  "🤒",
  "😷",
  "🤕",
  "😵",
  "🤧",
  "🥱",
  "😣",
  "😖",
  "🤢",
  "🩺",
  "🫁",
  "❤️",
  "🦵",
  "🤚",
  "👀",
  "👅",
  "🦴",
  "🪥",
  "💧",
];

export default function WizardStep1Emoji() {
  const params = useLocalSearchParams<{ seniorId: string; questionnaireId: string }>();
  const router = useRouter();
  const seniorId = params.seniorId ?? "";
  const questionnaireId = params.questionnaireId ?? "";

  const pick = (emoji: string) => {
    updateDraft(seniorId, questionnaireId, { emoji });
    router.push(
      `/build/senior/${seniorId}/questionnaire/${questionnaireId}/wizard/step-2-describe`,
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack />
      <View style={styles.heading}>
        <Text style={styles.title}>Build a Question</Text>
        <Text style={styles.subtext}>Select an emoji to represent your concern</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {EMOJIS.map((e) => (
          <Pressable key={e} style={styles.tile} onPress={() => pick(e)}>
            <Text style={styles.emoji}>{e}</Text>
          </Pressable>
        ))}
      </ScrollView>
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
  subtext: {
    fontSize: typography.body.size,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    justifyContent: "flex-start",
  },
  tile: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  emoji: {
    fontSize: 36,
  },
});
