import { Stack } from "expo-router";
import { colors } from "@seraya/shared";

export default function CheckinLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
