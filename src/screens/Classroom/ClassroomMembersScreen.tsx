import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "ClassroomMembers">;

type Member = {
  id: string;
  userName: string;
  joinedAt: number;
  isOwner: boolean;
};

export default function ClassroomMembersScreen({ navigation, route }: Props) {
  const { classroomId, classroomName } = route.params;
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "classrooms", classroomId, "members"),
      orderBy("joinedAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Member[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Member, "id">),
      }));
      setMembers(list);
      setLoading(false);
    });

    return unsubscribe;
  }, [classroomId]);

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
          <Text style={styles.headerTitle}>Members</Text>
          <Text style={styles.headerSubtitle}>{classroomName}</Text>
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color="#A78BFA" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContent}>
          {members.map((member) => (
            <View key={member.id} style={styles.memberRow}>
              <View style={styles.memberAvatar}>
                <Ionicons name="person" size={18} color="#C4B5FD" />
              </View>
              <Text style={styles.memberName}>{member.userName}</Text>
              {member.isOwner && (
                <View style={styles.memberBadge}>
                  <Ionicons name="star" size={10} color="#FBBF24" />
                  <Text style={styles.memberBadgeText}>OWNER</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}