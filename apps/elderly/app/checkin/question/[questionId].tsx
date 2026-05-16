import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, conditionIcons, radii, spacing, typography } from "@seraya/shared";
import { BinaryChoice } from "../../../components/BinaryChoice";
import { BodyPainMap } from "../../../components/BodyPainMap";
import { EmojiScale } from "../../../components/EmojiScale";
import { Icon } from "../../../components/Icon";
import { defaultSenior, getQuestion, getQuestionnaireQuestions } from "../../../lib/mock-data";

export default function QuestionScreen() {
  const params = useLocalSearchParams<{ questionId: string }>();
  const router = useRouter();
  const questionId = params.questionId ?? "";
  const question = getQuestion(questionId);
  const allQuestions = getQuestionnaireQuestions(defaultSenior);
  const idx = allQuestions.findIndex((q) => q.id === questionId);

  const [pain, setPain] = useState<string[]>([]);

  const advance = () => {
    const next = allQuestions[idx + 1];
    if (next) {
      router.replace(`/checkin/question/${next.id}`);
    } else {
      router.replace("/checkin/complete");
    }
  };

  if (!question) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.fallback}>Question not found.</Text>
      </SafeAreaView>
    );
  }

  const iconKey = conditionIcons[question.id as keyof typeof conditionIcons];
  const iconName = iconKey ?? "lucide:Circle";

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.progress}>
        <Text style={styles.progressLabel}>
          {idx + 1} / {allQuestions.length}
        </Text>
      </View>

      <View style={styles.illustration}>
        <Icon name={iconName} size={140} color={colors.textPrimary} strokeWidth={1.5} />
        <Text style={styles.prompt}>{question.text}</Text>
      </View>

      <View style={styles.answer}>
        {question.type === "scale" ? (
          <EmojiScale onSelect={() => advance()} />
        ) : null}

        {question.type === "binary" ? (
          <BinaryChoice onSelect={() => advance()} />
        ) : null}

        {question.type === "multiselect" ? (
          <View style={styles.multi}>
            <BodyPainMap
              selected={pain}
              onToggle={(id) =>
                setPain((prev) =>
                  prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
                )
              }
            />
            <Text style={styles.count}>{pain.length} selected</Text>
            <Pressable style={styles.continue} onPress={advance}>
              <Text style={styles.continueLabel}>Continue</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  progress: {
    paddingVertical: spacing.sm,
    alignItems: "flex-end",
  },
  progressLabel: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
  illustration: {
    alignItems: "center",
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  prompt: {
    fontSize: typography.h2.size,
    fontWeight: typography.h2.weight,
    color: colors.textPrimary,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
  answer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: spacing.xxl,
  },
  multi: {
    alignItems: "center",
    gap: spacing.md,
  },
  count: {
    fontSize: typography.body.size,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  continue: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },
  continueLabel: {
    color: colors.textOnAccent,
    fontWeight: "700",
    fontSize: typography.body.size,
  },
  fallback: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    color: colors.textSecondary,
  },
});
