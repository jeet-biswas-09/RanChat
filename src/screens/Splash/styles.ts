import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#8B5CF6",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 10,
    color: "#9CA3AF",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});

export default styles;