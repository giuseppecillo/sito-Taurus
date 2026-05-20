import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

interface DiseaseRisk {
  id: string;
  cropIt: string;
  cropEn: string;
  diseaseIt: string;
  diseaseEn: string;
  risk: number;
  icon: string;
  lastUpdated: string;
}

const RISKS: DiseaseRisk[] = [
  {
    id: "1",
    cropIt: "Grano",
    cropEn: "Wheat",
    diseaseIt: "Fusariosi della spiga",
    diseaseEn: "Fusarium head blight",
    risk: 72,
    icon: "nutrition-outline",
    lastUpdated: "Oggi 06:00",
  },
  {
    id: "2",
    cropIt: "Vite",
    cropEn: "Grapevine",
    diseaseIt: "Peronospora della vite",
    diseaseEn: "Downy mildew",
    risk: 38,
    icon: "rose-outline",
    lastUpdated: "Oggi 06:00",
  },
  {
    id: "3",
    cropIt: "Tabacco",
    cropEn: "Tobacco",
    diseaseIt: "Peronospora tabacina",
    diseaseEn: "Blue mold",
    risk: 55,
    icon: "leaf-outline",
    lastUpdated: "Oggi 06:00",
  },
  {
    id: "4",
    cropIt: "Pomodoro",
    cropEn: "Tomato",
    diseaseIt: "Peronospora del pomodoro",
    diseaseEn: "Late blight",
    risk: 61,
    icon: "planet-outline",
    lastUpdated: "Oggi 06:00",
  },
];

function getRiskLabel(risk: number): string {
  if (risk < 40) return "Basso";
  if (risk < 65) return "Medio";
  return "Alto";
}

function RiskBar({ risk, delay }: { risk: number; delay: number }) {
  const colors = useColors();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(risk / 100, { duration: 900 }));
  }, [risk, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as any,
  }));

  const barColor =
    risk >= 65
      ? colors.riskHigh
      : risk >= 40
      ? colors.riskMedium
      : colors.riskLow;

  return (
    <View
      style={[
        styles.barTrack,
        { backgroundColor: colors.border, borderRadius: 4 },
      ]}
    >
      <Animated.View
        style={[
          styles.barFill,
          animatedStyle,
          { backgroundColor: barColor, borderRadius: 4 },
        ]}
      />
    </View>
  );
}

function RiskCard({ item, index }: { item: DiseaseRisk; index: number }) {
  const colors = useColors();

  const riskLabel = getRiskLabel(item.risk);
  const riskColor =
    item.risk >= 65
      ? colors.riskHigh
      : item.risk >= 40
      ? colors.riskMedium
      : colors.riskLow;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: 12,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.cropIcon,
            {
              backgroundColor: colors.primary + "18",
              borderRadius: 10,
            },
          ]}
        >
          <Ionicons name={item.icon as any} size={20} color={colors.primary} />
        </View>
        <View style={styles.cropInfo}>
          <Text
            style={[
              styles.cropName,
              { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            {item.cropIt}
          </Text>
          <Text
            style={[
              styles.diseaseName,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            {item.diseaseIt}
          </Text>
        </View>
        <View
          style={[
            styles.riskBadge,
            { backgroundColor: riskColor + "22", borderRadius: 6 },
          ]}
        >
          <Text
            style={[
              styles.riskBadgeText,
              { color: riskColor, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            {riskLabel}
          </Text>
        </View>
      </View>

      <View style={styles.riskRow}>
        <RiskBar risk={item.risk} delay={index * 120} />
        <Text
          style={[
            styles.riskPercent,
            { color: riskColor, fontFamily: "Inter_700Bold" },
          ]}
        >
          {item.risk}%
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <Ionicons name="time-outline" size={11} color={colors.mutedForeground} />
        <Text
          style={[
            styles.updatedText,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          {item.lastUpdated}
        </Text>
      </View>
    </View>
  );
}

export default function RisksScreen() {
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
      <View style={styles.headerArea}>
        <Text
          style={[
            styles.sectionLabel,
            { color: colors.primary, fontFamily: "Inter_600SemiBold" },
          ]}
        >
          MODULO MALATTIE
        </Text>
        <Text
          style={[
            styles.heading,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          Rischio fitosanitario
        </Text>
        <Text
          style={[
            styles.subheading,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          Monitoraggio in tempo reale delle principali patologie colturali
        </Text>
      </View>

      <View style={styles.legend}>
        {[
          { label: "Basso", color: colors.riskLow },
          { label: "Medio", color: colors.riskMedium },
          { label: "Alto", color: colors.riskHigh },
        ].map(({ label, color }) => (
          <View key={label} style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: color, borderRadius: 4 }]}
            />
            <Text
              style={[
                styles.legendLabel,
                { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
              ]}
            >
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.cardList}>
        {RISKS.map((item, index) => (
          <RiskCard key={item.id} item={item} index={index} />
        ))}
      </View>

      <View
        style={[
          styles.infoBox,
          { backgroundColor: colors.muted, borderRadius: 10, borderColor: colors.border },
        ]}
      >
        <Ionicons
          name="information-circle-outline"
          size={16}
          color={colors.mutedForeground}
        />
        <Text
          style={[
            styles.infoText,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          I dati sono aggiornati ogni 6 ore sulla base di modelli epidemica e
          stazioni meteo locali.
        </Text>
      </View>
    </ScrollView>
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
  legend: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
  },
  legendLabel: {
    fontSize: 12,
  },
  cardList: {
    gap: 12,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cropIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  cropInfo: {
    flex: 1,
    gap: 2,
  },
  cropName: {
    fontSize: 15,
  },
  diseaseName: {
    fontSize: 12,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  riskBadgeText: {
    fontSize: 11,
  },
  riskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barTrack: {
    flex: 1,
    height: 6,
    overflow: "hidden",
  },
  barFill: {
    height: 6,
  },
  riskPercent: {
    fontSize: 14,
    minWidth: 38,
    textAlign: "right",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  updatedText: {
    fontSize: 11,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    padding: 14,
    borderWidth: 1,
    marginTop: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
});
