export type HeroSlide = {
  id: string;
  titleWhite: string;
  titleAccent: string;
  subtitle: string;
  image: any;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    titleWhite: "Same Class.",
    titleAccent: "Real Conversations.",
    subtitle: "Chat anonymously with people who are in your class.",
    image: require("../../../assets/images/banner1.png"),
  },
  {
    id: "2",
    titleWhite: "Speak.",
    titleAccent: "Without Fear.",
    subtitle: "A safe place to share ideas, ask questions, and chat without revealing who you are.",
    image: require("../../../assets/images/banner2.png"),
  },
  {
    id: "3",
    titleWhite: "Unknown.",
    titleAccent: "Unfiltered.",
    subtitle: "Express yourself without limits while your identity remains completely hidden.",
    image: require("../../../assets/images/banner3.png"),
  },
];

export type Feature = {
  icon: string;
  title: string;
  subtitle: string;
};

export const features: Feature[] = [
  {
    icon: "glasses-outline",
    title: "100% Anonymous",
    subtitle: "Your identity stays private",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Safe & Secure",
    subtitle: "We protect you always",
  },
  {
    icon: "people-outline",
    title: "For Students",
    subtitle: "Only your classmates can join",
  },
  {
    icon: "flash-outline",
    title: "Real-time Chat",
    subtitle: "Instant messaging experience",
  },
];

// Cycled through for classroom icon color since real classrooms
// don't have a designer-picked color like the old dummy data did.
export const classroomColorPalette = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"];

export function colorForClassroom(id: string): string {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return classroomColorPalette[sum % classroomColorPalette.length];
}