import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Share,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Clipboard from "expo-clipboard";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { getAnonymousIdentity } from "../../utils/anonymousIdentity";
import {
  getOrCreateUserXP,
  claimDailyXPIfDue,
  redeemReferralCode,
  redeemPremiumWithXP,
  UserXPData,
} from "../../utils/xpSystem";
import ConfirmModal from "../../components/ConfirmModal";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "XP">;

const STREAK_REWARDS = [50, 50, 50, 50, 50, 50, 150];

export default function XPScreen({ navigation }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [xpData, setXpData] = useState<UserXPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [awardToast, setAwardToast] = useState<number>(0);
  const [redeemCodeInput, setRedeemCodeInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [infoModal, setInfoModal] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [confirmRedeem, setConfirmRedeem] = useState<{
    xpCost: number;
    tier: string;
    priceLabel: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { userId: uid } = await getAnonymousIdentity();
      setUserId(uid);

      const { data, awarded } = await claimDailyXPIfDue(uid);
      setXpData(data);
      if (awarded > 0) setAwardToast(awarded);
      setLoading(false);
    })();
  }, []);

  const refresh = async () => {
    if (!userId) return;
    const data = await getOrCreateUserXP(userId);
    setXpData(data);
  };

  const handleCopyCode = async () => {
    if (!xpData) return;
    await Clipboard.setStringAsync(xpData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleShareInvite = async () => {
    if (!xpData) return;
    try {
      await Share.share({
        message: `Join me on Ranchat — anonymous classroom chat! Use my invite code ${xpData.referralCode} when you open the app to give us both bonus XP.`,
      });
    } catch (e) {
      console.log("Share failed", e);
    }
  };

  const handleRedeemCode = async () => {
    if (!userId) return;
    const result = await redeemReferralCode(userId, redeemCodeInput);
    setInfoModal({
      title: result.success ? "Success!" : "Couldn't redeem code",
      message: result.message,
    });
    if (result.success) {
      setRedeemCodeInput("");
      refresh();
    }
  };

  const handleRedeemPremiumPress = (
    xpCost: number,
    tier: string,
    priceLabel: string
  ) => {
    if (!xpData) return;
    if (xpData.xp < xpCost) {
      setInfoModal({
        title: "Not enough XP yet",
        message: `You need ${xpCost - xpData.xp} more XP to redeem this.`,
      });
      return;
    }
    setConfirmRedeem({ xpCost, tier, priceLabel });
  };

  const confirmRedeemPremium = async () => {
    if (!userId || !confirmRedeem) return;
    const { xpCost, tier } = confirmRedeem;
    setConfirmRedeem(null);
    const result = await redeemPremiumWithXP(userId, xpCost, tier);
    setInfoModal({
      title: result.success ? "Redeemed!" : "Couldn't redeem",
      message: result.message,
    });
    if (result.success) refresh();
  };

  if (loading || !xpData) {
    return (
      <SafeAreaView style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
        <ActivityIndicator color="#A78BFA" />
      </SafeAreaView>
    );
  }

  const nextTierXP = xpData.xp < 1500 ? 1500 : 5000;
  const progress = Math.min(xpData.xp / nextTierXP, 1);
  const cyclePos = xpData.streakCount === 0 ? 0 : ((xpData.streakCount - 1) % 7) + 1;
  const pastFirstWeek = xpData.streakCount > 7;

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

        <View>
          <View style={styles.headerTitleRow}>
            <Ionicons name="flash" size={18} color="#8B5CF6" />
            <Text style={styles.headerTitle}>
              <Text style={styles.headerTitleWhite}>Ranchat </Text>
              <Text style={styles.headerTitleAccent}>XP</Text>
            </Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Earn XP • Unlock Rewards • Level Up
          </Text>
        </View>

        <View style={styles.xpBadge}>
          <Ionicons name="diamond" size={13} color="#C4B5FD" />
          <Text style={styles.xpBadgeText}>{xpData.xp} XP</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {awardToast > 0 && (
          <View
            style={{
              backgroundColor: "rgba(52,211,153,0.12)",
              borderWidth: 1,
              borderColor: "rgba(52,211,153,0.4)",
              borderRadius: 14,
              padding: 12,
              marginBottom: 14,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="checkmark-circle" size={18} color="#34D399" />
            <Text style={{ color: "#34D399", fontSize: 13, fontWeight: "700", marginLeft: 8 }}>
              +{awardToast} XP for coming back today!
            </Text>
          </View>
        )}

        {/* Current XP */}
        <View style={styles.card}>
          <View style={styles.currentXPRow}>
            <LinearGradient
              colors={["#8B5CF6", "#3B82F6"]}
              style={styles.xpHexagon}
            >
              <Ionicons name="flash" size={26} color="#FFFFFF" />
            </LinearGradient>

            <View style={{ flex: 1 }}>
              <Text style={styles.currentXPLabel}>Current XP</Text>
              <Text style={styles.currentXPValue}>{xpData.xp} XP</Text>
              <View style={styles.progressTrack}>
                <View
                  style={[styles.progressFill, { width: `${progress * 100}%` }]}
                />
              </View>
              <Text style={styles.progressLabel}>
                {xpData.xp} / {nextTierXP} XP
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Streak */}
        <View style={styles.streakCard}>
          <View style={styles.streakHeaderRow}>
            <Ionicons name="flame" size={20} color="#FBBF24" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.streakTitle}>Daily Streak</Text>
              <Text style={styles.streakSubtitle}>
                Keep coming back and earn more XP!
              </Text>
            </View>
          </View>

          <View style={styles.streakDaysRow}>
            {STREAK_REWARDS.map((reward, index) => {
              const dayNum = index + 1;
              const isDone = pastFirstWeek || dayNum <= cyclePos;
              const isBonusDay = dayNum === 7;
              return (
                <View key={dayNum} style={styles.streakDay}>
                  <View
                    style={[
                      styles.streakCircle,
                      {
                        borderColor: isDone
                          ? isBonusDay
                            ? "#FBBF24"
                            : "#34D399"
                          : "#3F3F46",
                        backgroundColor: isDone
                          ? isBonusDay
                            ? "rgba(251,191,36,0.15)"
                            : "rgba(52,211,153,0.12)"
                          : "transparent",
                      },
                    ]}
                  >
                    <Ionicons
                      name={isBonusDay ? "gift" : "checkmark"}
                      size={15}
                      color={
                        isDone ? (isBonusDay ? "#FBBF24" : "#34D399") : "#4B4B55"
                      }
                    />
                  </View>
                  <Text style={styles.streakDayLabel}>
                    {dayNum}{"\n"}+{reward} XP
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.streakBanner}>
            <Ionicons name="calendar-outline" size={16} color="#FBBF24" />
            <Text style={styles.streakBannerText}>
              {pastFirstWeek
                ? "Streak continues! Earning +60 XP every day."
                : "Streak continues! From Day 8 onwards, earn +60 XP every day."}
            </Text>
          </View>
        </View>

        {/* 3-friend challenge / referral */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Invite Friends</Text>
          <Text style={styles.sectionSubtitle}>
            Invite 3 friends to Ranchat — {xpData.invitedCount}/3 joined
            {xpData.challengeXPClaimed ? " ✓ +300 XP claimed" : ""}
          </Text>

          <View style={styles.codeRow}>
            <Text style={styles.codeText}>{xpData.referralCode}</Text>
            <TouchableOpacity onPress={handleCopyCode} activeOpacity={0.7}>
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={18}
                color="#A78BFA"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.inviteButton}
            activeOpacity={0.85}
            onPress={handleShareInvite}
          >
            <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
            <Text style={styles.inviteButtonText}>Invite Friends</Text>
          </TouchableOpacity>

          {!xpData.usedReferralCode && (
            <View style={styles.redeemCodeRow}>
              <TextInput
                style={styles.redeemCodeInput}
                placeholder="Have a friend's code?"
                placeholderTextColor="#6B7280"
                value={redeemCodeInput}
                onChangeText={(t) => setRedeemCodeInput(t.toUpperCase())}
                autoCapitalize="characters"
                maxLength={6}
              />
              <TouchableOpacity
                style={styles.redeemCodeButton}
                activeOpacity={0.8}
                onPress={handleRedeemCode}
              >
                <Text style={styles.redeemCodeButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Redeem with XP */}
        <Text style={styles.sectionTitle}>Redeem with XP</Text>
        <Text style={styles.sectionSubtitle}>
          Use your XP to get Premium and more!
        </Text>

        <View style={styles.redeemRow}>
          <View style={styles.redeemCard}>
            <LinearGradient
              colors={["#8B5CF6", "#3B82F6"]}
              style={styles.redeemCrown}
            >
              <Ionicons name="ribbon" size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.redeemXP}>1,500 XP</Text>
            <Text style={styles.redeemPrice}>Premium ₹49</Text>
            <TouchableOpacity
              style={[styles.redeemButton, { backgroundColor: "#8B5CF6" }]}
              activeOpacity={0.85}
              onPress={() => handleRedeemPremiumPress(1500, "basic", "₹49")}
            >
              <Text style={styles.redeemButtonText}>Get with XP</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.redeemCard, styles.redeemCardLast]}>
            <LinearGradient
              colors={["#FBBF24", "#F59E0B"]}
              style={styles.redeemCrown}
            >
              <Ionicons name="trophy" size={20} color="#1C1917" />
            </LinearGradient>
            <Text style={styles.redeemXP}>5,000 XP</Text>
            <Text style={styles.redeemPrice}>Premium ₹499</Text>
            <TouchableOpacity
              style={[styles.redeemButton, { backgroundColor: "#F59E0B" }]}
              activeOpacity={0.85}
              onPress={() => handleRedeemPremiumPress(5000, "pro", "₹499")}
            >
              <Text style={[styles.redeemButtonText, { color: "#1C1917" }]}>
                Get with XP
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerText}>
          More XP = More Freedom = Better Ranchat
        </Text>
      </ScrollView>

      <ConfirmModal
        visible={!!confirmRedeem}
        title="Redeem Premium"
        message={
          confirmRedeem
            ? `Use ${confirmRedeem.xpCost} XP to unlock Premium (worth ${confirmRedeem.priceLabel})?`
            : ""
        }
        confirmText="Redeem"
        icon="diamond-outline"
        onConfirm={confirmRedeemPremium}
        onCancel={() => setConfirmRedeem(null)}
      />

      <ConfirmModal
        visible={!!infoModal}
        title={infoModal?.title ?? ""}
        message={infoModal?.message ?? ""}
        confirmText="OK"
        hideCancel
        icon="information-circle-outline"
        onConfirm={() => setInfoModal(null)}
        onCancel={() => setInfoModal(null)}
      />
    </SafeAreaView>
  );
}