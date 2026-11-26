import { auth } from "@/firebase/config";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user } = useAuthStore() as {
    user: typeof auth.currentUser;
    setUser: (user: typeof auth.currentUser) => void;
    isLoading: boolean;
  };
  const router = useRouter();
  return (
    <ScrollView className="bg-slate-950">
      <View className="mb-8 flex-row items-center justify-between py-4">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="rounded-full bg-gray-100 px-4 py-2.5 dark:bg-neutral-800"
        >
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            <Ionicons name="arrow-back" size={20} />
          </Text>
        </Pressable>
        <Text className="text-2xl font-bold tracking-tight text-gray-200">
          Profile
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-blue-600 px-4 py-2.5"
        >
          <Text className="text-sm font-semibold text-white">Edit</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6 items-center rounded-3xl border border-gray-100 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
          <Text className="text-xl font-bold text-white">
            {user?.email?.split("@")[0] || "A"}
          </Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          {user?.email?.split("@")[0]}
        </Text>
        <Text className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          {user?.email}
        </Text>
      </View>
    </ScrollView>
  );
}
