import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  topGlow: {
    position: "absolute",
    top: -140,
    alignSelf: "center",
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: "#6C2BFF",
    opacity: 0.12,
  },

  bottomGlow: {
    position: "absolute",
    bottom: -160,
    alignSelf: "center",
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: "#9A3FFF",
    opacity: 0.08,
  },

  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  // ---------- Slide 1: Brand ----------
  logoContainer: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  logoGlow: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#8B5CF6",
    opacity: 0.25,
  },

  logo: {
    width: 120,
    height: 120,
  },

  welcome: {
    color: "#9CA3AF",
    fontSize: 13,
    letterSpacing: 3,
    marginBottom: 6,
  },

  title: {
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 14,
  },

  white: {
    color: "#FFFFFF",
  },

  purple: {
    color: "#A78BFA",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },

  // ---------- Slide 2: Identity ----------
  shieldWrapper: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  shieldGradient: {
    width: 168,
    height: 168,
    borderRadius: 84,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    shadowColor: "#6C2BFF",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 30,
    elevation: 20,
  },

  silhouette: {
    position: "absolute",
  },

  scanClip: {
  ...StyleSheet.absoluteFill,
  borderRadius: 84,
  overflow: "hidden",
},

  scanLine: {
    position: "absolute",
    left: -20,
    width: "140%",
    height: 2,
    backgroundColor: "rgba(216,180,254,0.7)",
    shadowColor: "#D8B4FE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
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
    backgroundColor: "#A78BFA",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
  },

  identityTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 12,
  },

  identitySubtitle: {
    color: "#9CA3AF",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 8,
  },

  // ---------- Slide 3: Get Started / Auth ----------
  connectScroll: {
    flex: 1,
    width: "100%",
  },

  connectContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },

  connectWelcome: {
    color: "#B79CFF",
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 6,
  },

  connectTitle: {
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 10,
  },

  connectSubtitle: {
    color: "#C9C9D3",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 18,
  },

  heroSection: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },

  heroImage: {
    width: 210,
    height: 260,
  },

  badgeCard: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20,10,45,0.85)",
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.35)",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    maxWidth: 150,

    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  badgeIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.5)",
    backgroundColor: "rgba(139,92,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  badgeTextWrap: {
    flexShrink: 1,
  },

  badgeTitle: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "700",
  },

  badgeDescription: {
    color: "#9CA3AF",
    fontSize: 10,
    lineHeight: 13,
    marginTop: 1,
  },

  badgeTopLeft: {
    top: 6,
    left: 0,
  },

  badgeTopRight: {
    top: 6,
    right: 0,
  },

  badgeBottomLeft: {
    top: 178,
    left: -4,
  },

  badgeBottomRight: {
    top: 178,
    right: -4,
  },

  getStartedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  getStartedLine: {
    width: 28,
    height: 1,
    backgroundColor: "rgba(167,139,250,0.4)",
    marginHorizontal: 10,
  },

  getStartedTitle: {
    color: "#B79CFF",
    fontSize: 22,
    fontWeight: "800",
  },

  getStartedSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 20,
  },

  authButton: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    marginBottom: 12,
    overflow: "hidden",
  },

  authButtonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#6C2BFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },

  authButtonOutline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.3,
    borderColor: "rgba(167,139,250,0.4)",
    borderRadius: 27,
  },

  authButtonIcon: {
    marginRight: 10,
  },

  authButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  authButtonArrow: {
    position: "absolute",
    right: 20,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 14,
    width: "100%",
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(167,139,250,0.2)",
  },

  dividerIcon: {
    marginHorizontal: 10,
  },

  termsText: {
    color: "#8A8A94",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },

  termsLink: {
    color: "#B79CFF",
    fontWeight: "600",
  },

  loginText: {
    color: "#8A8A94",
    fontSize: 13,
    textAlign: "center",
    marginTop: 14,
  },

  loginLink: {
    color: "#B79CFF",
    fontWeight: "700",
  },

  // ---------- Footer (shared across slides) ----------
  footerFixed: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingBottom: 28,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#8B5CF6",
  },

  activeDot: {
    backgroundColor: "#A78BFA",
  },

  button: {
    width: width - 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#6C2BFF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  footer: {
    marginTop: 16,
    color: "#6B7280",
    fontSize: 12,
    letterSpacing: 0.3,
    textAlign: "center",
  },
});

export default styles;