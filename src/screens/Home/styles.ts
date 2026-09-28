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
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    marginBottom: 20,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  logoRow: {
    flexDirection: "row",
  },

  logoWhite: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  logoAccent: {
    color: "#A78BFA",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  notifDot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#A855F7",
  },

  // ---------- Greeting ----------
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  greetingTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  greetingTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },

  greetingSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    lineHeight: 19,
  },

  anonymousBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.5)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  anonymousBadgeText: {
    color: "#34D399",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 6,
  },

  // ---------- Hero Carousel ----------
  heroCard: {
  height: 180,
  borderRadius: 22,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "rgba(139,92,246,0.35)",
  backgroundColor: "#101014",
  marginBottom: 10,
},

  heroImage: {
  width: "100%",
  height: "100%",
},

   heroTextWrap: {
  position: "absolute",
  left: 18,
  right: 18,
  bottom: 18,
},

  heroTitleWhite: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  heroTitleAccent: {
    color: "#A78BFA",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },

  heroSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    lineHeight: 19,
  },

  heroDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: "#3F3F46",
  },

  heroDotActive: {
    backgroundColor: "#D8B4FE",
  },

  // ---------- Section headers ----------
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  viewAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    color: "#B79CFF",
    fontSize: 13,
    fontWeight: "600",
    marginRight: 2,
  },

  // ---------- Action Cards ----------
  actionRow: {
    flexDirection: "row",
    marginBottom: 26,
  },

  actionCard: {
  flex: 1,
  borderWidth: 1,
  borderRadius: 18,
  paddingVertical: 20,
  paddingHorizontal: 14,
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 170,
},

  actionCardPurple: {
    borderColor: "rgba(139,92,246,0.4)",
    marginRight: 8,
  },

  actionCardBlue: {
    borderColor: "rgba(59,130,246,0.4)",
    marginLeft: 8,
  },

  actionIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  actionIconCirclePurple: {
    borderColor: "#A78BFA",
  },

  actionIconCircleBlue: {
    borderColor: "#60A5FA",
  },

  actionTitlePurple: {
    color: "#C4B5FD",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },

  actionTitleBlue: {
    color: "#93C5FD",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },

  actionSubtitle: {
  color: "#9CA3AF",
  fontSize: 11.5,
  textAlign: "center",
  lineHeight: 16,
  marginBottom: 16,
},

  actionButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",
  borderWidth: 1,
  borderRadius: 20,

  paddingVertical: 8,
  paddingHorizontal: 6,
  paddingLeft: 14,

  marginTop: 8,
},

  actionButtonPurple: {
    borderColor: "rgba(139,92,246,0.4)",
  },

  actionButtonBlue: {
    borderColor: "rgba(59,130,246,0.4)",
  },

  actionButtonTextPurple: {
    color: "#C4B5FD",
    fontSize: 13,
    fontWeight: "700",
  },

  actionButtonTextBlue: {
    color: "#93C5FD",
    fontSize: 13,
    fontWeight: "700",
  },

  actionButtonArrowCirclePurple: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
  },

  actionButtonArrowCircleBlue: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },

  // ---------- Classroom rows ----------
  classroomRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  classroomIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  classroomTextWrap: {
    flex: 1,
  },

  classroomName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },

  classroomMeta: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 2,
  },

  classroomMembersRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  classroomMembersText: {
    color: "#9CA3AF",
    fontSize: 12,
    marginLeft: 4,
  },

  classroomRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  unreadBadgeWrap: {
    marginRight: 8,
    alignItems: "center",
  },

  unreadCount: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#A855F7",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },

  unreadCountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },

  // ---------- Feature strip ----------
  featureStrip: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: 10,
  },

  featureItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },

  featureTitle: {
    color: "#FFFFFF",
    fontSize: 10.5,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 3,
  },

  featureSubtitle: {
    color: "#9CA3AF",
    fontSize: 9,
    textAlign: "center",
    lineHeight: 12,
  },

  // ---------- Bottom Nav ----------
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
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#A855F7",
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
});

export default styles;