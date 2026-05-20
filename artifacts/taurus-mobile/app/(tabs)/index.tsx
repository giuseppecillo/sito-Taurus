import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const PILLARS = [
  { icon: "trending-up-outline", label: "Produttività" },
  { icon: "expand-outline", label: "Scalabilità" },
  { icon: "eye-outline", label: "Tracciabilità" },
  { icon: "leaf-outline", label: "Sostenibilità" },
] as const;

const QUICK_STATS = [
  { value: "4", unit: "colture", label: "monitorate", icon: "nutrition-outline" as const },
  { value: "NDVI", unit: "", label: "analisi satellite", icon: "planet-outline" as const },
  { value: "VRT", unit: "", label: "mappe prescrizione", icon: "layers-outline" as const },
];

function PillarChip({ icon, label }: { icon: string; label: string }) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.pillarChip,
        {
          backgroundColor: colors.primary + "18",
          borderColor: colors.primary + "40",
          borderRadius: 8,
        },
      ]}
    >
      <Ionicons name={icon as any} size={16} color={colors.primary} />
      <Text
        style={[
          styles.pillarLabel,
          { color: colors.primary, fontFamily: "Inter_500Medium" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function StatCard({
  value,
  unit,
  label,
  icon,
}: {
  value: string;
  unit: string;
  label: string;
  icon: any;
}) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: 12,
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.accent} />
      <Text
        style={[
          styles.statValue,
          { color: colors.foreground, fontFamily: "Inter_700Bold" },
        ]}
      >
        {value}
        {unit ? (
          <Text
            style={[
              styles.statUnit,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            {" "}
            {unit}
          </Text>
        ) : null}
      </Text>
      <Text
        style={[
          styles.statLabel,
          { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const btnScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();

  function handleExplore() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(tabs)/features");
  }

  function handleContact() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(tabs)/contact");
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: isWeb ? 34 + 90 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.hero,
          {
            backgroundColor: colors.heroBackground,
            paddingTop: isWeb ? 67 + 32 : insets.top + 32,
          },
        ]}
      >
        <View
          style={[
            styles.heroBadge,
            {
              backgroundColor: colors.primary + "33",
              borderColor: colors.primary + "66",
              borderRadius: 20,
            },
          ]}
        >
          <MaterialCommunityIcons name="sprout" size={14} color={colors.primary} />
          <Text
            style={[
              styles.heroBadgeText,
              { color: colors.primary, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            Taurus Agriculture Solution
          </Text>
        </View>

        <Text
          style={[
            styles.heroTitle,
            { color: "#ffffff", fontFamily: "Inter_700Bold" },
          ]}
        >
          Taurus 2.0 VRT
        </Text>

        <Text
          style={[
            styles.heroSub,
            { color: "#a0b8a4", fontFamily: "Inter_400Regular" },
          ]}
        >
          Soluzioni integrate per l'agroindustria. Software per l'agricoltura
          di precisione.
        </Text>

        <View style={styles.heroButtons}>
          <Animated.View style={{ transform: [{ scale: btnScale }], flex: 1 }}>
            <Pressable
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={handleExplore}
              testID="explore-features-btn"
              style={[
                styles.heroCTA,
                { backgroundColor: colors.primary, borderRadius: 10 },
              ]}
            >
              <Text
                style={[
                  styles.heroCTAText,
                  { color: "#fff", fontFamily: "Inter_600SemiBold" },
                ]}
              >
                Esplora funzioni
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </Pressable>
          </Animated.View>

          <Pressable
            onPress={handleContact}
            testID="contact-btn"
            style={({ pressed }) => [
              styles.heroSecondary,
              {
                borderColor: "#ffffff33",
                borderRadius: 10,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.heroSecondaryText,
                { color: "#ffffff", fontFamily: "Inter_500Medium" },
              ]}
            >
              Contattaci
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.primary, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            CHI SIAMO
          </Text>
          <Text
            style={[
              styles.sectionHeading,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            Agricoltura di precisione
          </Text>
          <Text
            style={[
              styles.sectionBody,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            Sviluppiamo soluzioni software integrate per il settore
            agroalimentare. La nostra competenza ottimizza produttività,
            scalabilità e tracciabilità per un'agricoltura più intelligente.
          </Text>
          <View style={styles.pillars}>
            {PILLARS.map((p) => (
              <PillarChip key={p.label} icon={p.icon} label={p.label} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.primary, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            PIATTAFORMA
          </Text>
          <Text
            style={[
              styles.sectionHeading,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            Una piattaforma completa
          </Text>
          <View style={styles.statsRow}>
            {QUICK_STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </View>
        </View>

        <Pressable
          onPress={handleContact}
          style={({ pressed }) => [
            styles.ctaBanner,
            {
              backgroundColor: colors.primary,
              borderRadius: 14,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <View style={styles.ctaContent}>
            <Text
              style={[
                styles.ctaHeading,
                { color: "#fff", fontFamily: "Inter_700Bold" },
              ]}
            >
              Contattaci per scoprire come possiamo aiutarti
            </Text>
            <Text
              style={[
                styles.ctaBody,
                { color: "#ffffffcc", fontFamily: "Inter_400Regular" },
              ]}
            >
              Parla con noi delle esigenze specifiche della tua azienda.
            </Text>
          </View>
          <View
            style={[
              styles.ctaIconWrap,
              { backgroundColor: "#ffffff22", borderRadius: 24 },
            ]}
          >
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    gap: 16,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  heroBadgeText: {
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 36,
    lineHeight: 42,
  },
  heroSub: {
    fontSize: 15,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  heroCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  heroCTAText: {
    fontSize: 15,
  },
  heroSecondary: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  heroSecondaryText: {
    fontSize: 15,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 28,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
  },
  sectionHeading: {
    fontSize: 22,
    lineHeight: 30,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  pillars: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  pillarChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
  },
  pillarLabel: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 16,
    textAlign: "center",
  },
  statUnit: {
    fontSize: 11,
  },
  statLabel: {
    fontSize: 11,
    textAlign: "center",
  },
  ctaBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  ctaContent: {
    flex: 1,
    gap: 6,
  },
  ctaHeading: {
    fontSize: 15,
    lineHeight: 22,
  },
  ctaBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  ctaIconWrap: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});
