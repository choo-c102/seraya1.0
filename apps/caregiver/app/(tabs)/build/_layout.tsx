import { Stack } from "expo-router";
import { colors } from "@seraya/shared";

export default function BuildStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
