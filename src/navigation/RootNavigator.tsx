import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import AllClassroomsScreen from "../screens/Home/AllClassroomsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import CreateClassroomScreen from "../screens/Classroom/CreateClassroomScreen";
import JoinClassroomScreen from "../screens/Classroom/JoinClassroomScreen";
import ChatScreen from "../screens/Classroom/ChatScreen";
import EmailAuthScreen from "../screens/Auth/EmailAuthScreen";
import PrivacySettingsScreen from "../screens/Profile/PrivacySettingsScreen";
import NotificationSettingsScreen from "../screens/Profile/NotificationsScreen";
import HelpSupportScreen from "../screens/Profile/HelpSupportScreen";
import VaultScreen from "../screens/Vault/VaultScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import PremiumScreen from "../screens/Premium/PremiumScreen";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import XPScreen from "../screens/XP/XPScreen";
import ClassroomMembersScreen from "../screens/Classroom/ClassroomMembersScreen";
import SharedMediaScreen from "../screens/Classroom/SharedMediaScreen";
import ClassroomSettingsScreen from "../screens/Classroom/ClassroomSettingsScreen";

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  Home: undefined;
  AllClassrooms: undefined;
  Profile: undefined;
  CreateClassroom: undefined;
  JoinClassroom: undefined;
  Chat: {
    classroomId: string;
    classroomName: string;
    classroomCode: string;
  };
  EmailAuth: { mode?: "signup" | "login" } | undefined;
  PrivacySettings: undefined;
  NotificationSettings: undefined;
  HelpSupport: undefined;
  Vault: undefined;
  Notifications: undefined;
  Premium: undefined;
  Settings: undefined;
  XP: undefined;
  ClassroomMembers: { classroomId: string; classroomName: string };
  SharedMedia: { classroomId: string; classroomName: string };
  ClassroomSettings: { classroomId: string; classroomName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: "#09090B",
          },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllClassrooms" component={AllClassroomsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="CreateClassroom"
          component={CreateClassroomScreen}
        />
        <Stack.Screen name="JoinClassroom" component={JoinClassroomScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="EmailAuth" component={EmailAuthScreen} />
        <Stack.Screen
          name="PrivacySettings"
          component={PrivacySettingsScreen}
        />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettingsScreen}
        />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="Vault" component={VaultScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Premium" component={PremiumScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="XP" component={XPScreen} />
        <Stack.Screen
          name="ClassroomMembers"
          component={ClassroomMembersScreen}
        />
        <Stack.Screen name="SharedMedia" component={SharedMediaScreen} />
        <Stack.Screen
          name="ClassroomSettings"
          component={ClassroomSettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}