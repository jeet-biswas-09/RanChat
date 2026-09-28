import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "ranchat:lastSeen:";

export async function getLastSeen(classroomId: string): Promise<number> {
  const value = await AsyncStorage.getItem(PREFIX + classroomId);
  return value ? parseInt(value, 10) : 0;
}

export async function markClassroomSeen(
  classroomId: string,
  at: number = Date.now()
): Promise<void> {
  await AsyncStorage.setItem(PREFIX + classroomId, String(at));
}