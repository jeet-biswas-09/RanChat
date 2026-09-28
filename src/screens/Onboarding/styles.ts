import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  background: "#050505",
  surface: "#0D0D10",
  primary: "#8B5CF6",
  primaryLight: "#A78BFA",
  white: "#FFFFFF",
  grey: "#9CA3AF",
  greyDark: "#6B7280",
  border: "rgba(139,92,246,0.25)",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  backgroundGlow: {
    position: "absolute",
    top: -120,
    alignSelf: "center",
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: COLORS.primary,
    opacity: 0.1,
  },

  skipButton: {
    position: "absolute",
    top: 16,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  skipText: {
    color: COLORS.grey,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  orbWrapper: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },

  orbGradient: {
    width: 168,
    height: 168,
    borderRadius: 84,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 30,
    elevation: 20,
  },

  orbInnerShadowTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "55%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderTopLeftRadius: 84,
    borderTopRightRadius: 84,
  },

  orbGlassHighlight: {
    position: "absolute",
    top: 14,
    left: 24,
    width: 56,
    height: 28,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    transform: [{ rotate: "-18deg" }],
  },

  pulseRing: {
    position: "absolute",
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 1.5,
    borderColor: "rgba(167,139,250,0.5)",
  },

  orbitRing: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.15)",
    alignItems: "center",
  },

  orbitDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primaryLight,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
  },

  textCard: {
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 22,
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.18)",
    backgroundColor: "rgba(255,255,255,0.02)",
  },

  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    color: COLORS.grey,
    fontSize: 14.5,
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 6,
  },

  footer: {
    width: "100%",
    paddingHorizontal: 28,
    paddingBottom: 28,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: COLORS.primary,
  },

  ctaButton: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
  },

  ctaGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },

  ctaText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginRight: 8,
  },
});