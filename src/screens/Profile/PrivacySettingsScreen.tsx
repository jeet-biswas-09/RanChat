import React, { useEffect, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { getBoolSetting, saveBoolSetting } from "../../utils/settingsPreference";
import { settingsStyles as styles } from "./settingsStyles";

type Props = NativeStackScreenProps<RootStackParamList, "PrivacySettings">;

type ToggleKey =
  | "allowClassroomInvites"
  | "showActiveStatus"
  | "readReceipts"
  | "blockScreenshots";

const TOGGLES: {
  key: ToggleKey;
  icon: string;
  title: string;
  subtitle: string;
  defaultValue: boolean;
}[] = [
  {
    key: "allowClassroomInvites",
    icon: "people-outline",
    title: "Allow classroom invites",
    subtitle: "Anyone with your code can add you to a classroom",
    defaultValue: true,
  },
  {
    key: "showActiveStatus",
    icon: "radio-outline",
    title: "Show active status",
    subtitle: "Let others see when you're online in a chat",
    defaultValue: false,
  },
  {
    key: "readReceipts",
    icon: "checkmark-done-outline",
    title: "Read receipts",
    subtitle: "Show others when you've seen their message",
    defaultValue: false,
  },
  {
    key: "blockScreenshots",
    icon: "lock-closed-outline",
    title: "Block screenshots in chat",
    subtitle: "Extra layer of privacy for anonymous conversations",
    defaultValue: false,
  },
];

export default function PrivacySettingsScreen({ navigation }: Props) {
  const [values, setValues] = useState<Record<ToggleKey, boolean>>({
    allowClassroomInvites: true,
    showActiveStatus: false,
    readReceipts: false,
    blockScreenshots: false,
  });

  useEffect(() => {
    (async () => {
      const loaded: Partial<Record<ToggleKey, boolean>> = {};
      for (const t of TOGGLES) {
        loaded[t.key] = await getBoolSetting(t.key, t.defaultValue);
      }
      setValues((prev) => ({ ...prev, ...loaded }));
    })();
  }, []);

  const handleToggle = async (key: ToggleKey, value: boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    await saveBoolSetting(key, value);
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
          <Text style={styles.headerTitle}>Privacy Settings</Text>
          <Text style={styles.headerSubtitle}>
            Manage who can interact with you
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>INTERACTIONS</Text>
        <View style={styles.card}>
          {TOGGLES.map((t, index) => (
            <View
              key={t.key}
              style={[
                styles.toggleRow,
                index === TOGGLES.length - 1 && styles.toggleRowLast,
              ]}
            >
              <View style={styles.toggleIconWrap}>
                <Ionicons name={t.icon as any} size={18} color="#C4B5FD" />
              </View>
              <View style={styles.toggleTextWrap}>
                <Text style={styles.toggleTitle}>{t.title}</Text>
                <Text style={styles.toggleSubtitle}>{t.subtitle}</Text>
              </View>
              <Switch
                value={values[t.key]}
                onValueChange={(v) => handleToggle(t.key, v)}
                trackColor={{ false: "#3F3F46", true: "#8B5CF6" }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </View>

        <Text style={styles.versionText}>
          Your identity stays anonymous regardless of these settings.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}