import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Premium">;

const PERKS = [
  {
    icon: "infinite-outline",
    title: "Unlimited classrooms",
    subtitle: "Create and join as many as you want",
  },
  {
    icon: "flash-outline",
    title: "Priority delivery",
    subtitle: "Your messages send and sync the fastest",
  },
  {
    icon: "color-palette-outline",
    title: "Exclusive themes",
    subtitle: "Extra avatar colors and chat styles",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Extended code lifetime",
    subtitle: "Classroom codes last 7 days instead of 3",
  },
  {
    icon: "ban-outline",
    title: "No ads, ever",
    subtitle: "A completely clean, distraction-free experience",
  },
];

export default function PremiumScreen({ navigation }: Props) {
  const handleSubscribe = () => {
    // TODO: wire up to a real payment provider (RevenueCat/Stripe) later
    console.log("Subscribe pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.crownWrap}>
          <LinearGradient
            colors={["#FBBF24", "#F59E0B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.crownCircle}
          >
            <Ionicons name="diamond" size={34} color="#1C1917" />
          </LinearGradient>
        </View>

        <Text style={styles.title}>Ranchat Premium</Text>
        <Text style={styles.subtitle}>
          Unlock the full anonymous experience with exclusive perks.
        </Text>

        <View style={styles.perksCard}>
          {PERKS.map((perk, index) => (
            <View
              key={perk.title}
              style={[
                styles.perkRow,
                index === PERKS.length - 1 && styles.perkRowLast,
              ]}
            >
              <View style={styles.perkIconWrap}>
                <Ionicons name={perk.icon as any} size={18} color="#FBBF24" />
              </View>
              <View style={styles.perkTextWrap}>
                <Text style={styles.perkTitle}>{perk.title}</Text>
                <Text style={styles.perkSubtitle}>{perk.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.planRow}>
          <View style={[styles.planCard, styles.planCardActive]}>
            <Text style={styles.planDuration}>Yearly</Text>
            <Text style={styles.planPrice}>₹499</Text>
            <Text style={styles.planPer}>per year</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>BEST VALUE</Text>
            </View>
          </View>

          <View style={styles.planCard}>
            <Text style={styles.planDuration}>Monthly</Text>
            <Text style={styles.planPrice}>₹49</Text>
            <Text style={styles.planPer}>per month</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          activeOpacity={0.85}
          onPress={handleSubscribe}
        >
          <LinearGradient
            colors={["#FBBF24", "#F59E0B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.subscribeGradient}
          >
            <Text style={styles.subscribeText}>Get Premium</Text>
            <Ionicons name="arrow-forward" size={18} color="#1C1917" />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Cancel anytime. Billing details are illustrative — payments aren't
          wired up yet.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}