import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Purchases, {
  PurchasesPackage,
  PACKAGE_TYPE,
} from "react-native-purchases";

import { RootStackParamList } from "../../navigation/RootNavigator";
import ConfirmModal from "../../components/ConfirmModal";
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
  const [loadingOfferings, setLoadingOfferings] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [isPremiumActive, setIsPremiumActive] = useState(false);
  const [yearlyPackage, setYearlyPackage] = useState<PurchasesPackage | null>(
    null
  );
  const [monthlyPackage, setMonthlyPackage] = useState<PurchasesPackage | null>(
    null
  );
  const [selectedPackage, setSelectedPackage] = useState<PurchasesPackage | null>(
    null
  );
  const [resultModal, setResultModal] = useState<{
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const offerings = await Purchases.getOfferings();
        const current = offerings.current;

        if (current) {
          const annual =
            current.availablePackages.find(
              (p) => p.packageType === PACKAGE_TYPE.ANNUAL
            ) ?? null;
          const monthly =
            current.availablePackages.find(
              (p) => p.packageType === PACKAGE_TYPE.MONTHLY
            ) ?? null;

          setYearlyPackage(annual);
          setMonthlyPackage(monthly);
          setSelectedPackage(annual ?? monthly ?? null);
        }
      } catch (e) {
        console.log("Failed to load offerings", e);
      } finally {
        setLoadingOfferings(false);
      }
    })();
  }, []);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();

        const active =
          typeof customerInfo.entitlements.active["premium"] !== "undefined";

        setIsPremiumActive(active);
      } catch (e) {
        console.log("Failed to check Premium status", e);
      }
    };

    checkPremiumStatus();
  }, []);

  const handleSubscribe = async () => {
    if (!selectedPackage) return;

    setPurchasing(true);

    try {
      const { customerInfo } = await Purchases.purchasePackage(selectedPackage);

      const isPremium =
        typeof customerInfo.entitlements.active["premium"] !== "undefined";

      if (isPremium) {
        setIsPremiumActive(true);
        setResultModal({
          title: "Welcome to Premium!",
          message: "Your purchase was successful. Enjoy the full experience.",
        });
      } else {
        setResultModal({
          title: "Purchase completed",
          message:
            "Your purchase was completed, but Premium access has not been activated yet. Please try restoring your purchase.",
        });
      }
    } catch (e: any) {
      if (!e?.userCancelled) {
        setResultModal({
          title: "Purchase failed",
          message: e?.message ?? "Something went wrong. Please try again.",
        });
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestorePurchases = async () => {
    setPurchasing(true);

    try {
      const customerInfo = await Purchases.restorePurchases();

      const isPremium =
        typeof customerInfo.entitlements.active["premium"] !== "undefined";

      if (isPremium) {
        setIsPremiumActive(true);
        setResultModal({
          title: "Premium Restored!",
          message: "Your Premium access has been restored successfully.",
        });
      } else {
        setResultModal({
          title: "No Premium Found",
          message: "We couldn't find an active Premium purchase for this account.",
        });
      }
    } catch (e: any) {
      setResultModal({
        title: "Restore failed",
        message:
          e?.message ?? "Something went wrong while restoring your purchase.",
      });
    } finally {
      setPurchasing(false);
    }
  };

  const closeResultModal = () => {
    const wasSuccess = resultModal?.title === "Welcome to Premium!";
    setResultModal(null);
    if (wasSuccess) navigation.goBack();
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

        {isPremiumActive ? (
          // ---------- Already Premium ----------
          <View
            style={{
              marginTop: 8,
              marginBottom: 8,
              padding: 18,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#FBBF24",
              backgroundColor: "rgba(251,191,36,0.08)",
              alignItems: "center",
            }}
          >
            <Ionicons name="checkmark-circle" size={28} color="#FBBF24" />
            <Text
              style={{
                color: "#FBBF24",
                fontSize: 16,
                fontWeight: "700",
                marginTop: 8,
              }}
            >
              You're already Premium
            </Text>
            <Text
              style={{
                color: "#9CA3AF",
                fontSize: 12.5,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              Thanks for supporting Ranchat. Your Premium is active.
            </Text>
          </View>
        ) : (
          <>
            {loadingOfferings ? (
              <View style={{ paddingVertical: 30, alignItems: "center" }}>
                <ActivityIndicator color="#FBBF24" />
              </View>
            ) : (
              <View style={styles.planRow}>
                {yearlyPackage && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedPackage(yearlyPackage)}
                    style={[
                      styles.planCard,
                      selectedPackage?.identifier === yearlyPackage.identifier &&
                        styles.planCardActive,
                    ]}
                  >
                    <Text style={styles.planDuration}>Yearly</Text>
                    <Text style={styles.planPrice}>
                      {yearlyPackage.product.priceString}
                    </Text>
                    <Text style={styles.planPer}>per year</Text>
                    <View style={styles.planBadge}>
                      <Text style={styles.planBadgeText}>BEST VALUE</Text>
                    </View>
                  </TouchableOpacity>
                )}

                {monthlyPackage && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedPackage(monthlyPackage)}
                    style={[
                      styles.planCard,
                      selectedPackage?.identifier === monthlyPackage.identifier &&
                        styles.planCardActive,
                    ]}
                  >
                    <Text style={styles.planDuration}>Monthly</Text>
                    <Text style={styles.planPrice}>
                      {monthlyPackage.product.priceString}
                    </Text>
                    <Text style={styles.planPer}>per month</Text>
                  </TouchableOpacity>
                )}

                {!yearlyPackage && !monthlyPackage && (
                  <Text
                    style={{
                      color: "#9CA3AF",
                      fontSize: 12.5,
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    No plans available right now. Please try again later.
                  </Text>
                )}
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.subscribeButton,
                (!selectedPackage || purchasing) && { opacity: 0.5 },
              ]}
              activeOpacity={0.85}
              onPress={handleSubscribe}
              disabled={!selectedPackage || purchasing}
            >
              <LinearGradient
                colors={["#FBBF24", "#F59E0B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subscribeGradient}
              >
                {purchasing ? (
                  <ActivityIndicator color="#1C1917" />
                ) : (
                  <>
                    <Text style={styles.subscribeText}>Get Premium</Text>
                    <Ionicons name="arrow-forward" size={18} color="#1C1917" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleRestorePurchases}
              disabled={purchasing}
              style={{ marginTop: 14, alignItems: "center" }}
            >
              <Text
                style={{
                  color: "#FBBF24",
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Restore Purchases
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.disclaimer}>
          Cancel anytime. Your subscription is managed securely through RevenueCat.
        </Text>
      </ScrollView>

      <ConfirmModal
        visible={!!resultModal}
        title={resultModal?.title ?? ""}
        message={resultModal?.message ?? ""}
        confirmText="OK"
        hideCancel
        icon={
          resultModal?.title === "Welcome to Premium!"
            ? "checkmark-circle-outline"
            : "alert-circle-outline"
        }
        destructive={resultModal?.title !== "Welcome to Premium!"}
        onConfirm={closeResultModal}
        onCancel={closeResultModal}
      />
    </SafeAreaView>
  );
}