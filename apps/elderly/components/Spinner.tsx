import { useEffect } from "react";
import { Platform, View, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "./Icon";

/**
 * Platform-split spinner.
 *
 * Native: react-native-reanimated worklet driven by `withRepeat`.
 * Web:    CSS `@keyframes` animation so we don't keep `requestAnimationFrame`
 *         busy forever (which blocks Claude Preview's screenshot tool and is
 *         wasteful in general).
 */

type Props = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  durationMs?: number;
};

const KEYFRAMES_ID = "seraya-spin-keyframes";

function ensureWebKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const el = document.createElement("style");
  el.id = KEYFRAMES_ID;
  el.textContent =
    "@keyframes seraya-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}";
  document.head.appendChild(el);
}

export function Spinner(props: Props) {
  const size = props.size ?? 36;
  const color = props.color ?? "#1A1A1A";
  const strokeWidth = props.strokeWidth ?? 2.5;
  const durationMs = props.durationMs ?? 1400;

  if (Platform.OS === "web") {
    return (
      <WebSpinner
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        durationMs={durationMs}
      />
    );
  }
  return (
    <NativeSpinner
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      durationMs={durationMs}
    />
  );
}

function WebSpinner({
  size,
  color,
  strokeWidth,
  durationMs,
}: Required<Props>) {
  useEffect(() => {
    ensureWebKeyframes();
  }, []);
  // RN-Web accepts CSS animation strings but the React Native type for
  // ViewStyle doesn't list `animation`, hence the structural cast.
  const webStyle = {
    width: size,
    height: size,
    animation: `seraya-spin ${durationMs}ms linear infinite`,
  } as unknown as ViewStyle;
  return (
    <View style={webStyle}>
      <Icon
        name="lucide:LoaderCircle"
        size={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </View>
  );
}

function NativeSpinner({
  size,
  color,
  strokeWidth,
  durationMs,
}: Required<Props>) {
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: durationMs, easing: Easing.linear }),
      -1,
    );
  }, [rotation, durationMs]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  return (
    <Animated.View style={animatedStyle}>
      <Icon
        name="lucide:LoaderCircle"
        size={size}
        color={color}
        strokeWidth={strokeWidth}
      />
    </Animated.View>
  );
}
