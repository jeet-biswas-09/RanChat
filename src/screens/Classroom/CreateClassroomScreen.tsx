import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
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
import { addDoc, collection } from "firebase/firestore";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import { generateClassroomCode, CODE_LIFETIME_MS } from "../../utils/classroomCode";
import { getAnonymousIdentity } from "../../utils/anonymousIdentity";
import { addMember } from "../../utils/classroomActions";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "CreateClassroom">;

export default function CreateClassroomScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [pickingPhoto, setPickingPhoto] = useState(false);

  const handlePickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setError("We need permission to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled || !result.assets?.[0]) return;

    setPickingPhoto(true);
    try {
      // Resize down small and compress so it comfortably fits as a
      // Firestore field (no paid Storage plan needed for avatars).
      const manipulated = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 256, height: 256 } }],
        {
          compress: 0.5,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      if (manipulated.base64) {
        setPhotoBase64(`data:image/jpeg;base64,${manipulated.base64}`);
        setError("");
      }
    } catch (e) {
      setError("Couldn't process that image. Try a different one.");
    } finally {
      setPickingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoBase64(null);
  };

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a classroom name.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { userId, userName } = await getAnonymousIdentity();
      const code = generateClassroomCode();
      const now = Date.now();

      const docRef = await addDoc(collection(db, "classrooms"), {
        name: trimmed,
        code,
        ownerId: userId,
        memberIds: [userId],
        createdAt: now,
        codeGeneratedAt: now,
        screenshotsBlocked: false,
        messagingDisabledUntil: null,
        ...(photoBase64 ? { photoBase64 } : {}),
      });

      await addMember(docRef.id, userId, userName, true);

      setCreatedCode(code);
      setCreatedId(docRef.id);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!createdCode) return;
    await Clipboard.setStringAsync(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleGoToClassroom = () => {
    if (!createdId || !createdCode) return;
    navigation.replace("Chat", {
      classroomId: createdId,
      classroomName: name.trim(),
      classroomCode: createdCode,
    });
  };

  // ---------- Success screen ----------
  if (createdCode) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.successWrap}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark" size={40} color="#34D399" />
          </View>

          <Text style={styles.successTitle}>Classroom Created!</Text>
          <Text style={styles.successSubtitle}>
            Share this code with your classmates so they can join{" "}
            {name.trim()}.
          </Text>

          <View style={styles.codeCard}>
            <Text style={styles.codeCardLabel}>CLASSROOM CODE</Text>
            <Text style={styles.codeCardValue}>{createdCode}</Text>

            <TouchableOpacity
              style={styles.copyRow}
              activeOpacity={0.7}
              onPress={handleCopy}
            >
              <Ionicons
                name={copied ? "checkmark-circle" : "copy-outline"}
                size={16}
                color="#A78BFA"
              />
              <Text style={styles.copyRowText}>
                {copied ? "Copied!" : "Copy code"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.expiryNote}>
            <Ionicons name="time-outline" size={14} color="#9CA3AF" />
            <Text style={styles.expiryNoteText}>
              This code refreshes automatically after 3 days
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleGoToClassroom}
          >
            <LinearGradient
              colors={["#8B3BFF", "#3B6BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>Go to Classroom</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------- Form screen ----------
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
            <Text style={styles.headerTitle}>Create Classroom</Text>
            <Text style={styles.headerSubtitle}>
              Set up a space for your class
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePickPhoto}
            disabled={pickingPhoto}
            style={[
              styles.iconCircleLarge,
              {
                borderColor: "#60A5FA",
                overflow: "hidden",
                padding: 0,
              },
            ]}
          >
            {pickingPhoto ? (
              <ActivityIndicator color="#93C5FD" />
            ) : photoBase64 ? (
              <Image
                source={{ uri: photoBase64 }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Ionicons name="add" size={36} color="#93C5FD" />
            )}

            <View
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: "#3B82F6",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#050505",
              }}
            >
              <Ionicons name="camera" size={13} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {photoBase64 && (
            <TouchableOpacity
              onPress={handleRemovePhoto}
              activeOpacity={0.7}
              style={{ alignSelf: "center", marginBottom: 12 }}
            >
              <Text style={{ color: "#F87171", fontSize: 12.5, fontWeight: "600" }}>
                Remove photo
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.formTitle}>Name Your Classroom</Text>
          <Text style={styles.formSubtitle}>
            Give it a name (and optionally a photo) your classmates will
            recognize. We'll generate a unique code you can share with them.
          </Text>

          <Text style={styles.inputLabel}>CLASSROOM NAME</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. CSE - 3rd Year"
            placeholderTextColor="#6B7280"
            value={name}
            onChangeText={setName}
            maxLength={40}
          />
          <Text style={styles.inputHint}>{name.length}/40</Text>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!name.trim() || loading) && styles.primaryButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!name.trim() || loading}
            onPress={handleCreate}
          >
            <LinearGradient
              colors={["#3B6BFF", "#60A5FA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButtonGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>
                    Create Classroom
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