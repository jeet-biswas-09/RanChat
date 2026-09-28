import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Clipboard from "expo-clipboard";
import * as ScreenCapture from "expo-screen-capture";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  addDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import { getAnonymousIdentity } from "../../utils/anonymousIdentity";
import { markClassroomSeen } from "../../utils/unreadTracking";
import { getBoolSetting } from "../../utils/settingsPreference";
import { leaveClassroom } from "../../utils/classroomActions";
import { colorForClassroom } from "../Home/data";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: number;
};

export default function ChatScreen({ navigation, route }: Props) {
  const { classroomId, classroomName, classroomCode } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [identity, setIdentity] = useState<{
    userId: string;
    userName: string;
  } | null>(null);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [classPhoto, setClassPhoto] = useState<string | null>(null);
  const [classScreenshotsBlocked, setClassScreenshotsBlocked] = useState(false);
  const [messagingDisabledUntil, setMessagingDisabledUntil] = useState<
    number | null
  >(null);
  const [infoMenuVisible, setInfoMenuVisible] = useState(false);
  const listRef = useRef<FlatList>(null);

  const isOwner = !!identity && identity.userId === ownerId;
  const isMessagingDisabled =
    !!messagingDisabledUntil && messagingDisabledUntil > Date.now();

  useEffect(() => {
    getAnonymousIdentity().then(setIdentity);
  }, []);

  // Listen to the classroom doc for owner controls (screenshot block,
  // paused messaging, ownership check for the info menu).
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "classrooms", classroomId), (snap) => {
      const data = snap.data();
      if (data) {
        setOwnerId(data.ownerId ?? null);
        setClassPhoto(data.photoBase64 ?? null);
        setClassScreenshotsBlocked(!!data.screenshotsBlocked);
        setMessagingDisabledUntil(data.messagingDisabledUntil ?? null);
      }
    });
    return unsubscribe;
  }, [classroomId]);

  useFocusEffect(
    React.useCallback(() => {
      let active = true;

      getBoolSetting("blockScreenshots", false).then((personalSetting) => {
        if (active && (personalSetting || classScreenshotsBlocked)) {
          ScreenCapture.preventScreenCaptureAsync();
        }
      });

      return () => {
        active = false;
        ScreenCapture.allowScreenCaptureAsync();
      };
    }, [classScreenshotsBlocked])
  );

  useEffect(() => {
    const q = query(
      collection(db, "classrooms", classroomId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Message, "id">),
      }));
      setMessages(msgs);

      // The user is actively viewing this classroom, so any new
      // message that arrives counts as seen immediately.
      if (msgs.length > 0) {
        markClassroomSeen(classroomId, msgs[msgs.length - 1].createdAt);
      }
    });

    return unsubscribe;
  }, [classroomId]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || !identity || isMessagingDisabled) return;

    setInput("");

    try {
      await addDoc(collection(db, "classrooms", classroomId, "messages"), {
        text: trimmed,
        senderId: identity.userId,
        senderName: identity.userName,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.log("Failed to send message", e);
    }
  };

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(classroomCode);
  };

  const formatTime = (ms: number) => {
    const d = new Date(ms);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const goToSharedMedia = () => {
    setInfoMenuVisible(false);
    navigation.navigate("SharedMedia", { classroomId, classroomName });
  };

  const goToMembers = () => {
    setInfoMenuVisible(false);
    navigation.navigate("ClassroomMembers", { classroomId, classroomName });
  };

  const goToClassroomSettings = () => {
    setInfoMenuVisible(false);
    navigation.navigate("ClassroomSettings", { classroomId, classroomName });
  };

  const handleLeaveClassroom = () => {
    setInfoMenuVisible(false);
    Alert.alert(
      "Leave Classroom",
      `Are you sure you want to leave "${classroomName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "destructive",
          onPress: async () => {
            if (!identity) return;
            try {
              await leaveClassroom(classroomId, identity.userId);
              navigation.navigate("Home");
            } catch (e) {
              console.log("Failed to leave classroom", e);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMine = item.senderId === identity?.userId;

    return (
      <View
        style={[
          styles.bubbleRow,
          isMine ? styles.bubbleRowMine : styles.bubbleRowTheirs,
        ]}
      >
        {!isMine && (
          <Text style={styles.senderName}>{item.senderName}</Text>
        )}
        <View
          style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}
        >
          <Text style={styles.bubbleText}>{item.text}</Text>
        </View>
        <Text style={styles.bubbleTime}>{formatTime(item.createdAt)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: `${colorForClassroom(classroomId)}22`,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginRight: 10,
            }}
          >
            {classPhoto ? (
              <Image
                source={{ uri: classPhoto }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Ionicons
                name="school"
                size={17}
                color={colorForClassroom(classroomId)}
              />
            )}
          </View>

          <View style={styles.chatHeaderTextWrap}>
            <Text style={styles.chatHeaderTitle} numberOfLines={1}>
              {classroomName}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCopyCode}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.chatHeaderCode}>
                Code: {classroomCode}
              </Text>
              <Ionicons
                name="copy-outline"
                size={12}
                color="#A78BFA"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.chatHeaderIcon}
            activeOpacity={0.75}
            onPress={() => setInfoMenuVisible(true)}
          >
            <Ionicons name="information-outline" size={18} color="#C4B5FD" />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          ListEmptyComponent={
            <View style={styles.emptyChatWrap}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={40}
                color="#4B4B55"
              />
              <Text style={styles.emptyChatTitle}>No messages yet</Text>
              <Text style={styles.emptyChatSubtitle}>
                Say hello — everyone here is anonymous, so chat freely.
              </Text>
            </View>
          }
        />

        {isMessagingDisabled && (
          <View style={styles.disabledBanner}>
            <Ionicons name="pause-circle" size={16} color="#FBBF24" />
            <Text style={styles.disabledBannerText}>
              Messaging is paused by the classroom owner
            </Text>
          </View>
        )}

        <View style={styles.inputBar}>
          <TouchableOpacity
            style={styles.attachButton}
            activeOpacity={0.7}
            onPress={() =>
              console.log("Photo/video attach — coming soon (needs Storage)")
            }
          >
            <Ionicons name="image-outline" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TextInput
            style={styles.messageInput}
            placeholder={
              isMessagingDisabled ? "Messaging is paused" : "Type a message..."
            }
            placeholderTextColor="#6B7280"
            value={input}
            onChangeText={setInput}
            multiline
            editable={!isMessagingDisabled}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              (!input.trim() || isMessagingDisabled) && styles.sendButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={!input.trim() || isMessagingDisabled}
            onPress={handleSend}
          >
            <Ionicons name="send" size={18} color="#A78BFA" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Info Action Sheet */}
      <Modal
        visible={infoMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setInfoMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setInfoMenuVisible(false)}>
          <View style={styles.sheetOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.sheetContainer}>
                <View style={styles.sheetHandle} />

                <TouchableOpacity
                  style={styles.sheetItem}
                  activeOpacity={0.75}
                  onPress={goToSharedMedia}
                >
                  <View style={styles.sheetIconWrap}>
                    <Ionicons name="images-outline" size={18} color="#C4B5FD" />
                  </View>
                  <Text style={styles.sheetItemText}>Shared Media</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sheetItem}
                  activeOpacity={0.75}
                  onPress={goToMembers}
                >
                  <View style={styles.sheetIconWrap}>
                    <Ionicons name="people-outline" size={18} color="#C4B5FD" />
                  </View>
                  <Text style={styles.sheetItemText}>Members</Text>
                </TouchableOpacity>

                {isOwner && (
                  <TouchableOpacity
                    style={styles.sheetItem}
                    activeOpacity={0.75}
                    onPress={goToClassroomSettings}
                  >
                    <View style={styles.sheetIconWrap}>
                      <Ionicons
                        name="settings-outline"
                        size={18}
                        color="#C4B5FD"
                      />
                    </View>
                    <Text style={styles.sheetItemText}>Settings</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.sheetItem}
                  activeOpacity={0.75}
                  onPress={handleLeaveClassroom}
                >
                  <View
                    style={[styles.sheetIconWrap, styles.sheetIconWrapDestructive]}
                  >
                    <Ionicons name="exit-outline" size={18} color="#F87171" />
                  </View>
                  <Text
                    style={[styles.sheetItemText, styles.sheetItemTextDestructive]}
                  >
                    Leave Classroom
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