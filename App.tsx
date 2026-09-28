import { useEffect } from "react";

import RootNavigator from "./src/navigation";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { configureGoogleSignIn } from "./src/services/googleSignIn";

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}