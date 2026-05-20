import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

interface Feature {
  id: string;
  icon: string;
  iconFamily: "Ionicons" | "MaterialCommunityIcons";
  titleIt: string;
  titleEn: string;
  descIt: string;
  descEn: string;
  accent: "green" | "blue" | "teal";
}

const FEATURES: Feature[] = [
  {
    id: "1",
    icon: "map-outline",
    iconFamily: "Ionicons",
    titleIt: "Smart Mapping",
    titleEn: "Smart Mapping",
    descIt: "Aggiungi appezzamenti caricando file o disegnandoli su mappa satellitare.",
    descEn: "Add plots by uploading files or drawing them on a satellite map.",
    accent: "green",
  },
  {
    id: "2",
    icon: "layers-outline",
    iconFamily: "Ionicons",
    titleIt: "Mappe VRT",
    titleEn: "VRT Prescription Maps",
    descIt: "Zone NDVI omogenee — esporta compatibile con Topcon e Trimble.",
    descEn: "Homogeneous NDVI zones — export compatible with Topcon and Trimble.",
    accent: "blue",
  },
  {
    id: "3",
    icon: "leaf-outline",
    iconFamily: "Ionicons",
    titleIt: "Previsioni Malattie",
    titleEn: "Disease Forecasting",
    descIt: "Monitora il rischio per Grano, Vite, Tabacco e Pomodoro.",
    descEn: "Monitor risk for Wheat, Grapevine, Tobacco and Tomato.",
    accent: "teal",
  },
  {
    id: "4",
    icon: "shield-checkmark-outline",
    iconFamily: "Ionicons",
    titleIt: "Copertura Agrofarmaci",
    titleEn: "Agrochemical Coverage",
    descIt: "Traccia la durata protettiva degli agrofarmaci applicati.",
    descEn: "Track the protective duration of applied agrochemicals.",
    accent: "green",
  },
  {
    id: "5",
    icon: "satellite-variant",
    iconFamily: "MaterialCommunityIcons",
    titleIt: "Telerilevamento",
    titleEn: "Remote Sensing",
    descIt: "Integrazione con dati satellitari e droni per analisi NDVI avanzata.",
    descEn: "Integration with satellite and drone data for advanced NDVI analysis.",
    accent: "blue",
  },
  {
    id: "6",
    icon: "phone-portrait-outline",
    iconFamily: "Ionicons",
    titleIt: "Monitoraggio Remoto",
    titleEn: "Remote Monitoring",
    descIt: "Connettività IoT e sensori in campo, dati in tempo reale sul telefono.",
    descEn: "IoT connectivity and field sensors, real-time data on your phone.",
    accent: "teal",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const accentColor =
    feature.accent === "green"
      ? colors.primary
      : feature.accent === "blue"
      ? colors.secondary
      : colors.accent;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View
      style={[
        styles.featureCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: 12,
          transform: [{ scale }],
        },
      ]}
      onTouchStart={onPressIn}
      onTouchEnd={onPressOut}
    >
      <View
        style={[
          styles.iconBadge,
          { backgroundColor: accentColor + "22", borderRadius: 10 },
        ]}
      >
        {feature.iconFamily === "Ionicons" ? (
          <Ionicons name={feature.icon as any} size={22} color={accentColor} />
        ) : (
          <MaterialCommunityIcons
            name={feature.icon as any}
            size={22}
            color={accentColor}
          />
        )}
      </View>
      <View style={styles.featureText}>
        <Text
          style={[
            styles.featureTitle,
            { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
          ]}
        >
          {feature.titleIt}
        </Text>
        <Text
          style={[
            styles.featureDesc,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          {feature.descIt}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function FeaturesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

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
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
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
            styles.heading,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          Una piattaforma,{"\n"}mille possibilità
        </Text>
        <Text
          style={[
            styles.subheading,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          Tecnologie integrate per l'agricoltura di precisione
        </Text>
      </View>

      <View style={styles.grid}>
        {FEATURES.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
    gap: 6,
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
  grid: {
    gap: 12,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    padding: 16,
    borderWidth: 1,
  },
  iconBadge: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureText: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: 15,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
});
