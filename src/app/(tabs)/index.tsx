import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DashboardScreen() {
  const router = useRouter();
  const user = useAuthStore(
    (state) => (state as { user?: { email?: string | null } }).user,
  );

  const email = user?.email ?? "";

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 px-4 py-4"
    >
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-black  text-sm font-medium">Welcome back,</Text>
          <Text className="text-black text-2xl font-bold">
            {email.slice(0, 5)}
          </Text>
        </View>
        <TouchableOpacity className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full items-center justify-center border border-slate-300 dark:border-slate-700">
          <Text className="text-slate-700 dark:text-slate-300 font-bold">
            {email.slice(0, 1).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task Management */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-black dark:text-white text-xl font-bold">
            My tasks
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Stay focused and get things done
          </Text>
        </View>
        <TouchableOpacity className="bg-blue-600 px-4 py-3 rounded-2xl">
          <Text className="text-white font-semibold">+ New task</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row mb-5">
        <View className="flex-1 bg-blue-600 rounded-2xl p-4 mr-2">
          <Text className="text-blue-100 text-sm">To do</Text>
          <Text className="text-white text-2xl font-bold mt-1">3</Text>
        </View>
        <View className="flex-1 bg-emerald-500 rounded-2xl p-4 ml-2">
          <Text className="text-emerald-50 text-sm">Completed</Text>
          <Text className="text-white text-2xl font-bold mt-1">8</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-black dark:text-white text-lg font-bold">
          Upcoming
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-600 dark:text-blue-400 font-semibold">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-3 border border-slate-100 dark:border-slate-800">
        <View className="flex-row items-start">
          <View className="w-5 h-5 rounded-md border-2 border-blue-500 mt-1 mr-3" />
          <View className="flex-1">
            <Text className="text-black dark:text-white font-semibold text-base">
              Prepare project proposal
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Work · Today, 2:00 PM
            </Text>
          </View>
          <View className="bg-amber-100 dark:bg-amber-900/40 px-2.5 py-1 rounded-full">
            <Text className="text-amber-700 dark:text-amber-300 text-xs font-semibold">
              High
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-3 border border-slate-100 dark:border-slate-800">
        <View className="flex-row items-start">
          <View className="w-5 h-5 rounded-md border-2 border-blue-500 mt-1 mr-3" />
          <View className="flex-1">
            <Text className="text-black dark:text-white font-semibold text-base">
              Review weekly goals
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Personal · Today, 5:00 PM
            </Text>
          </View>
          <View className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
            <Text className="text-slate-600 dark:text-slate-300 text-xs font-semibold">
              Normal
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-800">
        <View className="flex-row items-start">
          <View className="w-5 h-5 rounded-md border-2 border-blue-500 mt-1 mr-3" />
          <View className="flex-1">
            <Text className="text-black dark:text-white font-semibold text-base">
              Book dentist appointment
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Personal · Tomorrow
            </Text>
          </View>
          <View className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
            <Text className="text-slate-600 dark:text-slate-300 text-xs font-semibold">
              Normal
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
