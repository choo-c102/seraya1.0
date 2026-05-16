import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "@seraya/shared";
import { AlertCard } from "../../../../components/AlertCard";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import { SeniorProfileSummary } from "../../../../components/SeniorProfileSummary";
import { TopTabBar } from "../../../../components/TopTabBar";
import { getSenior } from "../../../../lib/mock-data";

export default function InsightsScreen() {
  const params = useLocalSearchParams<{ seniorId: string }>();
  const router = useRouter();
  const senior = getSenior(params.seniorId ?? "");

  if (!senior) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.fallback}>Senior not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack onBackPress={() => router.replace("/dashboard")} />
      <SeniorProfileSummary senior={senior} />
      <TopTabBar
        active="insights"
        onChange={(t) => {
          if (t === "trends") router.replace(`/dashboard/${senior.id}/trends`);
          if (t === "heatmap") router.replace(`/dashboard/${senior.id}/heatmap`);
        }}
      />
      <ScrollView contentContainerStyle={styles.body}>
        {senior.alerts.map((a) => (
          <AlertCard key={a.type} senior={senior} alert={a} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    paddingBottom: spacing.xxl,
  },
  fallback: {
    textAlign: "center",
    marginTop: 100,
    color: colors.textSecondary,
  },
});
