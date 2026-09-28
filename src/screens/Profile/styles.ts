import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  // ---------- Header ----------
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 8,
    marginBottom: 22,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },

  headerSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
  },

  headerIcons: {
    flexDirection: "row",
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  // ---------- Anonymous card ----------
  anonCard: {
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },

  anonTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  avatarRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,

    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 10,
  },

  avatarImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },

  anonTextWrap: {
    flex: 1,
  },

  anonTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },

  anonBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  anonBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },

  anonTagline: {
    color: "#C9C9D3",
    fontSize: 13,
    lineHeight: 19,
  },

  featureRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.15)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 4,
  },

  featureItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 2,
  },

  featureTitle: {
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },

  featureSubtitle: {
    color: "#9CA3AF",
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },

  // ---------- Banner card ----------
  bannerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 26,
  },

  orbitWrap: {
    width: 84,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  orbitCore: {
    width: 54,
    height: 54,
    borderRadius: 27,

    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 10,
  },

  orbitRing: {
    position: "absolute",
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1.2,
    borderColor: "rgba(167,139,250,0.5)",
    transform: [{ scaleY: 0.42 }],
  },

  orbitPulseRing: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "rgba(167,139,250,0.55)",
  },

  orbitDotsRing: {
    position: "absolute",
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
  },

  orbitTinyDot: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#A78BFA",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },

  orbitGradientCore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    shadowColor: "#6C2BFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 12,
  },

  orbitGlassHighlight: {
    position: "absolute",
    top: 6,
    left: 10,
    width: 22,
    height: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    transform: [{ rotate: "-18deg" }],
  },

  bannerTextWrap: {
    flex: 1,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },

  bannerSubtitle: {
    color: "#9CA3AF",
    fontSize: 12.5,
    lineHeight: 18,
  },

  // ---------- Account section ----------
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },

  accountCard: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    overflow: "hidden",
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  accountRowLast: {
    borderBottomWidth: 0,
  },

  accountIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(139,92,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  accountIconWrapDestructive: {
    backgroundColor: "rgba(248,113,113,0.12)",
  },

  accountTextWrap: {
    flex: 1,
  },

  accountTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },

  accountTitleDestructive: {
    color: "#F87171",
  },

  accountSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  // ---------- Bottom Nav (same pattern as Home) ----------
  bottomNavWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0A0A0C",
    borderTopWidth: 1,
    borderTopColor: "rgba(139,92,246,0.15)",
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },

  navLabel: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 4,
  },

  navLabelActive: {
    color: "#A78BFA",
  },

  navBadgeDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#A855F7",
  },

  navActiveUnderline: {
    marginTop: 4,
    width: 20,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#A78BFA",
  },

  // ---------- Theme Picker Modal ----------
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  modalSheet: {
    backgroundColor: "#0D0D10",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },

  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "center",
    marginBottom: 18,
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
    textAlign: "center",
  },

  modalSubtitle: {
    color: "#9CA3AF",
    fontSize: 12.5,
    textAlign: "center",
    marginBottom: 22,
  },

  themeOptionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  themeOption: {
    alignItems: "center",
  },

  themeOptionRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  themeOptionRingActive: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },

  themeOptionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  themeOptionLabel: {
    color: "#9CA3AF",
    fontSize: 11,
  },

  themeOptionLabelActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  themeCheckDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0D0D10",
  },
  navCenterWrap: {
    width: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  navCenterButton: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
    backgroundColor: "#0A0A0C",

    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 14,
  },

  navCenterLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  // ---------- Anonymous Score Modal ----------
  scoreOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  scoreCard: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  scoreShieldCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,

    shadowColor: "#34D399",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },

  scoreLevelLabel: {
    color: "#34D399",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 6,
  },

  scorePercent: {
    color: "#34D399",
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 4,
  },

  scoreCaption: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 20,
  },

  scoreChecklist: {
    width: "100%",
    marginBottom: 22,
  },

  scoreChecklistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  scoreChecklistText: {
    fontSize: 12.5,
    marginLeft: 8,
  },

  scoreCloseButton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#34D399",
    alignItems: "center",
    justifyContent: "center",
  },

  scoreCloseButtonText: {
    color: "#052E1F",
    fontSize: 15,
    fontWeight: "800",
  },
});

export default styles;