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
    paddingBottom: 8,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  formContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  iconCircleLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: "#A78BFA",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 30,
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
    marginBottom: 18,
  },

  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.3,
    borderColor: "rgba(139,92,246,0.3)",
    borderRadius: 16,
    backgroundColor: "rgba(139,92,246,0.05)",
    marginBottom: 8,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 15,
  },

  eyeButton: {
    paddingHorizontal: 14,
  },

  inputHint: {
    color: "#6B7280",
    fontSize: 11.5,
    marginBottom: 18,
  },

  errorText: {
    color: "#F87171",
    fontSize: 12.5,
    marginBottom: 14,
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

  switchModeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },

  switchModeText: {
    color: "#9CA3AF",
    fontSize: 13.5,
  },

  switchModeLink: {
    color: "#A78BFA",
    fontSize: 13.5,
    fontWeight: "700",
  },
});

export default styles;