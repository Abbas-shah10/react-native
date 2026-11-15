import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

const settingsItems = [
  { icon: "👤", label: "Profile", value: "Profile", accent: "bg-blue-100" },
  { icon: "ℹ️", label: "About", value: "App", accent: "bg-purple-100" },
];

const Settings = () => {
  const { logout, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View className="flex-1 bg-slate-950 px-4 py-6">
      <Text className="text-3xl font-bold text-gray-300 text-center  mb-6">
        Settings
      </Text>

      <View className="rounded-2xl bg-slate-950 text-white p-4 shadow-sm">
        {settingsItems.map(({ icon, label, value, accent }) => (
          <Pressable
            key={label}
            onPress={() => router.push(`/settings/${label}`)}
            className="flex-row items-center justify-between border-b border-gray-200 py-3 last:border-b-0"
          >
            <View className="flex-row items-center">
              <View
                className={`h-9 w-9 items-center justify-center rounded-full ${accent}`}
              >
                <Text className="text-lg">{icon}</Text>
              </View>
              <Text className="ml-3 text-base font-medium text-gray-300">
                {label}
              </Text>
            </View>

            <Text className="text-sm text-gray-500">{value}</Text>
          </Pressable>
        ))}
      </View>

      <View>
        <TouchableOpacity
          onPress={handleLogout}
          className="text-center hover:bg-red-600 rounded-2xl border px-4 py-3 bg-red-900 "
        >
          <Text className="text-center text-white">
            {isLoading ? "Loading..." : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
