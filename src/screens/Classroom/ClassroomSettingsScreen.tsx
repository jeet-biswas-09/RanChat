import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, onSnapshot } from "firebase/firestore";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import {
  setScreenshotBlock,
  setMessagingDisabledUntil,
  deleteClassroom,
} from "../../utils/classroomActions";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ClassroomSettings">;

export default function ClassroomSettingsScreen({ navigation, route }: Props) {
  const { classroomId, classroomName } = route.params;

  const [screenshotsBlocked, setScreenshotsBlockedState] = useState(false);
  const [messagingDisabledUntil, setMessagingDisabledUntilState] = useState<
    number | null
  >(null);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [customHours, setCustomHours] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "classrooms", classroomId), (snap) => {
      const data = snap.data();
      if (data) {
        setScreenshotsBlockedState(!!data.screenshotsBlocked);
        setMessagingDisabledUntilState(data.messagingDisabledUntil ?? null);
      }
    });
    return unsubscribe;
  }, [classroomId]);

  const isMessagingDisabled =
    !!messagingDisabledUntil && messagingDisabledUntil > Date.now();

  const handleToggleScreenshots = async (value: boolean) => {
    setScreenshotsBlockedState(value);
    await setScreenshotBlock(classroomId, value);
  };

  const handlePauseFor = async (hours: number) => {
    const until = Date.now() + hours * 60 * 60 * 1000;
    await setMessagingDisabledUntil(classroomId, until);
  };

  const handleCustomConfirm = async () => {
    const hours = parseFloat(customHours);
    if (!hours || hours <= 0) {
      setCustomModalVisible(false);
      return;
    }
    await handlePauseFor(hours);
    setCustomModalVisible(false);
    setCustomHours("");
  };

  const handleResumeMessaging = async () => {
    await setMessagingDisabledUntil(classroomId, null);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Classroom",
      `This will permanently delete "${classroomName}" and all its messages. This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteClassroom(classroomId);
              navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            } catch (e) {
              setDeleting(false);
              Alert.alert("Something went wrong", "Please try again.");
            }
          },
        },
      ]
    );
  };

  const formatUntil = (ms: number) => {
    const d = new Date(ms);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
          <Text style={styles.headerTitle}>Classroom Settings</Text>
          <Text style={styles.headerSubtitle}>{classroomName}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.settingsScroll}>
        <Text style={styles.sectionLabel}>PRIVACY</Text>
        <View style={styles.settingsCard}>
          <View style={[styles.settingsRow, styles.settingsRowLast]}>
            <View style={styles.settingsIconWrap}>
              <Ionicons name="lock-closed-outline" size={18} color="#C4B5FD" />
            </View>
            <View style={styles.settingsTextWrap}>
              <Text style={styles.settingsTitle}>Block screenshots</Text>
              <Text style={styles.settingsSubtitle}>
                Applies to everyone in this classroom's chat
              </Text>
            </View>
            <Switch
              value={screenshotsBlocked}
              onValueChange={handleToggleScreenshots}
              trackColor={{ false: "#3F3F46", true: "#8B5CF6" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.sectionLabel}>MESSAGING</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsIconWrap}>
              <Ionicons name="pause-circle-outline" size={18} color="#C4B5FD" />
            </View>
            <View style={styles.settingsTextWrap}>
              <Text style={styles.settingsTitle}>Turn off messaging</Text>
              <Text style={styles.settingsSubtitle}>
                Temporarily stop everyone from sending messages
              </Text>
            </View>
          </View>

          {isMessagingDisabled && (
            <View style={styles.disabledBanner}>
              <Ionicons name="time-outline" size={16} color="#FBBF24" />
              <Text style={styles.disabledBannerText}>
                Messaging paused until {formatUntil(messagingDisabledUntil!)}
              </Text>
              <TouchableOpacity onPress={handleResumeMessaging}>
                <Text style={{ color: "#FBBF24", fontWeight: "700", fontSize: 12 }}>
                  Turn on
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.durationRow}>
            <TouchableOpacity
              style={styles.durationChip}
              activeOpacity={0.8}
              onPress={() => handlePauseFor(1)}
            >
              <Text style={styles.durationChipText}>1 Hour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.durationChip}
              activeOpacity={0.8}
              onPress={() => handlePauseFor(3)}
            >
              <Text style={styles.durationChipText}>3 Hours</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.durationChip, { marginRight: 0 }]}
              activeOpacity={0.8}
              onPress={() => setCustomModalVisible(true)}
            >
              <Text style={styles.durationChipText}>Custom</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionLabel}>DANGER ZONE</Text>
        <TouchableOpacity
          style={[
            styles.settingsCard,
            { borderColor: "rgba(248,113,113,0.35)" },
          ]}
          activeOpacity={0.8}
          onPress={handleDelete}
          disabled={deleting}
        >
          <View style={styles.dangerRow}>
            <View style={styles.dangerIconWrap}>
              <Ionicons name="trash-outline" size={18} color="#F87171" />
            </View>
            <Text style={styles.dangerTitle}>
              {deleting ? "Deleting..." : "Delete Classroom"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom duration modal */}
      <Modal
        visible={customModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCustomModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setCustomModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.65)",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 32,
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#0D0D10",
                  borderWidth: 1,
                  borderColor: "rgba(139,92,246,0.3)",
                  borderRadius: 20,
                  padding: 22,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "800",
                    marginBottom: 6,
                  }}
                >
                  Custom duration
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 12.5, marginBottom: 16 }}>
                  Enter the number of hours to pause messaging for
                </Text>

                <TextInput
                  value={customHours}
                  onChangeText={setCustomHours}
                  placeholder="e.g. 6"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1.3,
                    borderColor: "rgba(139,92,246,0.3)",
                    borderRadius: 14,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    color: "#FFFFFF",
                    fontSize: 15,
                    marginBottom: 18,
                  }}
                />

                <TouchableOpacity
                  style={{
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#8B5CF6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  activeOpacity={0.85}
                  onPress={handleCustomConfirm}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "700" }}>
                    Pause Messaging
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}