import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import { useTheme } from "../../theme/ThemeContext";
import { getAnonymousIdentity } from "../../utils/anonymousIdentity";
import { markClassroomSeen } from "../../utils/unreadTracking";
import { colorForClassroom } from "../Home/data";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Notifications">;

type ClassroomInfo = {
  id: string;
  name: string;
  code: string;
  photoBase64?: string | null;
};

type LatestMessage = {
  text: string;
  senderId: string;
  senderName: string;
  createdAt: number;
};

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "now";
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  return `${day}d`;
}

export default function NotificationsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [classrooms, setClassrooms] = useState<ClassroomInfo[]>([]);
  const [latest, setLatest] = useState<Record<string, LatestMessage>>({});
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const messageUnsubs = useRef<Record<string, () => void>>({});

  useEffect(() => {
    let unsubClassrooms: (() => void) | undefined;

    getAnonymousIdentity().then(({ userId }) => {
      setMyUserId(userId);

      const q = query(
        collection(db, "classrooms"),
        where("memberIds", "array-contains", userId)
      );

      unsubClassrooms = onSnapshot(q, (snapshot) => {
        const rooms: ClassroomInfo[] = snapshot.docs.map((d) => ({
          id: d.id,
          name: d.data().name,
          code: d.data().code,
          photoBase64: d.data().photoBase64 ?? null,
        }));
        setClassrooms(rooms);

        rooms.forEach((room) => {
          if (messageUnsubs.current[room.id]) return;

          const mq = query(
            collection(db, "classrooms", room.id, "messages"),
            orderBy("createdAt", "desc"),
            limit(1)
          );

          messageUnsubs.current[room.id] = onSnapshot(mq, (msnap) => {
            if (!msnap.empty) {
              const data = msnap.docs[0].data() as LatestMessage;
              setLatest((prev) => ({ ...prev, [room.id]: data }));
            }
          });
        });

        Object.keys(messageUnsubs.current).forEach((id) => {
          if (!rooms.find((r) => r.id === id)) {
            messageUnsubs.current[id]();
            delete messageUnsubs.current[id];
          }
        });
      });
    });

    return () => {
      if (unsubClassrooms) unsubClassrooms();
      Object.values(messageUnsubs.current).forEach((fn) => fn());
      messageUnsubs.current = {};
    };
  }, []);

  const feed = classrooms
    .filter((room) => latest[room.id])
    .map((room) => ({ room, message: latest[room.id] }))
    .sort((a, b) => b.message.createdAt - a.message.createdAt);

  useEffect(() => {
    feed.forEach(({ room, message }) => {
      markClassroomSeen(room.id, message.createdAt);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(feed.map((f) => [f.room.id, f.message.createdAt]))]);

  const openClassroom = (room: ClassroomInfo) => {
    navigation.navigate("Chat", {
      classroomId: room.id,
      classroomName: room.name,
      classroomCode: room.code,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.statusBarStyle === "light" ? "light-content" : "dark-content"}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.75}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Notifications
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Recent activity from your classrooms
          </Text>
        </View>
      </View>

      {feed.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={[styles.emptyIconCircle, { borderColor: colors.border }]}>
            <Ionicons
              name="notifications-outline"
              size={34}
              color={colors.textSecondary}
            />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            All caught up
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            When someone sends a message in one of your classrooms, you'll
            see it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={feed}
          keyExtractor={(item) => item.room.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const color = colorForClassroom(item.room.id);
            const isMine = item.message.senderId === myUserId;

            return (
              <TouchableOpacity
                style={[styles.row, { borderBottomColor: colors.border }]}
                activeOpacity={0.75}
                onPress={() => openClassroom(item.room)}
              >
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: `${color}22`, overflow: "hidden" },
                  ]}
                >
                  {item.room.photoBase64 ? (
                    <Image
                      source={{ uri: item.room.photoBase64 }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <Ionicons name="school" size={20} color={color} />
                  )}
                </View>

                <View style={styles.textWrap}>
                  <Text style={[styles.classroomName, { color: colors.text }]} numberOfLines={1}>
                    {item.room.name}
                  </Text>
                  <Text style={[styles.preview, { color: colors.textSecondary }]} numberOfLines={1}>
                    <Text style={styles.previewSender}>
                      {isMine ? "You: " : `${item.message.senderName}: `}
                    </Text>
                    {item.message.text}
                  </Text>
                </View>

                <Text style={[styles.time, { color: colors.textSecondary }]}>
                  {timeAgo(item.message.createdAt)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}