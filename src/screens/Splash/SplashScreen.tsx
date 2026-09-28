import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Animated,
  Easing,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";

const { width, height } = Dimensions.get("window");

const COLORS = {
  background: "#050505",
  primary: "#8B5CF6",
  primaryLight: "#A78BFA",
  primaryDark: "#6D28D9",
  white: "#FFFFFF",
  grey: "#9CA3AF",
  greyDark: "#6B7280",
};

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const Particles = () => {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      opacity: new Animated.Value(Math.random() * 0.4 + 0.2),
      size: Math.random() * 3 + 2,
      duration: 6000 + Math.random() * 4000,
    }))
  ).current;

  useEffect(() => {
    particles.forEach((particle) => {
      const loop = () => {
        particle.x.setValue(Math.random() * width);
        particle.y.setValue(height + 50);

        Animated.parallel([
          Animated.timing(particle.y, {
            toValue: -80,
            duration: particle.duration,
            useNativeDriver: true,
          }),

          Animated.timing(particle.x, {
            toValue: Math.random() * width,
            duration: particle.duration,
            useNativeDriver: true,
          }),

          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: 0.7,
              duration: particle.duration / 2,
              useNativeDriver: true,
            }),

            Animated.timing(particle.opacity, {
              toValue: 0.1,
              duration: particle.duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ]).start(loop);
      };

      setTimeout(loop, Math.random() * 2500);
    });
  }, [particles]);

  return (
    <View
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
    >
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const PulseRings = () => {
  const rings = useRef(
    [0, 1, 2].map((i) => ({
      scale: new Animated.Value(0.6),
      delay: i * 800,
    }))
  ).current;

  useEffect(() => {
    rings.forEach((ring) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(ring.delay),

          Animated.timing(ring.scale, {
            toValue: 1.8,
            duration: 2800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(ring.scale, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [rings]);

  return (
    <View
      style={styles.pulseRingsContainer}
      pointerEvents="none"
    >
      {rings.map((ring, index) => (
        <Animated.View
          key={index}
          style={[
            styles.pulseRing,
            {
              transform: [{ scale: ring.scale }],
              opacity: ring.scale.interpolate({
                inputRange: [0.6, 1.8],
                outputRange: [0.35, 0],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

const OrbitDots = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotate]);

  const orbitRotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.orbitContainer,
        {
          transform: [{ rotate: orbitRotation }],
        },
      ]}
    >
      <View style={[styles.orbitDot, { top: 0, left: 108 }]} />
      <View style={[styles.orbitDot, { bottom: 0, left: 108 }]} />
      <View style={[styles.orbitDot, { left: 0, top: 108 }]} />
      <View style={[styles.orbitDot, { right: 0, top: 108 }]} />
    </Animated.View>
  );
};

const LoadingBar: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onComplete();
      }
    });

    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [onComplete, progress, shimmer]);

  const widthAnim = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.loadingWrapper}>
      <View style={styles.loadingTrack}>
        <Animated.View
          style={[
            styles.loadingFill,
            {
              width: widthAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.loadingShimmer,
              {
                transform: [
                  {
                    translateX: shimmer.interpolate({
                      inputRange: [-1, 1],
                      outputRange: [-60, 180],
                    }),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </View>

      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};


  export default function SplashScreen({ navigation }: Props) {

  const logoScale = useRef(new Animated.Value(0.45)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;

  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleY = useRef(new Animated.Value(20)).current;

  const loadingOpacity = useRef(new Animated.Value(0)).current;

  const exitOpacity = useRef(new Animated.Value(1)).current;
  const exitScale = useRef(new Animated.Value(1)).current;

  const [loadingFinished, setLoadingFinished] = useState(false);

  const goNext = useCallback(() => {
    Animated.parallel([
      Animated.timing(exitOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(exitScale, {
        toValue: 0.92,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace("Welcome");
    });
  }, [navigation, exitOpacity, exitScale]);

  useEffect(() => {
    if (loadingFinished) {
      const timer = setTimeout(goNext, 300);
      return () => clearTimeout(timer);
    }
  }, [loadingFinished, goNext]);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 55,
          useNativeDriver: true,
        }),

        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.spring(titleY, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.spring(subtitleY, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.backgroundGlow} />

      <Particles />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: exitOpacity,
            transform: [{ scale: exitScale }],
          },
        ]}
      >
        <View style={styles.logoArea}>
          <PulseRings />

          <OrbitDots />

          <Animated.View
            style={[
              styles.logoWrapper,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/ranchat-logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleY }],
          }}
        >
          <Text style={styles.title}>Ranchat</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: subtitleOpacity,
            transform: [{ translateY: subtitleY }],
          }}
        >
          <Text style={styles.subtitle}>
            Private <Text style={styles.bullet}>•</Text> Secure{" "}
            <Text style={styles.bullet}>•</Text> Anonymous
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: loadingOpacity,
            marginTop: 40,
          }}
        >
          <LoadingBar
            onComplete={() => setLoadingFinished(true)}
          />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundGlow: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: COLORS.primary,
    opacity: 0.08,
    alignSelf: "center",
  },

  particle: {
    position: "absolute",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 50,
  },

  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logoArea: {
    width: 230,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  pulseRingsContainer: {
    position: "absolute",
    width: 230,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
  },

  pulseRing: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1.5,
    borderColor: "rgba(139,92,246,0.20)",
  },

  orbitContainer: {
    position: "absolute",
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },

  orbitDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primaryLight,

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,

    elevation: 8,
  },

  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 25,

    elevation: 15,
  },

  logoImage: {
    width: 120,
    height: 120,
  },

  title: {
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: -1,
    marginTop: 8,
  },

  subtitle: {
    marginTop: 10,
    color: COLORS.grey,
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  bullet: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  loadingWrapper: {
    alignItems: "center",
    marginTop: 10,
  },

  loadingTrack: {
    width: 150,
    height: 4,
    backgroundColor: "rgba(139,92,246,0.15)",
    borderRadius: 4,
    overflow: "hidden",
  },

  loadingFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    overflow: "hidden",
  },

  loadingShimmer: {
    position: "absolute",
    width: 60,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  loadingText: {
    marginTop: 12,
    color: COLORS.greyDark,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
