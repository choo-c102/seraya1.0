import Svg, { Path, Circle as SvgCircle } from "react-native-svg";
import { colors } from "@seraya/shared";

type Props = { size?: number };

export function BrandTreesMark({ size = 150 }: Props) {
  const stroke = colors.textPrimary;
  const w = size;
  const h = size * 0.8;
  return (
    <Svg width={w} height={h} viewBox="0 0 150 120">
      <Path
        d="M30 110 L30 60 C30 40 20 30 30 18 C40 30 50 40 30 60"
        stroke={stroke}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <SvgCircle cx={30} cy={30} r={14} stroke={stroke} strokeWidth={2} fill="none" />
      <Path
        d="M75 110 L75 70 C75 60 70 55 75 48 C80 55 80 60 75 70"
        stroke={stroke}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <SvgCircle cx={75} cy={55} r={10} stroke={stroke} strokeWidth={2} fill="none" />
      <Path
        d="M120 110 L120 60 C120 40 110 30 120 18 C130 30 140 40 120 60"
        stroke={stroke}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <SvgCircle cx={120} cy={30} r={14} stroke={stroke} strokeWidth={2} fill="none" />
      <Path d="M5 112 L145 112" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
