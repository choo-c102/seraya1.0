import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";
import { Avatar } from "../../../components/Avatar";
import { NotificationPanel } from "../../../components/NotificationPanel";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { StatusPill } from "../../../components/StatusPill";
import { formatLastCheckin, getSeniorStatus, seniors } from "../../../lib/mock-data";

export default function DashboardListScreen() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader
        title="SELECT USER"
        showBack={false}
        trailingIcon="lucide:Bell"
        onTrailingPress={() => setShowNotifications(true)}
      />
      <NotificationPanel
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      <ScrollView contentContainerStyle={styles.list}>
        {seniors.map((senior) => {
          const tone = getSeniorStatus(senior);
          return (
            <Pressable
              key={senior.id}
              style={styles.row}
              onPress={() => router.push(`/dashboard/${senior.id}/trends`)}
            >
              <Avatar color={senior.avatar_color} initials={senior.initials} size={56} />
              <View style={styles.text}>
                <Text style={styles.name}>{senior.name}</Text>
                <Text style={styles.meta}>Last check-in: {formatLastCheckin(senior)}</Text>
              </View>
              <StatusPill tone={tone} />
            </Pressable>
          );
        })}
      </ScrollView>
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
  },
  name: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  meta: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
