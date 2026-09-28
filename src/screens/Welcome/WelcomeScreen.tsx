import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { auth } from "../../services/firebase";
import { welcomeSlides } from "./data";
import WelcomeSlide from "./WelcomeSlide";
import { styles } from "./styles";
import ConfirmModal from "../../components/ConfirmModal";

const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList<any>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [googleError, setGoogleError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      } else {
        setCheckingAuth(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const isLast = activeIndex === welcomeSlides.length - 1;

  const handleNext = () => {
    listRef.current?.scrollToOffset({
      offset: (activeIndex + 1) * width,
      animated: true,
    });
  };

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  // TODO: wire these up once the real auth flow / screens exist
  const handleContinueEmail = () => {
    navigation.navigate("EmailAuth", { mode: "signup" });
  };

  const handleContinueGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      // The library's return shape changed across versions — handle both.
      const idToken =
        (response as any)?.data?.idToken ?? (response as any)?.idToken;

      if (!idToken) {
        console.log(
          "Google sign-in: no idToken in response",
          JSON.stringify(response)
        );
        setGoogleError(
          "Google didn't return an ID token. Check the console log for the raw response."
        );
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      navigation.replace("Home");
    } catch (e: any) {
      if (e?.code === statusCodes.SIGN_IN_CANCELLED) {
        // user closed the picker — no error needed
        return;
      }
      console.log("Google sign-in error", JSON.stringify(e), e);
      setGoogleError(
        `${e?.code ?? "Error"}: ${e?.message ?? "Something went wrong signing in with Google."}`
      );
    }
  };

  const handleContinueAnonymous = async () => {
    try {
      await signInAnonymously(auth);
      navigation.replace("Home");
    } catch (e) {
      console.log("Anonymous sign-in failed", e);
    }
  };

  const handleLogin = () => {
    navigation.navigate("EmailAuth", { mode: "login" });
  };

  if (checkingAuth) {
    return (
      <SafeAreaView style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator color="#A78BFA" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />

      <Animated.FlatList
        ref={listRef}
        data={welcomeSlides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumEnd}
        renderItem={({ item }) => (
          <WelcomeSlide
            item={item}
            onContinueEmail={handleContinueEmail}
            onContinueGoogle={handleContinueGoogle}
            onContinueAnonymous={handleContinueAnonymous}
            onLogin={handleLogin}
          />
        )}
      />

      <View style={styles.footerFixed}>
        <View style={styles.dots}>
          {welcomeSlides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 22, 8],
              extrapolate: "clamp",
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.35, 1, 0.35],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
              />
            );
          })}
        </View>

        {/* Slides 1 & 2 show the shared Next button. Slide 3 has its own
            action buttons, so the shared CTA is hidden there. */}
        {!isLast && (
          <>
            <TouchableOpacity activeOpacity={0.85} onPress={handleNext}>
              <LinearGradient
                colors={["#6C2BFF", "#9A3FFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footer}>
              Your identity. Your rules. Always private.
            </Text>
          </>
        )}
      </View>

      <ConfirmModal
        visible={!!googleError}
        title="Google Sign-In Failed"
        message={googleError ?? ""}
        confirmText="OK"
        hideCancel
        destructive
        icon="alert-circle-outline"
        onConfirm={() => setGoogleError(null)}
        onCancel={() => setGoogleError(null)}
      />
    </SafeAreaView>
  );
}