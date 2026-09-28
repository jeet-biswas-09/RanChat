import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "dark" | "light";

export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  primaryLight: string;
  text: string;
  textSecondary: string;
  border: string;
  statusBarStyle: "light" | "dark";
};

const darkColors: ThemeColors = {
  background: "#050505",
  surface: "#0D0D10",
  primary: "#8B5CF6",
  primaryLight: "#A78BFA",
  text: "#FFFFFF",
  textSecondary: "#9CA3AF",
  border: "rgba(139,92,246,0.3)",
  statusBarStyle: "light",
};

const lightColors: ThemeColors = {
  background: "#F5F3FF",
  surface: "#FFFFFF",
  primary: "#7C3AED",
  primaryLight: "#8B5CF6",
  text: "#18181B",
  textSecondary: "#52525B",
  border: "rgba(124,58,237,0.25)",
  statusBarStyle: "dark",
};

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_MODE_KEY = "ranchat:themeMode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    AsyncStorage.getItem(THEME_MODE_KEY).then((saved) => {
      if (saved === "light" || saved === "dark") setMode(saved);
    });
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === "dark" ? "light" : "dark";
      AsyncStorage.setItem(THEME_MODE_KEY, next);
      return next;
    });
  };

  const colors = mode === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}