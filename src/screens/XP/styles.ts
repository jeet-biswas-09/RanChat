import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginLeft: 6,
  },

  headerTitleWhite: {
    color: "#FFFFFF",
  },

  headerTitleAccent: {
    color: "#A78BFA",
  },

  headerSubtitle: {
    color: "#9CA3AF",
    fontSize: 11.5,
    marginTop: 1,
  },

  xpBadge: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.35)",
    backgroundColor: "rgba(139,92,246,0.1)",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  xpBadgeText: {
    color: "#C4B5FD",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 4,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },

  card: {
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "rgba(139,92,246,0.04)",
  },

  currentXPRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  xpHexagon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,

    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },

  currentXPLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 2,
  },

  currentXPValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginBottom: 4,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#8B5CF6",
    borderRadius: 3,
  },

  progressLabel: {
    color: "#6B7280",
    fontSize: 11,
  },

  streakCard: {
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },

  streakHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  streakTitle: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "800",
  },

  streakSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },

  streakDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  streakDay: {
    alignItems: "center",
    flex: 1,
  },

  streakCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  streakDayLabel: {
    color: "#6B7280",
    fontSize: 10,
  },

  streakBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(251,191,36,0.08)",
    borderRadius: 12,
    padding: 10,
  },

  streakBannerText: {
    color: "#FBBF24",
    fontSize: 11.5,
    marginLeft: 8,
    flex: 1,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "800",
    marginBottom: 3,
  },

  sectionSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 14,
  },

  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },

  codeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 3,
    flex: 1,
  },

  inviteButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#8B5CF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
    marginLeft: 8,
  },

  redeemCodeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  redeemCodeInput: {
    flex: 1,
    borderWidth: 1.3,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: "#FFFFFF",
    fontSize: 14,
    marginRight: 8,
  },

  redeemCodeButton: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "rgba(139,92,246,0.15)",
    borderWidth: 1,
    borderColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
  },

  redeemCodeButtonText: {
    color: "#C4B5FD",
    fontSize: 13,
    fontWeight: "700",
  },

  redeemRow: {
    flexDirection: "row",
    marginTop: 4,
  },

  redeemCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    borderRadius: 16,
    padding: 14,
    marginRight: 10,
    alignItems: "center",
  },

  redeemCardLast: {
    marginRight: 0,
  },

  redeemCrown: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  redeemXP: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  redeemPrice: {
    color: "#9CA3AF",
    fontSize: 11.5,
    marginBottom: 12,
  },

  redeemButton: {
    height: 38,
    width: "100%",
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  redeemButtonText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "700",
  },

  footerText: {
    color: "#4B4B55",
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
  },
});

export default styles;