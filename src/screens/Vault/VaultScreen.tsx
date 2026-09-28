import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../theme/ThemeContext";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Vault">;

export default function VaultScreen({ navigation }: Props) {
  const { colors } = useTheme();

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Vault</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Saved images and videos from your chats
          </Text>
        </View>
      </View>

      <View style={styles.emptyWrap}>
        <View style={[styles.emptyIconCircle, { borderColor: colors.border }]}>
          <Ionicons name="images-outline" size={34} color={colors.textSecondary} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          Nothing saved yet
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Once photo and video sharing is available in chat, anything you
          save will show up here.
        </Text>
      </View>
    </SafeAreaView>
  );
}