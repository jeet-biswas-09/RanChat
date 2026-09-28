import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfS6agWJA4uZHUzj_fXuGqEVPgdOUt_SE",
  authDomain: "ranchat-9de74.firebaseapp.com",
  projectId: "ranchat-9de74",
  storageBucket: "ranchat-9de74.firebasestorage.app",
  messagingSenderId: "708990720658",
  appId: "1:708990720658:web:a269be75f0b57eaa78a44b",
  measurementId: "G-3KMSPSLNYR",
};

// Avoid re-initializing on fast-refresh
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

// initializeAuth can only be called once — reuse getAuth() if it already ran
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { auth };
export default app;