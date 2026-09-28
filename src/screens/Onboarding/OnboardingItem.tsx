import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import { OnboardingSlide } from "./data";
import { styles } from "./styles";

const { width } = Dimensions.get("window");

type Props = {
  item: OnboardingSlide;
  index: number;
  scrollX: Animated.Value;
};

const OrbRings = () => {
  const rotate = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 14000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotate, pulse]);

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

  return (
    <>
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
    </>
  );
};

export default function OnboardingItem({ item, index, scrollX }: Props) {
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.72, 1, 0.72],
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.25, 1, 0.25],
    extrapolate: "clamp",
  });

  const rotateY = scrollX.interpolate({
    inputRange,
    outputRange: ["45deg", "0deg", "-45deg"],
    extrapolate: "clamp",
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [40, 0, 40],
    extrapolate: "clamp",
  });

  const textTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [24, 0, 24],
    extrapolate: "clamp",
  });

  const textOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.slide, { width }]}>
      <Animated.View
        style={[
          styles.orbWrapper,
          {
            opacity,
            transform: [
              { perspective: 900 },
              { scale },
              { rotateY },
              { translateY },
            ],
          },
        ]}
      >
        <OrbRings />

        <LinearGradient
          colors={item.gradient}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.orbGradient}
        >
          <View style={styles.orbInnerShadowTop} />
          <View style={styles.orbGlassHighlight} />
          <Ionicons name={item.icon as any} size={64} color="#F5F3FF" />
        </LinearGradient>
      </Animated.View>

      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslateY }],
          width: "100%",
        }}
      >
        <BlurView intensity={30} tint="dark" style={styles.textCard}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </BlurView>
      </Animated.View>
    </View>
  );
}
