import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle as SvgCircle, Ellipse, Path, Rect } from "react-native-svg";
import { colors, radii, spacing, typography } from "@seraya/shared";

const SVG_W = 200;
const SVG_H = 400;

// Front-view tap zones: { id, cx, cy, r }. Coordinates in the SVG viewbox.
type Zone = { id: string; cx: number; cy: number; label: string };

const FRONT_ZONES: Zone[] = [
  { id: "headache", cx: 100, cy: 38, label: "Headache" },
  { id: "shoulder", cx: 72, cy: 110, label: "Shoulder" },
  { id: "chest", cx: 100, cy: 145, label: "Chest" },
  { id: "elbow", cx: 56, cy: 175, label: "Elbow" },
  { id: "stomach", cx: 100, cy: 190, label: "Stomach" },
  { id: "wrist", cx: 42, cy: 220, label: "Wrist" },
  { id: "knee", cx: 82, cy: 285, label: "Knee" },
  { id: "ankle", cx: 80, cy: 360, label: "Ankle" },
];

const BACK_ZONES: Zone[] = [
  { id: "neck", cx: 100, cy: 78, label: "Neck" },
  { id: "upper_traps", cx: 100, cy: 115, label: "Upper traps" },
  { id: "lower_back", cx: 100, cy: 195, label: "Lower back" },
  { id: "tailbone", cx: 100, cy: 235, label: "Tailbone" },
];

type Props = {
  selected: string[];
  onToggle: (id: string) => void;
};

export function BodyPainMap({ selected, onToggle }: Props) {
  const [side, setSide] = useState<"front" | "back">("front");
  const zones = side === "front" ? FRONT_ZONES : BACK_ZONES;

  return (
    <View style={styles.root}>
      <View style={styles.toggleBar}>
        <Pressable
          onPress={() => setSide("front")}
          style={[styles.toggleBtn, side === "front" && styles.toggleBtnActive]}
        >
          <Text style={[styles.toggleLabel, side === "front" && styles.toggleLabelActive]}>
            Front
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSide("back")}
          style={[styles.toggleBtn, side === "back" && styles.toggleBtnActive]}
        >
          <Text style={[styles.toggleLabel, side === "back" && styles.toggleLabelActive]}>
            Back
          </Text>
        </Pressable>
      </View>

      <View style={styles.svgWrap}>
        <Svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
          {side === "front" ? <FrontSilhouette /> : <BackSilhouette />}
          {zones.map((zone) => {
            const isSelected = selected.includes(zone.id);
            if (!isSelected) return null;
            return (
              <SvgCircle
                key={zone.id}
                cx={zone.cx}
                cy={zone.cy}
                r={6}
                fill={colors.painDot}
              />
            );
          })}
        </Svg>
        {zones.map((zone) => {
          return (
            <Pressable
              key={zone.id}
              onPress={() => onToggle(zone.id)}
              style={[
                styles.tapZone,
                {
                  left: zone.cx - 18,
                  top: zone.cy - 18,
                },
              ]}
              accessibilityLabel={zone.label}
            />
          );
        })}
      </View>
    </View>
  );
}

function FrontSilhouette() {
  const stroke = colors.textPrimary;
  return (
    <>
      {/* head */}
      <SvgCircle cx={100} cy={40} r={26} stroke={stroke} strokeWidth={2} fill="none" />
      {/* neck */}
      <Path d="M92 64 L92 78 L108 78 L108 64" stroke={stroke} strokeWidth={2} fill="none" />
      {/* torso */}
      <Path
        d="M60 90 Q60 84 76 80 L124 80 Q140 84 140 90 L140 220 L60 220 Z"
        stroke={stroke}
        strokeWidth={2}
        fill="none"
      />
      {/* arms */}
      <Path d="M60 90 L36 220" stroke={stroke} strokeWidth={2} fill="none" />
      <Path d="M140 90 L164 220" stroke={stroke} strokeWidth={2} fill="none" />
      {/* hands */}
      <SvgCircle cx={36} cy={228} r={9} stroke={stroke} strokeWidth={2} fill="none" />
      <SvgCircle cx={164} cy={228} r={9} stroke={stroke} strokeWidth={2} fill="none" />
      {/* legs */}
      <Path d="M82 220 L82 360" stroke={stroke} strokeWidth={2} fill="none" />
      <Path d="M118 220 L118 360" stroke={stroke} strokeWidth={2} fill="none" />
      {/* feet */}
      <Ellipse cx={82} cy={372} rx={14} ry={8} stroke={stroke} strokeWidth={2} fill="none" />
      <Ellipse cx={118} cy={372} rx={14} ry={8} stroke={stroke} strokeWidth={2} fill="none" />
      {/* eyes — only front */}
      <SvgCircle cx={92} cy={38} r={2} fill={stroke} />
      <SvgCircle cx={108} cy={38} r={2} fill={stroke} />
    </>
  );
}

function BackSilhouette() {
  const stroke = colors.textPrimary;
  return (
    <>
      {/* head, no facial features for back view */}
      <SvgCircle cx={100} cy={40} r={26} stroke={stroke} strokeWidth={2} fill="none" />
      {/* neck */}
      <Path d="M92 64 L92 78 L108 78 L108 64" stroke={stroke} strokeWidth={2} fill="none" />
      {/* torso (slightly different — squared shoulders) */}
      <Path
        d="M58 90 L58 220 L142 220 L142 90 Q142 82 124 80 L76 80 Q58 82 58 90 Z"
        stroke={stroke}
        strokeWidth={2}
        fill="none"
      />
      {/* spine hint */}
      <Path d="M100 80 L100 220" stroke={stroke} strokeWidth={1} fill="none" strokeDasharray="4 4" />
      {/* arms */}
      <Path d="M58 90 L34 220" stroke={stroke} strokeWidth={2} fill="none" />
      <Path d="M142 90 L166 220" stroke={stroke} strokeWidth={2} fill="none" />
      <SvgCircle cx={34} cy={228} r={9} stroke={stroke} strokeWidth={2} fill="none" />
      <SvgCircle cx={166} cy={228} r={9} stroke={stroke} strokeWidth={2} fill="none" />
      {/* legs */}
      <Path d="M82 220 L82 360" stroke={stroke} strokeWidth={2} fill="none" />
      <Path d="M118 220 L118 360" stroke={stroke} strokeWidth={2} fill="none" />
      <Ellipse cx={82} cy={372} rx={14} ry={8} stroke={stroke} strokeWidth={2} fill="none" />
      <Ellipse cx={118} cy={372} rx={14} ry={8} stroke={stroke} strokeWidth={2} fill="none" />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  toggleBar: {
    flexDirection: "row",
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    padding: 4,
    marginBottom: spacing.lg,
  },
  toggleBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
  },
  toggleBtnActive: {
    backgroundColor: colors.accent,
  },
  toggleLabel: {
    fontSize: typography.body.size,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  toggleLabelActive: {
    color: colors.textOnAccent,
  },
  svgWrap: {
    width: SVG_W,
    height: SVG_H,
    position: "relative",
  },
  tapZone: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
