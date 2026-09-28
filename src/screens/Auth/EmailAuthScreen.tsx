import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { auth } from "../../services/firebase";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "EmailAuth">;

function friendlyAuthError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered. Try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function EmailAuthScreen({ navigation, route }: Props) {
  const [mode, setMode] = useState<"signup" | "login">(
    route.params?.mode ?? "signup"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
      }
      navigation.replace("Home");
    } catch (e: any) {
      setError(friendlyAuthError(e?.code ?? ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.iconCircleLarge}>
            <Ionicons name="mail-outline" size={32} color="#C4B5FD" />
          </View>

          <Text style={styles.title}>
            {isSignup ? "Create Your Account" : "Welcome Back"}
          </Text>
          <Text style={styles.subtitle}>
            {isSignup
              ? "Sign up with your email to get started with Ranchat."
              : "Log in with your email to continue."}
          </Text>

          <Text style={styles.inputLabel}>EMAIL</Text>
          <TextInput
            style={styles.textInput}
            placeholder="you@example.com"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <Text style={styles.inputLabel}>PASSWORD</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((s) => !s)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHint}>
            {isSignup ? "At least 6 characters" : " "}
          </Text>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!email.trim() || !password || loading) &&
                styles.primaryButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!email.trim() || !password || loading}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={["#8B3BFF", "#3B6BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButtonGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>
                    {isSignup ? "Sign Up" : "Log In"}
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.switchModeRow}>
            <Text style={styles.switchModeText}>
              {isSignup ? "Already have an account? " : "New to Ranchat? "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setError("");
                setMode(isSignup ? "login" : "signup");
              }}
            >
              <Text style={styles.switchModeLink}>
                {isSignup ? "Log in" : "Sign up"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}