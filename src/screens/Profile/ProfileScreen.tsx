import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { auth } from "../../services/firebase";
import { useTheme } from "../../theme/ThemeContext";
import { useUnreadAlerts } from "../../hooks/useUnreadAlerts";
import { getSavedTheme, saveTheme } from "../../utils/themePreference";
import { themeOptions, profileFeatures, accountItems } from "./data";
import { styles } from "./styles";
import ConfirmModal from "../../components/ConfirmModal";

function darkenHex(hex: string, factor: number): string {
  const clean = hex.replace("#", "");
  const r = Math.round(parseInt(clean.substring(0, 2), 16) * factor);
  const g = Math.round(parseInt(clean.substring(2, 4), 16) * factor);
  const b = Math.round(parseInt(clean.substring(4, 6), 16) * factor);
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { mode, colors, toggleTheme } = useTheme();
  const hasUnreadAlerts = useUnreadAlerts();
  const [selectedThemeId, setSelectedThemeId] = useState(themeOptions[0].id);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [pulseAnim, rotateAnim]);

  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.5],
  });
  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });
  const orbitSpin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const selectedTheme =
    themeOptions.find((t) => t.id === selectedThemeId) ?? themeOptions[0];

  useEffect(() => {
    getSavedTheme().then((saved) => {
      if (saved) setSelectedThemeId(saved);
    });
  }, []);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    try {
      await signOut(auth);
    } catch (e) {
      console.log("Sign out error", e);
    }
    navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
  };

  const handleAccountPress = (id: string) => {
    if (id === "appearance") {
      setThemeModalVisible(true);
      return;
    }
    if (id === "privacy") {
      navigation.navigate("PrivacySettings");
      return;
    }
    if (id === "notifications") {
      navigation.navigate("NotificationSettings");
      return;
    }
    if (id === "help") {
      navigation.navigate("HelpSupport");
      return;
    }
    if (id === "logout") {
      handleLogout();
      return;
    }
    console.log(`${id} pressed`);
  };

  const handlePickTheme = (id: string) => {
    setSelectedThemeId(id);
    saveTheme(id);
    setThemeModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.statusBarStyle === "light" ? "light-content" : "dark-content"}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Profile
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              Your anonymous identity
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={[styles.iconButton, { borderColor: colors.border }]}
              activeOpacity={0.75}
              onPress={toggleTheme}
            >
              <Ionicons
                name={mode === "dark" ? "moon" : "sunny"}
                size={18}
                color={mode === "dark" ? "#C4B5FD" : "#F59E0B"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, { borderColor: colors.border }]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate("Settings")}
            >
              <Ionicons name="settings-outline" size={18} color={colors.primaryLight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Anonymous card */}
        <View
          style={[
            styles.anonCard,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
          <View style={styles.anonTopRow}>
            <View
              style={[
                styles.avatarRing,
                {
                  borderColor: selectedTheme.color,
                  shadowColor: selectedTheme.color,
                },
              ]}
            >
              <Image source={selectedTheme.image} style={styles.avatarImage} />
            </View>

            <View style={styles.anonTextWrap}>
              <Text style={[styles.anonTitle, { color: colors.text }]}>
                Anonymous
              </Text>

              <View
                style={[
                  styles.anonBadge,
                  { borderColor: `${selectedTheme.color}80` },
                ]}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={12}
                  color={selectedTheme.color}
                />
                <Text
                  style={[styles.anonBadgeText, { color: selectedTheme.color }]}
                >
                  100% Anonymous
                </Text>
              </View>
            </View>
          </View>

          <Text style={[styles.anonTagline, { color: colors.textSecondary }]}>
            No identity. Just conversations.{"\n"}That's the way it should be.
          </Text>

          <View style={{ height: 18 }} />

          <View style={[styles.featureRow, { borderColor: colors.border }]}>
            {profileFeatures.map((feature) => (
              <View key={feature.title} style={styles.featureItem}>
                <Ionicons
                  name={feature.icon as any}
                  size={20}
                  color={colors.primaryLight}
                />
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text
                  style={[styles.featureSubtitle, { color: colors.textSecondary }]}
                >
                  {feature.subtitle}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Banner card */}
        <TouchableOpacity
          style={[styles.bannerCard, { borderColor: colors.border }]}
          activeOpacity={0.85}
          onPress={() => setScoreModalVisible(true)}
        >
          <View style={styles.orbitWrap}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.orbitPulseRing,
                {
                  borderColor: `${selectedTheme.color}90`,
                  transform: [{ scale: ringScale }],
                  opacity: ringOpacity,
                },
              ]}
            />
            <Animated.View
              pointerEvents="none"
              style={[
                styles.orbitDotsRing,
                { transform: [{ rotate: orbitSpin }] },
              ]}
            >
              <View
                style={[
                  styles.orbitTinyDot,
                  {
                    top: -2,
                    backgroundColor: selectedTheme.color,
                    shadowColor: selectedTheme.color,
                  },
                ]}
              />
              <View
                style={[
                  styles.orbitTinyDot,
                  {
                    bottom: -2,
                    backgroundColor: selectedTheme.color,
                    shadowColor: selectedTheme.color,
                  },
                ]}
              />
            </Animated.View>
            <LinearGradient
              colors={[selectedTheme.color, darkenHex(selectedTheme.color, 0.35)]}
              start={{ x: 0.15, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={[styles.orbitGradientCore, { shadowColor: selectedTheme.color }]}
            >
              <View style={styles.orbitGlassHighlight} />
              <Ionicons
                name="shield-checkmark"
                size={26}
                color={selectedTheme.id === "white" ? "#1F2937" : "#F5F3FF"}
              />
            </LinearGradient>
          </View>

          <View style={styles.bannerTextWrap}>
            <Text style={[styles.bannerTitle, { color: colors.text }]}>
              Be Real. Stay Anonymous.
            </Text>
            <Text style={[styles.bannerSubtitle, { color: colors.textSecondary }]}>
              The best conversations happen{"\n"}when no one knows who you
              are.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Account section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>

        <View style={[styles.accountCard, { borderColor: colors.border }]}>
          {accountItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.accountRow,
                { borderBottomColor: colors.border },
                index === accountItems.length - 1 && styles.accountRowLast,
              ]}
              activeOpacity={0.75}
              onPress={() => handleAccountPress(item.id)}
            >
              <View
                style={[
                  styles.accountIconWrap,
                  item.destructive && styles.accountIconWrapDestructive,
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={item.destructive ? "#F87171" : colors.primaryLight}
                />
              </View>

              <View style={styles.accountTextWrap}>
                <Text
                  style={[
                    styles.accountTitle,
                    { color: colors.text },
                    item.destructive && styles.accountTitleDestructive,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={[styles.accountSubtitle, { color: colors.textSecondary }]}>
                  {item.subtitle}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={item.destructive ? "#F87171" : colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNavWrap}>
        <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="home-outline" size={22} color="#6B7280" />
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Vault")}
          >
            <Ionicons name="archive-outline" size={22} color="#6B7280" />
            <Text style={styles.navLabel}>Vault</Text>
          </TouchableOpacity>

          <View style={styles.navCenterWrap}>
            <TouchableOpacity
              style={[styles.navCenterButton, { backgroundColor: colors.surface }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("XP")}
            >
              <Image
                source={require("../../../assets/images/ranchat-logo.png")}
                style={styles.navCenterLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Notifications")}
          >
            <View>
              <Ionicons name="notifications-outline" size={22} color="#6B7280" />
              {hasUnreadAlerts && <View style={styles.navBadgeDot} />}
            </View>
            <Text style={styles.navLabel}>Alerts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} activeOpacity={0.75}>
            <Ionicons name="person" size={22} color="#A78BFA" />
            <Text style={[styles.navLabel, styles.navLabelActive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Theme Picker Modal */}
      <Modal
        visible={themeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setThemeModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalSheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={styles.modalHandle} />
                <Text style={[styles.modalTitle, { color: colors.text }]}>Choose Your Theme</Text>
                <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                  Your profile picture will match the color you pick
                </Text>

                <View style={styles.themeOptionsRow}>
                  {themeOptions.map((theme) => {
                    const active = theme.id === selectedThemeId;
                    return (
                      <TouchableOpacity
                        key={theme.id}
                        style={styles.themeOption}
                        activeOpacity={0.8}
                        onPress={() => handlePickTheme(theme.id)}
                      >
                        <View
                          style={[
                            styles.themeOptionRing,
                            active && styles.themeOptionRingActive,
                            {
                              borderColor: active
                                ? theme.color
                                : "transparent",
                              shadowColor: theme.color,
                            },
                          ]}
                        >
                          <Image
                            source={theme.image}
                            style={styles.themeOptionImage}
                          />

                          {active && (
                            <View
                              style={[
                                styles.themeCheckDot,
                                { backgroundColor: theme.color },
                              ]}
                            >
                              <Ionicons
                                name="checkmark"
                                size={10}
                                color="#050505"
                              />
                            </View>
                          )}
                        </View>

                        <Text
                          style={[
                            styles.themeOptionLabel,
                            active && styles.themeOptionLabelActive,
                          ]}
                        >
                          {theme.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Anonymous Score Modal */}
      <Modal
        visible={scoreModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setScoreModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setScoreModalVisible(false)}>
          <View style={styles.scoreOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.scoreCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <LinearGradient
                  colors={["#34D399", "#059669"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.scoreShieldCircle}
                >
                  <Ionicons name="shield-checkmark" size={40} color="#FFFFFF" />
                </LinearGradient>

                <Text style={styles.scoreLevelLabel}>ANONYMOUS LEVEL</Text>
                <Text style={styles.scorePercent}>100%</Text>
                <Text style={[styles.scoreCaption, { color: colors.text }]}>
                  Identity Protected
                </Text>

                <View style={styles.scoreChecklist}>
                  {[
                    "No real name ever collected",
                    "No phone number required",
                    "No profile photo shown to others",
                    "Random anonymous name per session",
                  ].map((item) => (
                    <View key={item} style={styles.scoreChecklistRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#34D399"
                      />
                      <Text
                        style={[
                          styles.scoreChecklistText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.scoreCloseButton}
                  activeOpacity={0.85}
                  onPress={() => setScoreModalVisible(false)}
                >
                  <Text style={styles.scoreCloseButtonText}>Nice</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ConfirmModal
        visible={logoutModalVisible}
        title="Log Out"
        message="Are you sure you want to sign out?"
        confirmText="Log Out"
        destructive
        icon="log-out-outline"
        onConfirm={confirmLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </SafeAreaView>
  );
}