import { StyleSheet, Text, View } from "react-native";
import Svg, { Line, Path, Text as SvgText } from "react-native-svg";
import { colors, spacing, typography } from "@seraya/shared";

const CHART_W = 320;
const CHART_H = 200;
const PADDING_LEFT = 28;
const PADDING_RIGHT = 8;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 32;

type Props = {
  data: { date: string; score: number | null }[];
  weekdayLabels: string[];
};

export function TrendLineChart({ data, weekdayLabels }: Props) {
  const innerW = CHART_W - PADDING_LEFT - PADDING_RIGHT;
  const innerH = CHART_H - PADDING_TOP - PADDING_BOTTOM;
  const yMin = 1;
  const yMax = 5;
  const xCount = Math.max(data.length - 1, 1);

  const valuePoints = data
    .map((d, i) => {
      if (d.score === null) return null;
      const x = PADDING_LEFT + (innerW * i) / xCount;
      const y = PADDING_TOP + innerH - ((d.score - yMin) / (yMax - yMin)) * innerH;
      return { x, y };
    })
    .filter((p): p is { x: number; y: number } => p !== null);

  let path = "";
  valuePoints.forEach((p, i) => {
    path += `${i === 0 ? "M" : "L"} ${p.x} ${p.y} `;
  });

  return (
    <View style={styles.card}>
      <Svg width={CHART_W} height={CHART_H}>
        {[1, 2, 3, 4, 5].map((v) => {
          const y = PADDING_TOP + innerH - ((v - yMin) / (yMax - yMin)) * innerH;
          return (
            <Line
              key={v}
              x1={PADDING_LEFT}
              x2={CHART_W - PADDING_RIGHT}
              y1={y}
              y2={y}
              stroke={colors.chartGrid}
              strokeWidth={1}
            />
          );
        })}
        {[1, 2, 3, 4, 5].map((v) => {
          const y = PADDING_TOP + innerH - ((v - yMin) / (yMax - yMin)) * innerH;
          return (
            <SvgText
              key={`l${v}`}
              x={PADDING_LEFT - 6}
              y={y + 4}
              fill={colors.chartAxisLabel}
              fontSize={10}
              textAnchor="end"
            >
              {String(v)}
            </SvgText>
          );
        })}
        {path ? (
          <Path d={path} stroke={colors.chartStroke} strokeWidth={2} fill="none" />
        ) : null}
        {weekdayLabels.map((lbl, i) => {
          const x = PADDING_LEFT + (innerW * i) / xCount;
          return (
            <SvgText
              key={lbl + i}
              x={x}
              y={CHART_H - 8}
              fill={colors.chartAxisLabel}
              fontSize={10}
              textAnchor="middle"
            >
              {lbl}
            </SvgText>
          );
        })}
      </Svg>
      {valuePoints.length === 0 ? <Text style={styles.empty}>No data</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: "center",
  },
  empty: {
    position: "absolute",
    top: "45%",
    color: colors.textMuted,
    fontSize: typography.caption.size,
  },
});
