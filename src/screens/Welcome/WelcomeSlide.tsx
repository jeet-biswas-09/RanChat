import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { WelcomeSlideData } from "./data";
import { styles } from "./styles";

const { width } = Dimensions.get("window");

type Props = {
  item: WelcomeSlideData;
  onContinueEmail?: () => void;
  onContinueGoogle?: () => void;
  onContinueAnonymous?: () => void;
  onLogin?: () => void;
};

const useLoop = (duration: number, easing = Easing.linear) => {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver: true,
      })
    ).start();
  }, [value, duration, easing]);
  return value;
};

const usePulse = (duration: number) => {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [value, duration]);
  return value;
};

const BrandSlide = () => (
  <View style={[styles.slide, { width }]}>
    <View style={styles.logoContainer}>
      <View style={styles.logoGlow} />
      <Image
        source={require("../../../assets/images/ranchat-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>

    <Text style={styles.welcome}>WELCOME TO</Text>

    <Text style={styles.title}>
      <Text style={styles.white}>RAN</Text>
      <Text style={styles.purple}>CHAT</Text>
    </Text>

    <Text style={styles.subtitle}>
      Anonymous messaging{"\n"}for secret conversations.
    </Text>
  </View>
);

const IdentitySlide = () => {
  const rotate = useLoop(16000);
  const pulse = usePulse(2400);
  const scan = useLoop(2600, Easing.inOut(Easing.ease));

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.5],
  });

  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0],
  });

  const scanTranslate = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [-84, 84],
  });

  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.shieldWrapper}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.pulseRing,
            { transform: [{ scale: ringScale }], opacity: ringOpacity },
          ]}
        />

        <Animated.View
          pointerEvents="none"
          style={[styles.orbitRing, { transform: [{ rotate: spin }] }]}
        >
          <View style={[styles.orbitDot, { top: -3 }]} />
          <View style={[styles.orbitDot, { bottom: -3 }]} />
        </Animated.View>

        <LinearGradient
          colors={["#6C2BFF", "#2E1065"]}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.shieldGradient}
        >
          <Ionicons
            name="person"
            size={70}
            color="rgba(255,255,255,0.14)"
            style={styles.silhouette}
          />

          <Ionicons name="shield-checkmark" size={78} color="#F5F3FF" />

          <View style={styles.scanClip} pointerEvents="none">
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanTranslate }] },
              ]}
            />
          </View>
        </LinearGradient>
      </View>

      <Text style={styles.identityTitle}>Your Identity. Your Choice.</Text>
      <Text style={styles.identitySubtitle}>
        We never reveal your identity to other users. Chat with confidence
        while staying in control.
      </Text>
    </View>
  );
};

type Badge = {
  icon: string;
  title: string;
  description: string;
  position: "badgeTopLeft" | "badgeTopRight" | "badgeBottomLeft" | "badgeBottomRight";
};

const badges: Badge[] = [
  {
    icon: "lock-closed",
    title: "100% Anonymous",
    description: "Your identity stays private.",
    position: "badgeTopLeft",
  },
  {
    icon: "people",
    title: "Meet Anyone",
    description: "Connect with new people anytime.",
    position: "badgeTopRight",
  },
  {
    icon: "shield-checkmark",
    title: "Safe & Secure",
    description: "AI protection keeps you safe.",
    position: "badgeBottomLeft",
  },
  {
    icon: "flash",
    title: "Instant Chats",
    description: "No waiting. Just real conversations.",
    position: "badgeBottomRight",
  },
];

const BadgeCard = ({ icon, title, description, position }: Badge) => (
  <View style={[styles.badgeCard, styles[position]]}>
    <View style={styles.badgeIconWrap}>
      <Ionicons name={icon as any} size={16} color="#C4B5FD" />
    </View>
    <View style={styles.badgeTextWrap}>
      <Text style={styles.badgeTitle}>{title}</Text>
      <Text style={styles.badgeDescription}>{description}</Text>
    </View>
  </View>
);

const ConnectSlide = ({
  onContinueEmail,
  onContinueGoogle,
  onContinueAnonymous,
  onLogin,
}: Omit<Props, "item">) => (
  <View style={{ width, flex: 1 }}>
    <ScrollView
      style={styles.connectScroll}
      contentContainerStyle={styles.connectContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.connectWelcome}>• WELCOME TO •</Text>

      <Text style={styles.connectTitle}>
        <Text style={styles.white}>RAN</Text>
        <Text style={styles.purple}>CHAT</Text>
      </Text>

      <Text style={styles.connectSubtitle}>Talk Freely. Stay Anonymous.</Text>

      <View style={styles.heroSection}>
        {/* Drop your generated hooded-figure artwork at this path */}
        <Image
          source={require("../../../assets/images/welcome-hero.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />

        {badges.map((badge) => (
          <BadgeCard key={badge.title} {...badge} />
        ))}
      </View>

      <View style={styles.getStartedRow}>
        <View style={styles.getStartedLine} />
        <Text style={styles.getStartedTitle}>Let's Get Started</Text>
        <View style={styles.getStartedLine} />
      </View>
      <Text style={styles.getStartedSubtitle}>Choose a way to continue</Text>

      <TouchableOpacity
        style={styles.authButton}
        activeOpacity={0.85}
        onPress={onContinueEmail}
      >
        <LinearGradient
          colors={["#8B3BFF", "#3B6BFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.authButtonGradient}
        >
          <Ionicons
            name="mail-outline"
            size={18}
            color="#FFFFFF"
            style={styles.authButtonIcon}
          />
          <Text style={styles.authButtonText}>Continue with Email</Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color="#FFFFFF"
            style={styles.authButtonArrow}
          />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.authButton, styles.authButtonOutline]}
        activeOpacity={0.85}
        onPress={onContinueGoogle}
      >
        <Ionicons
          name="logo-google"
          size={18}
          color="#FFFFFF"
          style={styles.authButtonIcon}
        />
        <Text style={styles.authButtonText}>Continue with Google</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="#9CA3AF"
          style={styles.authButtonArrow}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.authButton, styles.authButtonOutline]}
        activeOpacity={0.85}
        onPress={onContinueAnonymous}
      >
        <Ionicons
          name="person-outline"
          size={18}
          color="#FFFFFF"
          style={styles.authButtonIcon}
        />
        <Text style={styles.authButtonText}>Continue Anonymously</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="#9CA3AF"
          style={styles.authButtonArrow}
        />
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Ionicons
          name="shield-checkmark-outline"
          size={14}
          color="#6B7280"
          style={styles.dividerIcon}
        />
        <View style={styles.dividerLine} />
      </View>

      <Text style={styles.termsText}>
        By continuing, you agree to our{" "}
        <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
        <Text style={styles.termsLink}>Privacy Policy</Text>.
      </Text>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={onLogin}>
          Log in
        </Text>
      </Text>
    </ScrollView>
  </View>
);

export default function WelcomeSlide({
  item,
  onContinueEmail,
  onContinueGoogle,
  onContinueAnonymous,
  onLogin,
}: Props) {
  switch (item.type) {
    case "brand":
      return <BrandSlide />;
    case "identity":
      return <IdentitySlide />;
    case "connect":
      return (
        <ConnectSlide
          onContinueEmail={onContinueEmail}
          onContinueGoogle={onContinueGoogle}
          onContinueAnonymous={onContinueAnonymous}
          onLogin={onLogin}
        />
      );
    default:
      return null;
  }
}
