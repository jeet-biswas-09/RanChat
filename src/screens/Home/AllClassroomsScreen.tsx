import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import { useTheme } from "../../theme/ThemeContext";
import { getAnonymousIdentity } from "../../utils/anonymousIdentity";
import { colorForClassroom } from "./data";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "AllClassrooms">;

type MyClassroom = {
  id: string;
  name: string;
  code: string;
  memberIds: string[];
  photoBase64?: string | null;
};

export default function AllClassroomsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [rooms, setRooms] = useState<MyClassroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    getAnonymousIdentity().then(({ userId }) => {
      const q = query(
        collection(db, "classrooms"),
        where("memberIds", "array-contains", userId)
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const list: MyClassroom[] = snapshot.docs.map((d) => ({
          id: d.id,
          name: d.data().name,
          code: d.data().code,
          memberIds: d.data().memberIds ?? [],
          photoBase64: d.data().photoBase64 ?? null,
        }));
        setRooms(list);
        setLoading(false);
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const openClassroom = (room: MyClassroom) => {
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
          style={[styles.iconButton, { borderColor: colors.border }]}
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>
          Your Classrooms
        </Text>
        <View style={{ width: 42 }} />
      </View>

      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#A78BFA" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: 16 }]}
        >
          {rooms.map((room) => {
            const color = colorForClassroom(room.id);
            return (
              <TouchableOpacity
                key={room.id}
                style={[styles.classroomRow, { borderColor: colors.border }]}
                activeOpacity={0.8}
                onPress={() => openClassroom(room)}
              >
                <View
                  style={[
                    styles.classroomIcon,
                    { backgroundColor: `${color}22`, overflow: "hidden" },
                  ]}
                >
                  {room.photoBase64 ? (
                    <Image
                      source={{ uri: room.photoBase64 }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <Ionicons name="school" size={22} color={color} />
                  )}
                </View>

                <View style={styles.classroomTextWrap}>
                  <Text style={[styles.classroomName, { color: colors.text }]}>
                    {room.name}
                  </Text>
                  <Text style={[styles.classroomMeta, { color: colors.textSecondary }]}>
                    Class Code:{" "}
                    <Text style={{ color, fontWeight: "700" }}>
                      {room.code}
                    </Text>
                  </Text>
                  <View style={styles.classroomMembersRow}>
                    <Ionicons
                      name="people-outline"
                      size={13}
                      color={colors.textSecondary}
                    />
                    <Text style={[styles.classroomMembersText, { color: colors.textSecondary }]}>
                      {room.memberIds.length} Member
                      {room.memberIds.length === 1 ? "" : "s"}
                    </Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}