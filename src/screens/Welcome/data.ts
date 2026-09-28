export type WelcomeSlideType = "brand" | "identity" | "connect";

export type WelcomeSlideData = {
  id: string;
  type: WelcomeSlideType;
};

// Slide 3 ("connect") is a placeholder for now — tell me the
// title/subtitle/animation idea whenever you're ready and I'll build it.
export const welcomeSlides: WelcomeSlideData[] = [
  { id: "1", type: "brand" },
  { id: "2", type: "identity" },
  { id: "3", type: "connect" },
];