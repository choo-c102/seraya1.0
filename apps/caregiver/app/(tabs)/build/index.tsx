import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";
import { Avatar } from "../../../components/Avatar";
import { Icon } from "../../../components/Icon";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { StatusPill } from "../../../components/StatusPill";
import { seniors } from "../../../lib/mock-data";

export default function BuildListScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="BUILD" showBack={false} />
      <ScrollView contentContainerStyle={styles.list}>
        {seniors.map((senior) => {
          const q = senior.questionnaire;
          return (
            <Pressable
              key={senior.id}
              style={styles.row}
              onPress={() =>
                router.push(`/build/senior/${senior.id}/questionnaire/${q.id}`)
              }
            >
              <Avatar color={senior.avatar_color} initials={senior.initials} size={48} />
              <View style={styles.text}>
                <Text style={styles.name}>{q.name}</Text>
                <View style={styles.subRow}>
                  <Text style={styles.meta}>{senior.name}</Text>
                  <StatusPill tone="active" />
                </View>
              </View>
              <Icon name="lucide:SquarePen" size={20} color={colors.textPrimary} />
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.cta}>
        <Pressable
          style={styles.createBtn}
          onPress={() => router.push("/build/new-senior")}
        >
          <Text style={styles.createLabel}>Create New</Text>
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
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  text: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  meta: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
  cta: {
    padding: spacing.lg,
  },
  createBtn: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    alignItems: "center",
  },
  createLabel: {
    color: colors.textOnAccent,
    fontWeight: "700",
    fontSize: typography.body.size,
  },
});
