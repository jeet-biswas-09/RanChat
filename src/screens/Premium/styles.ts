import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },

  crownWrap: {
    marginTop: 10,
    marginBottom: 20,
  },

  crownCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 26,
    paddingHorizontal: 10,
  },

  perksCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.25)",
    borderRadius: 18,
    marginBottom: 24,
    overflow: "hidden",
  },

  perkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  perkRowLast: {
    borderBottomWidth: 0,
  },

  perkIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "rgba(251,191,36,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  perkTextWrap: {
    flex: 1,
  },

  perkTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },

  perkSubtitle: {
    color: "#9CA3AF",
    fontSize: 11.5,
    lineHeight: 15,
  },

  planRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 22,
  },

  planCard: {
    flex: 1,
    borderWidth: 1.3,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 5,
  },

  planCardActive: {
    borderColor: "#FBBF24",
    backgroundColor: "rgba(251,191,36,0.06)",
  },

  planDuration: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 6,
  },

  planPrice: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  planPer: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 2,
  },

  planBadge: {
    position: "absolute",
    top: -10,
    backgroundColor: "#FBBF24",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  planBadgeText: {
    color: "#1C1917",
    fontSize: 9,
    fontWeight: "800",
  },

  subscribeButton: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 14,
  },

  subscribeGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },

  subscribeText: {
    color: "#1C1917",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 8,
  },

  disclaimer: {
    color: "#4B4B55",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
});

export default styles;