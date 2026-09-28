import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import { getAnonymousIdentity } from "../../utils/anonymousIdentity";
import { generateClassroomCode, isCodeExpired } from "../../utils/classroomCode";
import { addMember } from "../../utils/classroomActions";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "JoinClassroom">;

export default function JoinClassroomScreen({ navigation }: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError("Please enter a classroom code.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "classrooms"),
        where("code", "==", trimmed)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Invalid code. Please check and try again.");
        setLoading(false);
        return;
      }

      const classroomDoc = snapshot.docs[0];
      const data = classroomDoc.data();

      if (isCodeExpired(data.codeGeneratedAt)) {
        // Lazily rotate the code now that someone has touched an expired one.
        const newCode = generateClassroomCode();
        await updateDoc(doc(db, "classrooms", classroomDoc.id), {
          code: newCode,
          codeGeneratedAt: Date.now(),
        });

        setError(
          "This code just expired. Please ask the classroom owner for the new code."
        );
        setLoading(false);
        return;
      }

      const { userId, userName } = await getAnonymousIdentity();
      await updateDoc(doc(db, "classrooms", classroomDoc.id), {
        memberIds: arrayUnion(userId),
      });
      await addMember(classroomDoc.id, userId, userName, false);

      navigation.replace("Chat", {
        classroomId: classroomDoc.id,
        classroomName: data.name,
        classroomCode: data.code,
      });
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Join Classroom</Text>
            <Text style={styles.headerSubtitle}>
              Enter the code your classmate shared
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[styles.iconCircleLarge, { borderColor: "#A78BFA" }]}
          >
            <Ionicons name="people-outline" size={34} color="#C4B5FD" />
          </View>

          <Text style={styles.formTitle}>Enter Classroom Code</Text>
          <Text style={styles.formSubtitle}>
            Paste the 6-character code you received to join the classroom
            anonymously.
          </Text>

          <Text style={styles.inputLabel}>CLASSROOM CODE</Text>
          <TextInput
            style={[styles.textInput, styles.codeInput]}
            placeholder="XXXXXX"
            placeholderTextColor="#4B4B55"
            value={code}
            onChangeText={(t) => setCode(t.toUpperCase())}
            autoCapitalize="characters"
            maxLength={6}
          />
          <Text style={styles.inputHint}>
            Codes are 6 characters, letters &amp; numbers
          </Text>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!code.trim() || loading) && styles.primaryButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!code.trim() || loading}
            onPress={handleJoin}
          >
            <LinearGradient
              colors={["#8B3BFF", "#A78BFA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButtonGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>
                    Join Classroom
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}