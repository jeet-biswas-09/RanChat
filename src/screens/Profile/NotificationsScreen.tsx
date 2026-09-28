import React, { useEffect, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { getBoolSetting, saveBoolSetting } from "../../utils/settingsPreference";
import { settingsStyles as styles } from "./settingsStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Notifications">;

type ToggleKey =
  | "newMessages"
  | "classroomActivity"
  | "joinRequests"
  | "productUpdates";

const TOGGLES: {
  key: ToggleKey;
  icon: string;
  title: string;
  subtitle: string;
  defaultValue: boolean;
}[] = [
  {
    key: "newMessages",
    icon: "chatbubble-ellipses-outline",
    title: "New messages",
    subtitle: "Get notified when someone messages your classroom",
    defaultValue: true,
  },
  {
    key: "classroomActivity",
    icon: "school-outline",
    title: "Classroom activity",
    subtitle: "New members joining, code refreshed, etc.",
    defaultValue: true,
  },
  {
    key: "joinRequests",
    icon: "person-add-outline",
    title: "Join requests",
    subtitle: "When someone uses your classroom code",
    defaultValue: false,
  },
  {
    key: "productUpdates",
    icon: "sparkles-outline",
    title: "Product updates",
    subtitle: "New features and announcements from Ranchat",
    defaultValue: false,
  },
];

export default function NotificationsScreen({ navigation }: Props) {
  const [values, setValues] = useState<Record<ToggleKey, boolean>>({
    newMessages: true,
    classroomActivity: true,
    joinRequests: false,
    productUpdates: false,
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
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            Customize your notification preferences
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>ALERTS</Text>
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
          Note: actual push notifications need a bit more backend setup —
          these toggles save your preference for when that's wired up.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}