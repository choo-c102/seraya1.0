import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, typography } from "@seraya/shared";
import { AlertBanner } from "../../../../components/AlertBanner";
import { ConditionChipStrip } from "../../../../components/ConditionChipStrip";
import { DateRangePicker, type DateRange } from "../../../../components/DateRangePicker";
import { LatestCheckinSummary } from "../../../../components/LatestCheckinSummary";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import { SeniorProfileSummary } from "../../../../components/SeniorProfileSummary";
import { TopTabBar } from "../../../../components/TopTabBar";
import { TrendLineChart } from "../../../../components/TrendLineChart";
import { getLatestCheckin, getRecentScores, getSenior } from "../../../../lib/mock-data";

const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const RANGE_DAYS: Record<DateRange, number> = {
  "7D": 7,
  "30D": 30,
  "90D": 30, // mock data has 30 days max — cap
  "1Y": 30,
  Custom: 7,
};

export default function TrendsScreen() {
  const params = useLocalSearchParams<{ seniorId: string }>();
  const router = useRouter();
  const senior = getSenior(params.seniorId ?? "");

  const scaleQuestionIds = useMemo(() => {
    if (!senior) return [];
    return senior.questionnaire.questions.filter((qid) => qid !== "pain");
  }, [senior]);

  const [range, setRange] = useState<DateRange>("7D");
  const [selected, setSelected] = useState<string>(
    scaleQuestionIds[0] ?? senior?.questionnaire.questions[0] ?? "vision",
  );

  if (!senior) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.fallback}>Senior not found.</Text>
      </SafeAreaView>
    );
  }

  const latest = getLatestCheckin(senior);
  const days = RANGE_DAYS[range];
  const scoreSeries = getRecentScores(senior, selected, days);
  const xLabels =
    range === "7D"
      ? WEEKDAY_LABELS
      : scoreSeries.map((s) => s.date.slice(5));

  const primaryAlert = senior.alerts[0];

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="" showBack onBackPress={() => router.replace("/dashboard")} />
      <SeniorProfileSummary senior={senior} />
      {primaryAlert ? (
        <AlertBanner
          message={primaryAlert.message}
          onPress={() => router.push(`/dashboard/${senior.id}/insights`)}
        />
      ) : null}
      <TopTabBar
        active="trends"
        onChange={(t) => {
          if (t === "heatmap") router.replace(`/dashboard/${senior.id}/heatmap`);
          if (t === "insights") router.replace(`/dashboard/${senior.id}/insights`);
        }}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <LatestCheckinSummary questionIds={senior.questionnaire.questions} checkin={latest} />

        <Text style={styles.filterLabel}>Filter by:</Text>
        <View style={styles.section}>
          <DateRangePicker active={range} onChange={setRange} />
        </View>
        <ConditionChipStrip
          questionIds={scaleQuestionIds}
          active={selected}
          onChange={setSelected}
        />
        <View style={styles.chartWrap}>
          <TrendLineChart data={scoreSeries} weekdayLabels={xLabels} />
        </View>
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
    gap: spacing.md,
  },
  filterLabel: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
  chartWrap: {
    paddingHorizontal: spacing.lg,
  },
  fallback: {
    textAlign: "center",
    marginTop: 100,
    color: colors.textSecondary,
  },
});
