import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.root}>
      <Text style={styles.brand}>SERAYA</Text>
      <Text style={styles.tagline}>Tall as wisdom. Rooted in care.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFBF2",
  },
  brand: {
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 4,
    color: "#3B2A1E",
  },
  tagline: {
    marginTop: 12,
    fontSize: 16,
    color: "#7A6A5C",
    textAlign: "center",
  },
});
