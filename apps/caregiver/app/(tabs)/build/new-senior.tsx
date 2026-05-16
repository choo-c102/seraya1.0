import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radii, spacing, typography } from "@seraya/shared";
import { ScreenHeader } from "../../../components/ScreenHeader";

export default function NewSeniorScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const onSave = () => {
    // Mock save — generate a slug and route into wizard step 1.
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-senior";
    router.replace(`/build/senior/${slug}/questionnaire/new/wizard/step-1-emoji`);
  };

  const canSave = name.trim().length > 0 && age.trim().length > 0;

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScreenHeader title="NEW SENIOR" />
      <View style={styles.form}>
        <Field label="Name" value={name} onChange={setName} placeholder="Senior's full name" />
        <Field
          label="Age"
          value={age}
          onChange={setAge}
          placeholder="0"
          keyboardType="number-pad"
        />
        <Field
          label="Gender"
          value={gender}
          onChange={setGender}
          placeholder="female / male / other"
        />
        <Field
          label="Diagnosis (optional)"
          value={diagnosis}
          onChange={setDiagnosis}
          placeholder="e.g. Type 2 diabetes"
        />
      </View>
      <View style={styles.cta}>
        <Pressable
          onPress={canSave ? onSave : undefined}
          style={[styles.btn, !canSave && styles.btnDisabled]}
        >
          <Text style={styles.btnLabel}>Save & build questionnaire</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "number-pad";
};

function Field({ label, value, onChange, placeholder, keyboardType = "default" }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.body.size,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body.size,
    color: colors.textPrimary,
  },
  cta: {
    padding: spacing.lg,
  },
  btn: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    alignItems: "center",
  },
  btnDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  btnLabel: {
    color: colors.textOnAccent,
    fontWeight: "700",
    fontSize: typography.body.size,
  },
});
