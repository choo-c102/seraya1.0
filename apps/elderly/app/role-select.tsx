import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, shadows, spacing, typography } from "@seraya/shared";
import { Icon } from "../components/Icon";

export default function RoleSelectScreen() {
  const router = useRouter();

  const onSenior = () => router.push("/login");
  const onCaregiver = () => {
    Alert.alert(
      "Caregiver app",
      "This is the Senior app — open the Caregiver app to switch roles.",
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.heading}>WHO ARE YOU?</Text>
      <View style={styles.tiles}>
        <Pressable style={styles.tile} onPress={onSenior}>
          <View style={styles.glyph}>
            <View style={styles.sunOverlay}>
              <Icon name="lucide:Sun" size={48} color={colors.textPrimary} strokeWidth={1.8} />
            </View>
            <Icon name="lucide:UserRound" size={56} color={colors.textPrimary} strokeWidth={1.8} />
          </View>
          <Text style={styles.tileLabel}>SENIOR</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={onCaregiver}>
          <View style={styles.glyph}>
            <Icon name="lucide:HeartHandshake" size={64} color={colors.textPrimary} strokeWidth={1.8} />
          </View>
          <Text style={styles.tileLabel}>CAREGIVER</Text>
        </Pressable>
      </View>
      <Text style={styles.caption}>
        Named for Borneo&apos;s tallest tropical tree, its great height held up by wide buttress roots, just as
        our elders&apos; wisdom rests on the care that surrounds them.
      </Text>
    </SafeAreaView>
  );
}

const TILE_SIZE = 150;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: typography.h1.size,
    fontWeight: typography.h1.weight,
    letterSpacing: typography.h1.letterSpacing,
    color: colors.textPrimary,
  },
  tiles: {
    flexDirection: "row",
    gap: spacing.xl,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    ...shadows.button,
  },
  glyph: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  sunOverlay: {
    position: "absolute",
    top: -8,
    opacity: 0.6,
  },
  tileLabel: {
    fontSize: typography.body.size,
    fontWeight: "700",
    letterSpacing: 2,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  caption: {
    fontSize: typography.caption.size,
    fontStyle: "italic",
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
    lineHeight: 18,
  },
});
