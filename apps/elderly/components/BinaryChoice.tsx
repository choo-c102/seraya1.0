import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "@seraya/shared";
import { Icon } from "./Icon";

type Props = {
  onSelect: (value: boolean) => void;
};

export function BinaryChoice({ onSelect }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        style={[styles.disc, { backgroundColor: colors.binaryNo }]}
        onPress={() => onSelect(false)}
      >
        <Icon name="lucide:X" size={64} color={colors.textOnAccent} strokeWidth={3} />
      </Pressable>
      <Pressable
        style={[styles.disc, { backgroundColor: colors.binaryYes }]}
        onPress={() => onSelect(true)}
      >
        <Icon name="lucide:Check" size={64} color={colors.textOnAccent} strokeWidth={3} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 24,
  },
  disc: {
    width: 110,
    height: 110,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
