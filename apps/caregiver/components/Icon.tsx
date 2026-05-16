// Icon helper — accepts string keys like "lucide:Eye", "phosphor:Tooth",
// or "emoji:🦷" and maps them to the appropriate renderer.
import { Text } from "react-native";
import {
  Activity,
  AlertCircle,
  BatteryLow,
  Bell,
  Bone,
  Brain,
  BrainCircuit,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleCheck,
  Crosshair,
  Ear,
  Eye,
  Footprints,
  GripVertical,
  HeartHandshake,
  LayoutGrid,
  LoaderCircle,
  MoonStar,
  Pill,
  SquarePen,
  Sun,
  Trash2,
  TriangleAlert,
  Upload,
  UserRound,
  UtensilsCrossed,
  Wrench,
  X,
  Check,
  type LucideIcon,
} from "lucide-react-native";

const REGISTRY: Record<string, LucideIcon> = {
  Activity,
  AlertCircle,
  BatteryLow,
  Bell,
  Bone,
  Brain,
  BrainCircuit,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleCheck,
  Crosshair,
  Ear,
  Eye,
  Footprints,
  GripVertical,
  HeartHandshake,
  LayoutGrid,
  LoaderCircle,
  MoonStar,
  Pill,
  SquarePen,
  Sun,
  Trash2,
  TriangleAlert,
  Upload,
  UserRound,
  UtensilsCrossed,
  Wrench,
  X,
  Check,
};

const PHOSPHOR_TO_LUCIDE: Record<string, string> = {
  Eye: "Eye",
  Pill: "Pill",
  HandHeart: "HeartHandshake",
};

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function Icon({ name, size = 24, color = "#1A1A1A", strokeWidth = 2 }: IconProps) {
  const [family, raw] = name.split(":") as [string, string | undefined];
  const key = raw ?? family;

  if (family === "emoji") {
    return (
      <Text style={{ fontSize: size * 0.8, lineHeight: size, textAlign: "center" }}>
        {key}
      </Text>
    );
  }

  let lucideKey = key;
  if (family === "phosphor") {
    lucideKey = PHOSPHOR_TO_LUCIDE[key] ?? "Circle";
  }
  const Component = REGISTRY[lucideKey] ?? Circle;
  return <Component size={size} color={color} strokeWidth={strokeWidth} />;
}
