import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, typography } from "@seraya/shared";
import { AlertBanner } from "../../../../../components/AlertBanner";
import { DayDetailCard } from "../../../../../components/DayDetailCard";
import { HeatmapGrid } from "../../../../../components/HeatmapGrid";
import { HeatmapLegend } from "../../../../../components/HeatmapLegend";
import { ScreenHeader } from "../../../../../components/ScreenHeader";
import { SeniorProfileSummary } from "../../../../../components/SeniorProfileSummary";
import { TopTabBar } from "../../../../../components/TopTabBar";
import { getSenior, type MockCheckin } from "../../../../../lib/mock-data";

export default function HeatmapDayScreen() {
  const params = useLocalSearchParams<{ seniorId: string; date: string }>();
  const router = useRouter();
  const senior = getSenior(params.seniorId ?? "");
  const selectedDate = params.date ?? "";

  if (!senior) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.fallback}>Senior not found.</Text>
      </SafeAreaView>
    );
  }

  const checkinsByDate: Record<string, MockCheckin> = {};
  for (const c of senior.checkins) {
    checkinsByDate[c.date] = c;
  }
  const monthStart = new Date(2026, 3, 1);
  const monthLabel = monthStart.toLocaleDateString("en-SG", { month: "long", year: "numeric" });
  const dateLabel = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-SG", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const primaryAlert = senior.alerts[0];
  const checkin = checkinsByDate[selectedDate];

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack onBackPress={() => router.back()} />
      <SeniorProfileSummary senior={senior} />
      {primaryAlert ? (
        <AlertBanner
          message={primaryAlert.message}
          onPress={() => router.push(`/dashboard/${senior.id}/insights`)}
        />
      ) : null}
      <TopTabBar
        active="heatmap"
        onChange={(t) => {
          if (t === "trends") router.replace(`/dashboard/${senior.id}/trends`);
          if (t === "insights") router.replace(`/dashboard/${senior.id}/insights`);
        }}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.spacer} />
        <HeatmapGrid
          monthLabel={monthLabel}
          startDate={monthStart}
          checkinsByDate={checkinsByDate}
          selectedDate={selectedDate}
          onSelectDate={(d) =>
            router.replace(`/dashboard/${senior.id}/heatmap-day/${d}`)
          }
        />
        <HeatmapLegend />
        <Text style={styles.subHeader}>Showing {dateLabel}</Text>
        <DayDetailCard
          dateLabel={dateLabel}
          questionIds={senior.questionnaire.questions}
          checkin={checkin}
        />
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
  spacer: {
    height: spacing.md,
  },
  subHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    fontSize: typography.caption.size,
    color: colors.textSecondary,
  },
  fallback: {
    textAlign: "center",
    marginTop: 100,
    color: colors.textSecondary,
  },
});
