import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, conditionIcons, radii, shadows, spacing, typography } from "@seraya/shared";
import { Icon } from "../../../../../../components/Icon";
import { ScreenHeader } from "../../../../../../components/ScreenHeader";
import { SeniorProfileSummary } from "../../../../../../components/SeniorProfileSummary";
import { getQuestion, getSenior } from "../../../../../../lib/mock-data";

export default function QuestionBuilderScreen() {
  const params = useLocalSearchParams<{ seniorId: string; questionnaireId: string }>();
  const router = useRouter();
  const senior = getSenior(params.seniorId ?? "");

  if (!senior) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.fallback}>Senior not found.</Text>
      </SafeAreaView>
    );
  }
  const questionnaire = senior.questionnaire;
  const seniorId = senior.id;

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack onBackPress={() => router.replace("/build")} />
      <SeniorProfileSummary senior={senior} />
      <Text style={styles.title}>{questionnaire.name}</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {questionnaire.questions.map((qid) => {
          const q = getQuestion(qid);
          if (!q) return null;
          const iconName = conditionIcons[qid as keyof typeof conditionIcons] ?? "lucide:Circle";
          const subLabel = q.type === "scale" ? "Scale (1-5)" : q.type === "binary" ? "Yes / No" : "Multi-select";
          return (
            <View key={qid} style={styles.row}>
              <Icon name="lucide:GripVertical" size={20} color={colors.textMuted} />
              <Icon name={iconName} size={22} color={colors.textPrimary} strokeWidth={1.8} />
              <View style={styles.rowText}>
                <Text style={styles.rowName}>{capitalize(q.id)}</Text>
                <Text style={styles.rowSub}>{subLabel}</Text>
              </View>
              <Pressable
                hitSlop={8}
                onPress={() => Alert.alert("Delete", `Remove ${q.id}?`)}
              >
                <Icon name="lucide:Trash2" size={20} color={colors.trash} />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, styles.btnGhost]}
          onPress={() =>
            router.push(
              `/build/senior/${seniorId}/questionnaire/${questionnaire.id}/wizard/step-1-emoji`,
            )
          }
        >
          <Text style={[styles.btnLabel, styles.btnGhostLabel]}>Add Question</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnOutline]}
          onPress={() => Alert.alert("Preview", "Preview as senior — not implemented")}
        >
          <Text style={[styles.btnLabel, styles.btnOutlineLabel]}>Preview</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnSolid]}
          onPress={() => Alert.alert("Saved", "Questionnaire activated.")}
        >
          <Text style={[styles.btnLabel, styles.btnSolidLabel]}>Save & Activate</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.h3.size,
    fontWeight: typography.h3.weight,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    ...shadows.card,
  },
  rowText: {
    flex: 1,
  },
  rowName: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  rowSub: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
  actions: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  btn: {
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
    alignItems: "center",
  },
  btnLabel: {
    fontSize: typography.body.size,
    fontWeight: "700",
  },
  btnGhost: {
    backgroundColor: colors.surface,
  },
  btnGhostLabel: {
    color: colors.textPrimary,
  },
  btnOutline: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  btnOutlineLabel: {
    color: colors.accent,
  },
  btnSolid: {
    backgroundColor: colors.accent,
  },
  btnSolidLabel: {
    color: colors.textOnAccent,
  },
  fallback: {
    textAlign: "center",
    marginTop: 100,
    color: colors.textSecondary,
  },
});
