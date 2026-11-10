import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { auth } from "../firebase/config";
import { useAuthStore } from "../store/useAuthStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setUser, isLoading: isAuthLoading } = useAuthStore();

  // 1. Handle app preparation assets
  useEffect(() => {
    async function prepareApp() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepareApp();
  }, []);

  // 2. Handle Firebase Auth subscription syncing to Zustand
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [setUser]);

  // 3. Hide splash screen ONLY when app assets are ready AND firebase auth check is done
  useEffect(() => {
    if (appIsReady && !isAuthLoading) {
      SplashScreen.hideAsync().catch((err) =>
        console.warn("Splash hide error:", err),
      );
    }
  }, [appIsReady, isAuthLoading]);

  // Show your styled loading container until everything is ready
  if (!appIsReady || isAuthLoading) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0B1220", // Matches your app.json background
          height: "100vh",
          width: "100vw",
        }}
      >
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="task/create"
        options={{ presentation: "modal", title: "New Task" }}
      />
    </Stack>
  );
}
