import { Stack } from "expo-router";
import { colors } from "@seraya/shared";

export default function SeniorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
