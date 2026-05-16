// Icon helper — accepts string keys like "lucide:Eye" or "phosphor:Tooth"
// and maps them to lucide-react-native icons. For phosphor:* keys we
// substitute the closest lucide equivalent.
//
// phosphor:Tooth → no lucide tooth — using `Bone` as the closest legible
// substitute. (Note: Bone is not a perfect match — flagged for follow-up.)
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

// phosphor:* → closest lucide
const PHOSPHOR_TO_LUCIDE: Record<string, string> = {
  Tooth: "Bone", // weak substitute — no lucide tooth icon
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
  let key = raw ?? family;
  if (family === "phosphor") {
    key = PHOSPHOR_TO_LUCIDE[key] ?? "Circle";
  }
  const Component = REGISTRY[key] ?? Circle;
  return <Component size={size} color={color} strokeWidth={strokeWidth} />;
}
