import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "SharedMedia">;

export default function SharedMediaScreen({ navigation, route }: Props) {
  const { classroomName } = route.params;

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
          <Text style={styles.headerTitle}>Shared Media</Text>
          <Text style={styles.headerSubtitle}>{classroomName}</Text>
        </View>
      </View>

      <View style={styles.emptyWrap}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="images-outline" size={34} color="#4B4B55" />
        </View>
        <Text style={styles.emptyTitle}>No media yet</Text>
        <Text style={styles.emptySubtitle}>
          Photos and videos shared in this classroom will show up here once
          media sharing is available.
        </Text>
      </View>
    </SafeAreaView>
  );
}