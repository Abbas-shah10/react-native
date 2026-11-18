import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { auth } from "../firebase/config";
// @ts-expect-error Expo handles this global CSS import at runtime.
import "../global.css";
import { useAuthStore } from "../store/useAuthStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { user, setUser } = useAuthStore();
  const segments = useSegments();

  // Wait for the app and Firebase to be ready.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAppIsReady(true);
    });

    return unsubscribe;
  }, [setUser]);

  // Hide the splash screen after Firebase has checked the login state.
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync().catch((error) =>
        console.warn("Splash screen error:", error),
      );
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0B1220",
        }}
      >
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  const isInAuthGroup = segments[0] === "(auth)";

  if (!user && !isInAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user && isInAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="tasks/index"
        options={{ presentation: "modal", title: "New Task" }}
      />
      <Stack.Screen
        name="projects/index"
        options={{ presentation: "modal", title: "Projects" }}
      />
    </Stack>
  );
}
