import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "ranchat:userId";
const USER_NAME_KEY = "ranchat:userName";

const adjectives = [
  "Silent",
  "Hidden",
  "Shadow",
  "Masked",
  "Ghost",
  "Cloaked",
  "Nameless",
  "Phantom",
  "Quiet",
  "Unseen",
];

const nouns = [
  "Fox",
  "Wolf",
  "Raven",
  "Falcon",
  "Panther",
  "Owl",
  "Cobra",
  "Hawk",
  "Tiger",
  "Wanderer",
];

function randomId(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function randomAnonName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 90 + 10);
  return `${adjective} ${noun} ${number}`;
}

export async function getAnonymousIdentity(): Promise<{
  userId: string;
  userName: string;
}> {
  let userId = await AsyncStorage.getItem(USER_ID_KEY);
  let userName = await AsyncStorage.getItem(USER_NAME_KEY);

  if (!userId) {
    userId = randomId();
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  }

  if (!userName) {
    userName = randomAnonName();
    await AsyncStorage.setItem(USER_NAME_KEY, userName);
  }

  return { userId, userName };
}