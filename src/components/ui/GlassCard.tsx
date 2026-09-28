import React from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { Radius } from "../../theme";

export default function GlassCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlurView intensity={30} tint="dark" style={styles.card}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    overflow: "hidden",
    padding: 18,
  },
});