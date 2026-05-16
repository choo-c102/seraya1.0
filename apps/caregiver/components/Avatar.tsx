import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "@seraya/shared";
import { avatarHex } from "../lib/mock-data";

type Props = {
  color: string;
  initials: string;
  size?: number;
};

export function Avatar({ color, initials, size = 56 }: Props) {
  return (
    <View
      style={[
        styles.disc,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: avatarHex(color),
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  disc: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: colors.textOnAccent,
    fontWeight: typography.bodyBold.weight,
    letterSpacing: 1,
  },
});
