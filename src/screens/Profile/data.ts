export type ThemeOption = {
  id: string;
  label: string;
  color: string;
  image: any;
};

// Rename your generated avatar images to these exact filenames
// in assets/images/ (lowercase, hyphenated) so the paths below resolve.
export const themeOptions: ThemeOption[] = [
  {
    id: "purple",
    label: "Purple",
    color: "#A855F7",
    image: require("../../../assets/images/theme-blue.png"),
  },
  {
    id: "green",
    label: "Green",
    color: "#22C55E",
    image: require("../../../assets/images/theme-green.png"),
  },
  {
    id: "red",
    label: "Red",
    color: "#EF4444",
    image: require("../../../assets/images/theme-red.png"),
  },
  {
    id: "white",
    label: "White",
    color: "#E5E7EB",
    image: require("../../../assets/images/theme-white.png"),
  },
  {
    id: "yellow",
    label: "Yellow",
    color: "#EAB308",
    image: require("../../../assets/images/theme-yellow.png"),
  },
];

export type ProfileFeature = {
  icon: string;
  title: string;
  subtitle: string;
};

export const profileFeatures: ProfileFeature[] = [
  { icon: "glasses-outline", title: "True Privacy", subtitle: "Always" },
  { icon: "shield-outline", title: "No Trace", subtitle: "No data stored" },
  { icon: "eye-off-outline", title: "Unseen", subtitle: "No one knows" },
  {
    icon: "lock-closed-outline",
    title: "You're Safe",
    subtitle: "We protect you",
  },
];

export type AccountItem = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  destructive?: boolean;
};

export const accountItems: AccountItem[] = [
  {
    id: "privacy",
    icon: "shield-checkmark-outline",
    title: "Privacy Settings",
    subtitle: "Manage who can interact with you",
  },
  {
    id: "notifications",
    icon: "notifications-outline",
    title: "Notifications",
    subtitle: "Customize your notification preferences",
  },
  {
    id: "appearance",
    icon: "color-palette-outline",
    title: "Appearance",
    subtitle: "Choose your theme and vibe",
  },
  {
    id: "help",
    icon: "help-circle-outline",
    title: "Help & Support",
    subtitle: "Get help and find answers",
  },
  {
    id: "logout",
    icon: "log-out-outline",
    title: "Log Out",
    subtitle: "Sign out from Ranchat",
    destructive: true,
  },
];