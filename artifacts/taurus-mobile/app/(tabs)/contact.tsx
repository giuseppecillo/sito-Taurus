import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Nome obbligatorio";
    if (!email.trim()) e.email = "Email obbligatoria";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Email non valida";
    if (!message.trim()) e.message = "Messaggio obbligatorio";
    return e;
  }

  async function handleSend() {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    setErrors({});
    setSending(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  if (sent) {
    return (
      <View
        style={[
          styles.successContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <View
          style={[
            styles.successIcon,
            { backgroundColor: colors.primary + "22", borderRadius: 40 },
          ]}
        >
          <Ionicons name="checkmark-circle" size={52} color={colors.primary} />
        </View>
        <Text
          style={[
            styles.successTitle,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          Messaggio inviato!
        </Text>
        <Text
          style={[
            styles.successSub,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          Ti risponderemo al più presto.
        </Text>
        <Pressable
          onPress={() => {
            setSent(false);
            setName("");
            setCompany("");
            setEmail("");
            setMessage("");
          }}
          style={({ pressed }) => [
            styles.resetBtn,
            {
              backgroundColor: colors.muted,
              borderRadius: 8,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.resetBtnText,
              { color: colors.foreground, fontFamily: "Inter_500Medium" },
            ]}
          >
            Nuovo messaggio
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: isWeb ? 67 + 16 : insets.top + 16,
          paddingBottom: isWeb ? 34 + 90 : 100,
        },
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerArea}>
        <Text
          style={[
            styles.sectionLabel,
            { color: colors.primary, fontFamily: "Inter_600SemiBold" },
          ]}
        >
          CONTATTI
        </Text>
        <Text
          style={[
            styles.heading,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          Contattaci
        </Text>
        <Text
          style={[
            styles.subheading,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          Scopri come possiamo rispondere alle esigenze della tua azienda agricola.
        </Text>
      </View>

      <View style={styles.infoCards}>
        {[
          { icon: "mail-outline", label: "info@taurusagri.it" },
          { icon: "call-outline", label: "+39 0971 123 456" },
          { icon: "location-outline", label: "Basilicata, Italia" },
        ].map(({ icon, label }) => (
          <View
            key={label}
            style={[
              styles.infoCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: 10,
              },
            ]}
          >
            <Ionicons name={icon as any} size={16} color={colors.primary} />
            <Text
              style={[
                styles.infoLabel,
                { color: colors.foreground, fontFamily: "Inter_400Regular" },
              ]}
            >
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.form}>
        <Field
          label="Nome *"
          value={name}
          onChangeText={setName}
          error={errors.name}
          placeholder="Il tuo nome"
          focused={focused === "name"}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
        <Field
          label="Azienda"
          value={company}
          onChangeText={setCompany}
          placeholder="Nome azienda (opzionale)"
          focused={focused === "company"}
          onFocus={() => setFocused("company")}
          onBlur={() => setFocused(null)}
        />
        <Field
          label="Email *"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          placeholder="email@esempio.it"
          keyboardType="email-address"
          autoCapitalize="none"
          focused={focused === "email"}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />
        <Field
          label="Messaggio *"
          value={message}
          onChangeText={setMessage}
          error={errors.message}
          placeholder="Come possiamo aiutarti?"
          multiline
          numberOfLines={5}
          focused={focused === "message"}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        />

        <Pressable
          onPress={handleSend}
          disabled={sending}
          style={({ pressed }) => [
            styles.sendBtn,
            {
              backgroundColor: colors.primary,
              borderRadius: 10,
              opacity: pressed || sending ? 0.8 : 1,
            },
          ]}
          testID="send-button"
        >
          {sending ? (
            <Text
              style={[
                styles.sendBtnText,
                { color: "#fff", fontFamily: "Inter_600SemiBold" },
              ]}
            >
              Invio in corso…
            </Text>
          ) : (
            <>
              <Text
                style={[
                  styles.sendBtnText,
                  { color: "#fff", fontFamily: "Inter_600SemiBold" },
                ]}
              >
                Invia messaggio
              </Text>
              <Ionicons name="send" size={16} color="#fff" />
            </>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  multiline,
  numberOfLines,
  keyboardType,
  autoCapitalize,
  focused,
  onFocus,
  onBlur,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: any;
  autoCapitalize?: any;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const colors = useColors();
  return (
    <View style={styles.fieldWrapper}>
      <Text
        style={[
          styles.fieldLabel,
          { color: colors.foreground, fontFamily: "Inter_500Medium" },
        ]}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={onFocus}
        onBlur={onBlur}
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          {
            backgroundColor: colors.card,
            borderColor: error
              ? colors.destructive
              : focused
              ? colors.primary
              : colors.border,
            borderRadius: 8,
            color: colors.foreground,
            fontFamily: "Inter_400Regular",
          },
        ]}
      />
      {error ? (
        <Text
          style={[
            styles.errorText,
            { color: colors.destructive, fontFamily: "Inter_400Regular" },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerArea: {
    gap: 6,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  subheading: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 2,
  },
  infoCards: {
    gap: 8,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
  },
  form: {
    gap: 14,
  },
  fieldWrapper: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
  },
  input: {
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 110,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  errorText: {
    fontSize: 12,
  },
  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    marginTop: 4,
  },
  sendBtnText: {
    fontSize: 16,
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  successTitle: {
    fontSize: 22,
  },
  successSub: {
    fontSize: 15,
    textAlign: "center",
  },
  resetBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 12,
  },
  resetBtnText: {
    fontSize: 15,
  },
});
