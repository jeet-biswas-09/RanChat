import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { deleteUser } from "firebase/auth";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { auth } from "../../services/firebase";
import { settingsStyles as styles } from "./settingsStyles";
import ConfirmModal from "../../components/ConfirmModal";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const RULES = [
  "Be respectful. No harassment, hate speech, or bullying — anonymity is not an excuse to hurt others.",
  "Stay anonymous. Don't try to reveal, guess, or expose another member's real identity.",
  "No spam or self-promotion inside classroom chats.",
  "Don't share illegal, explicit, or harmful content of any kind.",
  "Classroom codes are for your classmates only — don't post them publicly.",
  "Report anything that makes you uncomfortable using Help & Support.",
  "Breaking these rules can lead to your account being suspended or removed.",
];

export default function SettingsScreen({ navigation }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errorModal, setErrorModal] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const handleDeleteAccount = () => {
    setConfirmVisible(true);
  };

  const performDelete = async () => {
    setConfirmVisible(false);
    const user = auth.currentUser;
    if (!user) {
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
      return;
    }

    setDeleting(true);
    try {
      await deleteUser(user);
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
    } catch (e: any) {
      setDeleting(false);
      if (e?.code === "auth/requires-recent-login") {
        setErrorModal({
          title: "Please log in again",
          message:
            "For your security, log out and log back in, then try deleting your account again.",
        });
      } else {
        setErrorModal({
          title: "Something went wrong",
          message: "Couldn't delete your account. Please try again.",
        });
      }
    }
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
        <View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Rules and account controls</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>RULES</Text>
        <View style={styles.card}>
          {RULES.map((rule, index) => (
            <View
              key={rule}
              style={[
                styles.toggleRow,
                index === RULES.length - 1 && styles.toggleRowLast,
              ]}
            >
              <View style={styles.toggleIconWrap}>
                <Text style={{ color: "#C4B5FD", fontWeight: "800" }}>
                  {index + 1}
                </Text>
              </View>
              <View style={styles.toggleTextWrap}>
                <Text style={styles.toggleSubtitle}>{rule}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>DANGER ZONE</Text>
        <TouchableOpacity
          style={[
            styles.card,
            {
              borderColor: "rgba(248,113,113,0.35)",
              paddingVertical: 14,
              paddingHorizontal: 14,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
          activeOpacity={0.75}
          onPress={handleDeleteAccount}
          disabled={deleting}
        >
          <View
            style={[
              styles.toggleIconWrap,
              { backgroundColor: "rgba(248,113,113,0.12)" },
            ]}
          >
            <Ionicons name="trash-outline" size={18} color="#F87171" />
          </View>
          <View style={styles.toggleTextWrap}>
            <Text style={[styles.toggleTitle, { color: "#F87171" }]}>
              {deleting ? "Deleting..." : "Delete Account"}
            </Text>
            <Text style={styles.toggleSubtitle}>
              Permanently remove your account and identity
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#F87171" />
        </TouchableOpacity>

        <Text style={styles.versionText}>
          Deleting your account removes your login. Classroom data cleanup
          is still being worked on.
        </Text>
      </ScrollView>

      <ConfirmModal
        visible={confirmVisible}
        title="Delete Account"
        message="This will permanently delete your account. This action cannot be undone."
        confirmText="Delete"
        destructive
        icon="trash-outline"
        onConfirm={performDelete}
        onCancel={() => setConfirmVisible(false)}
      />

      <ConfirmModal
        visible={!!errorModal}
        title={errorModal?.title ?? ""}
        message={errorModal?.message ?? ""}
        confirmText="OK"
        hideCancel
        icon="alert-circle-outline"
        onConfirm={() => setErrorModal(null)}
        onCancel={() => setErrorModal(null)}
      />
    </SafeAreaView>
  );
}