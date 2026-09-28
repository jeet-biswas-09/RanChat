import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  icon?: string;
  hideCancel?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  destructive = false,
  icon,
  hideCancel = false,
  onConfirm,
  onCancel,
}: Props) {
  const accentColor = destructive ? "#F87171" : "#8B5CF6";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    borderColor: `${accentColor}55`,
                    backgroundColor: `${accentColor}15`,
                  },
                ]}
              >
                <Ionicons
                  name={icon ?? (destructive ? "warning-outline" : "help-circle-outline")}
                  size={28}
                  color={accentColor}
                />
              </View>

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              <View style={styles.buttonRow}>
                {!hideCancel && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    activeOpacity={0.8}
                    onPress={onCancel}
                  >
                    <Text style={styles.cancelText}>{cancelText}</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    { backgroundColor: accentColor },
                    hideCancel && { marginLeft: 0 },
                  ]}
                  activeOpacity={0.85}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  card: {
    width: "100%",
    backgroundColor: "#0D0D10",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.25)",
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 22,
    alignItems: "center",
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },

  message: {
    color: "#9CA3AF",
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 22,
  },

  buttonRow: {
    flexDirection: "row",
    width: "100%",
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.3,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  cancelText: {
    color: "#D1D5DB",
    fontSize: 14.5,
    fontWeight: "700",
  },

  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 14.5,
    fontWeight: "700",
  },
});