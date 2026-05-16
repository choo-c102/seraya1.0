import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, spacing, typography } from "@seraya/shared";
import { Icon } from "./Icon";

type NotifType = "alert" | "checkin";

type Notification = {
  id: string;
  type: NotifType;
  seniorName: string;
  message: string;
  time: string;
  read: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "alert",
    seniorName: "Liew Ah Kow",
    message: "Sleep quality rated ≤2 for 4 consecutive days",
    time: "3 days ago",
    read: false,
  },
  {
    id: "n2",
    type: "checkin",
    seniorName: "Siti Aminah",
    message: "Completed today's check-in",
    time: "Today, 8:30 AM",
    read: false,
  },
  {
    id: "n3",
    type: "alert",
    seniorName: "Siti Aminah",
    message: "Appetite decline — 3 consecutive days below threshold",
    time: "5 days ago",
    read: false,
  },
  {
    id: "n4",
    type: "checkin",
    seniorName: "Sivakumar Rajan",
    message: "Completed today's check-in",
    time: "Today, 7:45 AM",
    read: true,
  },
  {
    id: "n5",
    type: "checkin",
    seniorName: "Liew Ah Kow",
    message: "Completed yesterday's check-in",
    time: "Yesterday, 9:14 AM",
    read: true,
  },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function NotificationPanel({ visible, onClose }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <SafeAreaView style={styles.sheet} edges={["bottom"]}>
        {/* Handle bar */}
        <View style={styles.handleWrap}>
          <View style={styles.handle} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeLabel}>{unreadCount}</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.headerRight}>
            {unreadCount > 0 ? (
              <Pressable onPress={markAllRead} hitSlop={8}>
                <Text style={styles.markAllLabel}>Mark all read</Text>
              </Pressable>
            ) : null}
            <Pressable onPress={onClose} hitSlop={12}>
              <Icon name="lucide:X" size={22} color={colors.textPrimary} />
            </Pressable>
          </View>
        </View>

        {/* List */}
        <ScrollView contentContainerStyle={styles.list}>
          {notifications.length === 0 ? (
            <Text style={styles.emptyText}>No notifications</Text>
          ) : (
            notifications.map((n) => (
              <Pressable
                key={n.id}
                style={[styles.item, n.read && styles.itemRead]}
                onPress={() => markRead(n.id)}
              >
                {/* icon disc */}
                <View
                  style={[
                    styles.disc,
                    n.type === "alert" ? styles.discAlert : styles.discCheckin,
                  ]}
                >
                  <Icon
                    name={n.type === "alert" ? "lucide:TriangleAlert" : "lucide:CircleCheck"}
                    size={16}
                    color={colors.textOnAccent}
                    strokeWidth={2}
                  />
                </View>

                {/* text */}
                <View style={styles.itemText}>
                  <Text style={styles.itemName}>{n.seniorName}</Text>
                  <Text style={styles.itemMessage}>{n.message}</Text>
                  <Text style={styles.itemTime}>{n.time}</Text>
                </View>

                {/* unread dot */}
                {!n.read ? <View style={styles.unreadDot} /> : null}
              </Pressable>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "75%",
    paddingBottom: spacing.xxl,
  },
  handleWrap: {
    alignItems: "center",
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.h3.size,
    fontWeight: typography.h3.weight,
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.statusUrgent,
    borderRadius: radii.pill,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  badgeLabel: {
    fontSize: typography.pill.size,
    fontWeight: typography.pill.weight,
    color: colors.textOnAccent,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  markAllLabel: {
    fontSize: typography.caption.size,
    fontWeight: "600",
    color: colors.accent,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  itemRead: {
    opacity: 0.55,
  },
  disc: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  discAlert: {
    backgroundColor: colors.statusUrgent,
  },
  discCheckin: {
    backgroundColor: colors.statusGood,
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  itemMessage: {
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  itemTime: {
    fontSize: typography.caption.size,
    color: colors.textMuted,
    marginTop: 2,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 6,
    flexShrink: 0,
  },
  emptyText: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: typography.body.size,
    paddingVertical: spacing.xxl,
  },
});
