import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, heatmapTones, radii, spacing, typography } from "@seraya/shared";
import { dayHeatmapTone, type MockCheckin } from "../lib/mock-data";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type Props = {
  monthLabel: string;
  startDate: Date; // first day of month
  checkinsByDate: Record<string, MockCheckin>;
  selectedDate?: string;
  onSelectDate: (dateStr: string) => void;
};

export function HeatmapGrid({
  monthLabel,
  startDate,
  checkinsByDate,
  selectedDate,
  onSelectDate,
}: Props) {
  // Build a 5x7 grid (35 cells) starting Monday of first week of month
  const cells = buildCells(startDate);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
      </View>
      <View style={styles.weekRow}>
        {WEEKDAYS.map((d) => (
          <Text key={d} style={styles.weekday}>
            {d}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((cell, i) => {
          const checkin = cell ? checkinsByDate[cell.dateStr] : undefined;
          const tone = dayHeatmapTone(checkin);
          const color = heatmapTones[tone];
          const isSelected = cell?.dateStr === selectedDate;
          return (
            <Pressable
              key={i}
              onPress={() => cell && onSelectDate(cell.dateStr)}
              style={[
                styles.cell,
                {
                  backgroundColor: cell ? color : "transparent",
                  borderColor: isSelected ? colors.textPrimary : "transparent",
                  borderWidth: isSelected ? 2 : 0,
                },
              ]}
            >
              {cell ? <Text style={styles.cellLabel}>{cell.day}</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

type Cell = { dateStr: string; day: number } | null;

function buildCells(monthStart: Date): Cell[] {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstWeekday = (monthStart.getDay() + 6) % 7; // shift Sunday from 0 to 6, Monday from 1 to 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Cell[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ dateStr, day: d });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
  },
  header: {
    marginBottom: spacing.sm,
  },
  monthLabel: {
    fontSize: typography.bodyBold.size,
    fontWeight: typography.bodyBold.weight,
    color: colors.textPrimary,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  weekday: {
    width: 36,
    textAlign: "center",
    fontSize: typography.caption.size,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 4,
  },
  cell: {
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  cellLabel: {
    fontSize: 10,
    color: colors.textPrimary,
    fontWeight: "600",
  },
});
