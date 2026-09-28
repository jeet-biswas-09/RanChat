import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  // ---------- Shared header ----------
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

  // ---------- Form (Create / Join) ----------
  formContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  iconCircleLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  formTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  formSubtitle: {
    color: "#9CA3AF",
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 8,
  },

  inputLabel: {
    color: "#C4B5FD",
    fontSize: 12.5,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 8,
  },

  textInput: {
    borderWidth: 1.3,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 15,
    backgroundColor: "rgba(139,92,246,0.05)",
    marginBottom: 8,
  },

  codeInput: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 6,
    textAlign: "center",
    textTransform: "uppercase",
  },

  inputHint: {
    color: "#6B7280",
    fontSize: 11.5,
    marginBottom: 24,
  },

  errorText: {
    color: "#F87171",
    fontSize: 12.5,
    marginBottom: 16,
    textAlign: "center",
  },

  primaryButton: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    marginTop: 8,
  },

  primaryButtonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#6C2BFF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },

  primaryButtonDisabled: {
    opacity: 0.5,
  },

  // ---------- Success state (after creating a classroom) ----------
  successWrap: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  successIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: "#34D399",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,

    shadowColor: "#34D399",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  successTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },

  successSubtitle: {
    color: "#9CA3AF",
    fontSize: 13.5,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 20,
  },

  codeCard: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "rgba(139,92,246,0.4)",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "rgba(139,92,246,0.06)",
  },

  codeCardLabel: {
    color: "#9CA3AF",
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 10,
  },

  codeCardValue: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 8,
    marginBottom: 12,
  },

  copyRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  copyRowText: {
    color: "#A78BFA",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },

  expiryNote: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  expiryNoteText: {
    color: "#9CA3AF",
    fontSize: 12,
    marginLeft: 6,
  },

  // ---------- Chat screen ----------
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(139,92,246,0.15)",
  },

  chatHeaderTextWrap: {
    flex: 1,
  },

  chatHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  chatHeaderCode: {
    color: "#A78BFA",
    fontSize: 11.5,
    marginTop: 2,
  },

  chatHeaderIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },

  bubbleRow: {
    marginBottom: 12,
    maxWidth: "80%",
  },

  bubbleRowMine: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },

  bubbleRowTheirs: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },

  senderName: {
    color: "#A78BFA",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 3,
    marginLeft: 4,
  },

  bubble: {
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  bubbleMine: {
    backgroundColor: "#6C2BFF",
    borderBottomRightRadius: 4,
  },

  bubbleTheirs: {
    backgroundColor: "#17171B",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderBottomLeftRadius: 4,
  },

  bubbleText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    lineHeight: 20,
  },

  bubbleTime: {
    color: "#6B7280",
    fontSize: 10,
    marginTop: 4,
    marginHorizontal: 4,
  },

  emptyChatWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 80,
  },

  emptyChatTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 6,
    textAlign: "center",
  },

  emptyChatSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(139,92,246,0.15)",
    backgroundColor: "#050505",
  },

  attachButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },

  messageInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14.5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    backgroundColor: "rgba(139,92,246,0.06)",
    maxHeight: 100,
    marginHorizontal: 6,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  sendButtonDisabled: {
    opacity: 0.4,
  },

  // ---------- Info Action Sheet ----------
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  sheetContainer: {
    backgroundColor: "#0D0D10",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    borderBottomWidth: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 30,
  },

  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "center",
    marginBottom: 14,
  },

  sheetItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  sheetIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(139,92,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  sheetIconWrapDestructive: {
    backgroundColor: "rgba(248,113,113,0.12)",
  },

  sheetItemText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  sheetItemTextDestructive: {
    color: "#F87171",
  },

  // ---------- Members / list screens ----------
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  memberAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(139,92,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  memberName: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
  },

  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.4)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },

  memberBadgeText: {
    color: "#FBBF24",
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 3,
  },

  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: -60,
  },

  emptyIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  emptySubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },

  // ---------- Classroom Settings ----------
  settingsScroll: {
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

  settingsCard: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    overflow: "hidden",
  },

  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  settingsRowLast: {
    borderBottomWidth: 0,
  },

  settingsIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(139,92,246,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingsTextWrap: {
    flex: 1,
    marginRight: 10,
  },

  settingsTitle: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
    marginBottom: 2,
  },

  settingsSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    lineHeight: 16,
  },

  durationRow: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingBottom: 14,
  },

  durationChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
  },

  durationChipActive: {
    backgroundColor: "rgba(139,92,246,0.15)",
    borderColor: "#8B5CF6",
  },

  durationChipText: {
    color: "#C4B5FD",
    fontSize: 12.5,
    fontWeight: "700",
  },

  disabledBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.35)",
    backgroundColor: "rgba(251,191,36,0.08)",
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 14,
    marginBottom: 14,
  },

  disabledBannerText: {
    color: "#FBBF24",
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },

  dangerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  dangerIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(248,113,113,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  dangerTitle: {
    color: "#F87171",
    fontSize: 14.5,
    fontWeight: "700",
  },
});

export default styles;