export type OnboardingSlide = {
  id: string;
  icon: string; // Ionicons name
  title: string;
  description: string;
  gradient: [string, string];
};

export const onboardingData: OnboardingSlide[] = [
  {
    id: "1",
    icon: "eye-off-outline",
    title: "Complete Anonymity",
    description:
      "No phone number. No profile. No trace. Just you, hidden behind the code.",
    gradient: ["#8B5CF6", "#4C1D95"],
  },
  {
    id: "2",
    icon: "flash-outline",
    title: "Instant Connections",
    description:
      "Get matched with a stranger in seconds. Real conversations, zero waiting.",
    gradient: ["#6366F1", "#312E81"],
  },
  {
    id: "3",
    icon: "shield-checkmark-outline",
    title: "Encrypted & Secure",
    description:
      "Every message is protected end-to-end. Your words disappear when you do.",
    gradient: ["#A78BFA", "#5B21B6"],
  },
  {
    id: "4",
    icon: "infinite-outline",
    title: "Talk Without Limits",
    description:
      "No filters on who you are. Just pure, unfiltered conversation.",
    gradient: ["#7C3AED", "#1E1B4B"],
  },
];