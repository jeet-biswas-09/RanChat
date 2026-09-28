import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  sectionLabel: {
    color: "#6B7280",
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 22,
    marginBottom: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    overflow: "hidden",
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  toggleRowLast: {
    borderBottomWidth: 0,
  },

  toggleIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(139,92,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  toggleTextWrap: {
    flex: 1,
    marginRight: 10,
  },

  toggleTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
    marginBottom: 2,
  },

  toggleSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    lineHeight: 16,
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  linkRowLast: {
    borderBottomWidth: 0,
  },

  linkTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
  },

  // ---------- FAQ ----------
  faqItem: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    marginBottom: 10,
    overflow: "hidden",
  },

  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  faqQuestion: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
  },

  faqAnswer: {
    color: "#9CA3AF",
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  contactCard: {
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },

  contactTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 4,
  },

  contactSubtitle: {
    color: "#9CA3AF",
    fontSize: 12.5,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 18,
  },

  contactButton: {
    height: 46,
    borderRadius: 23,
    overflow: "hidden",
    width: "100%",
  },

  contactButtonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "700",
    marginRight: 6,
  },

  versionText: {
    color: "#4B4B55",
    fontSize: 11.5,
    textAlign: "center",
    marginTop: 20,
  },
});

export default settingsStyles;