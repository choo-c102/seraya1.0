import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@seraya/shared";

type Props = {
  onSelect: (score: number) => void;
};

const SMILEY_COLORS = [
  colors.smiley1,
  colors.smiley2,
  colors.smiley3,
  colors.smiley4,
  colors.smiley5,
];

const SMILEY_FACES = ["😢", "😟", "😐", "🙂", "😄"] as const;

export function EmojiScale({ onSelect }: Props) {
  return (
    <View style={styles.row}>
      {SMILEY_COLORS.map((color, idx) => {
        const face = SMILEY_FACES[idx];
        return (
          <Pressable
            key={idx}
            style={[styles.button, { borderColor: color }]}
            onPress={() => onSelect(idx + 1)}
          >
            <Text style={styles.face}>{face}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    width: "100%",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 999,
    borderWidth: 3,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  face: {
    fontSize: 28,
    lineHeight: typography.h1.lineHeight,
  },
});
