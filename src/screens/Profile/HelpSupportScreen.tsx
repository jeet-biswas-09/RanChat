import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { settingsStyles as styles } from "./settingsStyles";

type Props = NativeStackScreenProps<RootStackParamList, "HelpSupport">;

const FAQS = [
  {
    question: "Is Ranchat really anonymous?",
    answer:
      "Yes. We don't ask for your name or photo, and other members of your classroom never see your real identity — only your random anonymous name.",
  },
  {
    question: "How long does a classroom code last?",
    answer:
      "Each code stays active for 3 days. After that, it automatically refreshes to a new one the next time someone opens the classroom, so old codes can't be reused indefinitely.",
  },
  {
    question: "Can I leave a classroom?",
    answer:
      "Classroom management options are coming soon. For now, you can simply stop opening that classroom's chat.",
  },
  {
    question: "Can I send photos or videos yet?",
    answer:
      "Not yet — text chat is fully working, and media sharing is on the way in a future update.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Account deletion is coming soon. If you need this urgently, contact us below and we'll help manually.",
  },
];

export default function HelpSupportScreen({ navigation }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleContactPress = () => {
    Linking.openURL(
      "mailto:support@ranchat.app?subject=Ranchat%20Support"
    ).catch(() => {
      console.log("Could not open mail client");
    });
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
          <Text style={styles.headerTitle}>Help &amp; Support</Text>
          <Text style={styles.headerSubtitle}>
            Get help and find answers
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>FREQUENTLY ASKED</Text>

        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <View key={faq.question} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqHeader}
                activeOpacity={0.75}
                onPress={() => setOpenIndex(isOpen ? null : index)}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
              {isOpen && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </View>
          );
        })}

        <View style={styles.contactCard}>
          <Ionicons name="mail-outline" size={26} color="#C4B5FD" />
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactSubtitle}>
            Send us a message and we'll get back to you as soon as we can.
          </Text>

          <TouchableOpacity
            style={styles.contactButton}
            activeOpacity={0.85}
            onPress={handleContactPress}
          >
            <LinearGradient
              colors={["#8B3BFF", "#3B6BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.contactButtonGradient}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Ranchat v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}