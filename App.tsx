import { useEffect } from "react";
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

import RootNavigator from "./src/navigation";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { configureGoogleSignIn } from "./src/services/googleSignIn";

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();

    // Initialize RevenueCat with Public API Key
    Purchases.configure({ apiKey: "test_RhjuwjASEwJPzArfNePhAlVgUep" });
  }, []);

  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}