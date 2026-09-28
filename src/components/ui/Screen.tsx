import React from "react";
import {
  StyleSheet,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../../theme";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Screen({
  children,
  style,
}: Props) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});