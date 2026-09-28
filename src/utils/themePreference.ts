import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "ranchat:selectedTheme";

export async function getSavedTheme(): Promise<string | null> {
  return AsyncStorage.getItem(THEME_KEY);
}

export async function saveTheme(themeId: string): Promise<void> {
  await AsyncStorage.setItem(THEME_KEY, themeId);
}