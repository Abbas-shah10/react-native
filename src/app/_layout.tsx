import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onIdTokenChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { auth } from "../firebase/config";
// @ts-ignore React Native's bundler handles this side-effect stylesheet import.
import "../global.css";
import { useAuthStore } from "../store/useAuthStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const {
    user,
    setUser,
    isLoading: isAuthLoading,
  } = useAuthStore() as {
    user: typeof auth.currentUser;
    setUser: (user: typeof auth.currentUser) => void;
    isLoading: boolean;
  };
  const segments = useSegments();

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

  // 2. Sync Firebase auth and clear locally persisted state for invalid sessions.
  useEffect(() => {
    let isActive = true;

    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (!currentUser) {
        if (isActive) setUser(null);
        return;
      }

      try {
        // A forced refresh lets Firebase detect revoked refresh tokens/deleted users.
        await currentUser.getIdToken(true);
        if (isActive && auth.currentUser?.uid === currentUser.uid) {
          setUser(currentUser);
        }
      } catch (error) {
        const code = (error as { code?: string })?.code;
        const invalidSession = [
          "auth/user-token-expired",
          "auth/invalid-user-token",
          "auth/user-disabled",
          "auth/user-not-found",
        ].includes(code ?? "");

        if (invalidSession && auth.currentUser?.uid === currentUser.uid) {
          await signOut(auth).catch((signOutError) =>
            console.warn(
              "Could not clear invalid Firebase session:",
              signOutError,
            ),
          );
          if (isActive) setUser(null);
        } else if (isActive && auth.currentUser?.uid === currentUser.uid) {
          // Preserve the session on transient network failures.
          setUser(currentUser);
        }
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
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

  const isInAuthGroup = segments[0] === "(auth)";
  if (!user && !isInAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }
  if (user && isInAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
