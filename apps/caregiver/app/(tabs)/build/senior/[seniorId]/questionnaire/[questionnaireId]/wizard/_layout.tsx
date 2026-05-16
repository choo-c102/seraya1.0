import { Stack } from "expo-router";
import { colors } from "@seraya/shared";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
