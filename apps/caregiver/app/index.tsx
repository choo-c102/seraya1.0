import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Seraya Caregiver</Text>
      <Text style={styles.subtitle}>Select a senior to begin.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F4F1EA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3B2A1E",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#7A6A5C",
  },
});
