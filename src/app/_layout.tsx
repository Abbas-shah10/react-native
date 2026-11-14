import { Ionicons } from "@expo/vector-icons";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { auth } from "../firebase/config";
// @ts-ignore React Native's bundler handles this side-effect stylesheet import.
import "../global.css";
import { useAuthStore } from "../store/useAuthStore";

SplashScreen.preventAutoHideAsync();

function SplashBrand() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#150b3d",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          width: 268,
          height: 182,
          paddingTop: 18,
          borderRadius: 28,
          borderWidth: 4,
          borderColor: "#5742b4",
          backgroundColor: "#3f2c7a",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000000",
          shadowOpacity: 0.28,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 18,
        }}
      >
        <View
          style={{
            width: 136,
            height: 118,
            borderRadius: 28,
            backgroundColor: "#f5f2ff",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000000",
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 8 },
          }}
        >
          <View
            style={{
              width: 92,
              height: 92,
              borderRadius: 24,
              backgroundColor: "#f5f2ff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="checkmark" size={72} color="#3f2c7a" />
          </View>
        </View>
      </View>

      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text
          style={{
            color: "#f4d36a",
            fontSize: 38,
            fontWeight: "800",
            letterSpacing: -1.5,
          }}
        >
          TaskFlow
        </Text>
        <Text
          style={{
            marginTop: 6,
            color: "#f7efd4",
            fontSize: 17,
            fontWeight: "700",
            letterSpacing: 0.2,
          }}
        >
          Plan it. Flow it. Done.
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 26,
          gap: 10,
        }}
      >
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: index === 1 ? "#f4d36a" : "rgba(255,255,255,0.58)",
            }}
          />
        ))}
      </View>
    </View>
  );
}

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

  if (!appIsReady || isAuthLoading) {
    return <SplashBrand />;
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
