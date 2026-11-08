import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

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

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync().catch((err) =>
        console.warn("Splash hide error:", err),
      );
    }
  }, [appIsReady]);

  if (!appIsReady) {
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
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="task/create"
        options={{ presentation: "modal", title: "New Task" }}
      />
    </Stack>
  );
}
