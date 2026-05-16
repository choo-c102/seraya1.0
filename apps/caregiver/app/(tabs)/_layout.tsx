import { Tabs } from "expo-router";
import { colors } from "@seraya/shared";
import { Icon } from "../../components/Icon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
        },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Icon name="lucide:LayoutGrid" color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="build"
        options={{
          title: "Build",
          tabBarIcon: ({ color }) => <Icon name="lucide:Wrench" color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
