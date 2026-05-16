import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@seraya/shared";
import type { MockSenior } from "../lib/mock-data";
import { Avatar } from "./Avatar";

type Props = {
  senior: MockSenior;
};

export function SeniorProfileSummary({ senior }: Props) {
  const questionCount = senior.questionnaire.questions.length;
  return (
    <View style={styles.row}>
      <Avatar color={senior.avatar_color} initials={senior.initials} size={56} />
      <View style={styles.text}>
        <Text style={styles.name}>{senior.name}</Text>
        <Text style={styles.meta}>
          Age {senior.age} · {senior.questionnaire.name} · {questionCount} questions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  text: {
    flex: 1,
  },
  name: {
    fontSize: typography.h2.size,
    fontWeight: typography.h2.weight,
    color: colors.textPrimary,
  },
  meta: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
