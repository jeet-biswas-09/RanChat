import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "ranchat:setting:";

export async function getBoolSetting(
  key: string,
  defaultValue: boolean
): Promise<boolean> {
  const value = await AsyncStorage.getItem(PREFIX + key);
  if (value === null) return defaultValue;
  return value === "true";
}

export async function saveBoolSetting(
  key: string,
  value: boolean
): Promise<void> {
  await AsyncStorage.setItem(PREFIX + key, value ? "true" : "false");
}