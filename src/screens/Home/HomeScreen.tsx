import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { RootStackParamList } from "../../navigation/RootNavigator";
import { db } from "../../services/firebase";
import { useTheme } from "../../theme/ThemeContext";
import { useUnreadAlerts } from "../../hooks/useUnreadAlerts";
import { getAnonymousIdentity } from "../../utils/anonymousIdentity";
import { heroSlides, features, colorForClassroom } from "./data";
import { styles } from "./styles";

const { width } = Dimensions.get("window");

const ShieldBadge = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.5],
  });
  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });

  return (
    <View
      style={{
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: 42,
          height: 42,
          borderRadius: 21,
          borderWidth: 1.5,
          borderColor: "rgba(139,92,246,0.6)",
          transform: [{ scale: ringScale }],
          opacity: ringOpacity,
        }}
      />
      <LinearGradient
        colors={["#A78BFA", "#4C1D95"]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",

          shadowColor: "#8B5CF6",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.6,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 4,
            left: 8,
            width: 16,
            height: 8,
            borderRadius: 6,
            backgroundColor: "rgba(255,255,255,0.3)",
            transform: [{ rotate: "-20deg" }],
          }}
        />
        <Ionicons name="shield" size={20} color="#F5F3FF" />
      </LinearGradient>
    </View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type MyClassroom = {
  id: string;
  name: string;
  code: string;
  memberIds: string[];
  photoBase64?: string | null;
};

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const hasUnreadAlerts = useUnreadAlerts();
  const heroScrollX = useRef(new Animated.Value(0)).current;
  const heroListRef = useRef<Animated.FlatList<any>>(null);
  const [activeHero, setActiveHero] = useState(0);

  const [myClassrooms, setMyClassrooms] = useState<MyClassroom[]>([]);
  const [loadingClassrooms, setLoadingClassrooms] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    getAnonymousIdentity().then(({ userId }) => {
      const q = query(
        collection(db, "classrooms"),
        where("memberIds", "array-contains", userId)
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const rooms: MyClassroom[] = snapshot.docs.map((d) => ({
          id: d.id,
          name: d.data().name,
          code: d.data().code,
          memberIds: d.data().memberIds ?? [],
          photoBase64: d.data().photoBase64 ?? null,
        }));
        setMyClassrooms(rooms);
        setLoadingClassrooms(false);
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleHeroMomentumEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
    setActiveHero(index);
  };

  const goToJoinClassroom = () => navigation.navigate("JoinClassroom");
  const goToCreateClassroom = () => navigation.navigate("CreateClassroom");

  const openClassroom = (room: MyClassroom) => {
    navigation.navigate("Chat", {
      classroomId: room.id,
      classroomName: room.name,
      classroomCode: room.code,
    });
  };

  const goToPremium = () => navigation.navigate("Premium");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.statusBarStyle === "light" ? "light-content" : "dark-content"}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ShieldBadge />

          <View style={styles.logoRow}>
            <Text style={[styles.logoWhite, { color: colors.text }]}>RAN</Text>
            <Text style={styles.logoAccent}>CHAT</Text>
          </View>

          <TouchableOpacity
            style={[styles.iconButton, { borderColor: colors.border }]}
            activeOpacity={0.75}
            onPress={goToPremium}
          >
            <Ionicons name="diamond-outline" size={20} color="#FBBF24" />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={styles.greetingRow}>
          <View style={styles.greetingTextWrap}>
            <Text style={[styles.greetingTitle, { color: colors.text }]}>
              Hey, Stranger 👋
            </Text>
            <Text style={[styles.greetingSubtitle, { color: colors.textSecondary }]}>
              Connect with your classmates.{"\n"}Stay anonymous, stay real.
            </Text>
          </View>

          <View style={styles.anonymousBadge}>
            <Ionicons
              name="shield-checkmark-outline"
              size={13}
              color="#34D399"
            />
            <Text style={styles.anonymousBadgeText}>100% Anonymous</Text>
          </View>
        </View>

        {/* Hero carousel */}
        <Animated.FlatList
          ref={heroListRef}
          data={heroSlides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: heroScrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleHeroMomentumEnd}
          renderItem={({ item }) => (
            <View style={{ width: width - 40 }}>
              <View
                style={[
                  styles.heroCard,
                  { borderColor: colors.border, backgroundColor: colors.surface },
                ]}
              >
                <Image
                  source={item.image}
                  style={styles.heroImage}
                  resizeMode="cover"
                />

                <View style={styles.heroTextWrap}>
                  <Text style={[styles.heroTitleWhite, { color: colors.text }]}>
                    {item.titleWhite}
                  </Text>
                  <Text style={styles.heroTitleAccent}>
                    {item.titleAccent}
                  </Text>
                  <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
                    {item.subtitle}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.heroDots}>
          {heroSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.heroDot,
                activeHero === index && styles.heroDotActive,
              ]}
            />
          ))}
        </View>

        {/* Start Here */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 14 }]}>
          Start Here
        </Text>

        <View style={styles.actionRow}>
          <View
            style={[
              styles.actionCard,
              styles.actionCardPurple,
              { backgroundColor: colors.surface },
            ]}
          >
            <View
              style={[
                styles.actionIconCircle,
                styles.actionIconCirclePurple,
              ]}
            >
              <Ionicons name="people-outline" size={26} color="#C4B5FD" />
            </View>
            <Text style={styles.actionTitlePurple}>Join Classroom</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
              Enter a class code{"\n"}to join your classroom
            </Text>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPurple]}
              activeOpacity={0.85}
              onPress={goToJoinClassroom}
            >
              <Text style={styles.actionButtonTextPurple}>Join Now</Text>
              <View style={styles.actionButtonArrowCirclePurple}>
                <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.actionCard,
              styles.actionCardBlue,
              { backgroundColor: colors.surface },
            ]}
          >
            <View style={[styles.actionIconCircle, styles.actionIconCircleBlue]}>
              <Ionicons name="add" size={28} color="#93C5FD" />
            </View>
            <Text style={styles.actionTitleBlue}>Create Classroom</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
              Create your own classroom{"\n"}and invite others
            </Text>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonBlue]}
              activeOpacity={0.85}
              onPress={goToCreateClassroom}
            >
              <Text style={styles.actionButtonTextBlue}>Create Now</Text>
              <View style={styles.actionButtonArrowCircleBlue}>
                <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Classrooms */}
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Classrooms
          </Text>
          {myClassrooms.length > 0 && (
            <TouchableOpacity
              style={styles.viewAll}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("AllClassrooms")}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={14} color="#B79CFF" />
            </TouchableOpacity>
          )}
        </View>

        {loadingClassrooms ? (
          <View style={{ paddingVertical: 24, alignItems: "center" }}>
            <ActivityIndicator color="#A78BFA" />
          </View>
        ) : myClassrooms.length === 0 ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 16,
              paddingVertical: 28,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons name="school-outline" size={30} color={colors.textSecondary} />
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                marginTop: 10,
                textAlign: "center",
                paddingHorizontal: 30,
              }}
            >
              You haven't joined any classroom yet. Create one or join with a
              code to get started.
            </Text>
          </View>
        ) : (
          myClassrooms.slice(0, 5).map((room) => {
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

                <View style={styles.classroomRight}>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={20}
                    color={colors.textSecondary}
                    style={{ marginRight: 8 }}
                  />
                  <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* Feature strip */}
        <View
          style={[
            styles.featureStrip,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
          {features.map((feature) => (
            <View key={feature.title} style={styles.featureItem}>
              <Ionicons
                name={feature.icon as any}
                size={20}
                color="#A78BFA"
              />
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureSubtitle, { color: colors.textSecondary }]}>
                {feature.subtitle}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNavWrap}>
        <View
          style={[
            styles.bottomNav,
            { backgroundColor: colors.surface, borderTopColor: colors.border },
          ]}
        >
          <TouchableOpacity style={styles.navItem} activeOpacity={0.75}>
            <Ionicons name="home" size={22} color="#A78BFA" />
            <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Vault")}
          >
            <Ionicons
              name="archive-outline"
              size={22}
              color={colors.textSecondary}
            />
            <Text style={[styles.navLabel, { color: colors.textSecondary }]}>
              Vault
            </Text>
          </TouchableOpacity>

          <View style={styles.navCenterWrap}>
            <TouchableOpacity
              style={[styles.navCenterButton, { backgroundColor: colors.surface }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("XP")}
            >
              <Image
                source={require("../../../assets/images/ranchat-logo.png")}
                style={styles.navCenterLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Notifications")}
          >
            <View>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.textSecondary}
              />
              {hasUnreadAlerts && <View style={styles.navBadgeDot} />}
            </View>
            <Text style={[styles.navLabel, { color: colors.textSecondary }]}>
              Alerts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color={colors.textSecondary}
            />
            <Text style={[styles.navLabel, { color: colors.textSecondary }]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}