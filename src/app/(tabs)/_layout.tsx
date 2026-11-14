import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { View } from "react-native";

export default function Layout() {
  const renderTabIcon =
    (
      activeIcon: ComponentProps<typeof Ionicons>["name"],
      inactiveIcon: ComponentProps<typeof Ionicons>["name"],
    ) =>
    // eslint-disable-next-line react/display-name
    ({
      color,
      focused,
      size,
    }: {
      color: string | null;
      focused: boolean;
      size: number;
    }) => (
      <View
        style={{
          minWidth: 42,
          height: 30,
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          backgroundColor: focused ? "#2563EB" : "transparent",
        }}
      >
        <Ionicons
          name={focused ? activeIcon : inactiveIcon}
          size={size || 21}
          color={focused ? "#FFFFFF" : (color ?? undefined)}
        />
      </View>
    );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F8FAFC",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#111B36",
          borderTopColor: "#263454",
          borderTopWidth: 1,
          height: 76,
          paddingTop: 7,
          paddingBottom: 9,
          elevation: 16,
          shadowColor: "#1E3A5F",
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.08,
          shadowRadius: 14,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: renderTabIcon("home", "home-outline"),
        }}
      />
      <Tabs.Screen
        name="board"
        options={{
          headerShown: false,
          tabBarIcon: renderTabIcon("albums", "albums-outline"),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          headerShown: false,
          tabBarIcon: renderTabIcon("analytics", "analytics-outline"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: renderTabIcon("settings", "settings-outline"),
        }}
      />
    </Tabs>
  );
}
