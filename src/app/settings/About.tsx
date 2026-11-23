import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const features = [
  {
    icon: "checkmark-circle-outline" as const,
    title: "Stay on top of tasks",
    description: "Organize your work and keep track of what needs to get done.",
  },
  {
    icon: "folder-open-outline" as const,
    title: "Manage projects",
    description: "Keep related tasks together and move projects forward.",
  },
  {
    icon: "bar-chart-outline" as const,
    title: "See your progress",
    description: "Get a clearer picture of your productivity and progress.",
  },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 36 }}
    >
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="mb-8 h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-900"
      >
        <Ionicons name="arrow-back" size={20} color="#E2E8F0" />
      </Pressable>

      <View className="mb-8 items-center">
        <View className="mb-5 h-20 w-20 items-center justify-center rounded-3xl bg-blue-600">
          <Ionicons name="checkmark-done" size={40} color="#FFFFFF" />
        </View>
        <Text className="text-3xl font-bold text-white">TaskFlow</Text>
        <Text className="mt-2 text-center text-base leading-6 text-slate-400">
          Make every day more organized.
        </Text>
        <View className="mt-4 rounded-full border border-slate-700 bg-slate-900 px-3 py-1">
          <Text className="text-xs font-medium text-slate-300">Version 1.0.0</Text>
        </View>
      </View>

      <View className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <Text className="text-lg font-semibold text-white">About the app</Text>
        <Text className="mt-2 text-sm leading-6 text-slate-400">
          TaskFlow helps you plan tasks, manage projects, and understand your
          progress—all in one place. Spend less time keeping track of work and
          more time getting it done.
        </Text>
      </View>

      <Text className="mb-3 ml-1 text-sm font-semibold uppercase tracking-wider text-slate-500">
        Made for your workflow
      </Text>
      <View className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 px-4">
        {features.map((feature, index) => (
          <View
            key={feature.title}
            className={`flex-row items-start py-4 ${
              index < features.length - 1 ? "border-b border-slate-800" : ""
            }`}
          >
            <View className="mr-3 mt-0.5 h-10 w-10 items-center justify-center rounded-xl bg-blue-950">
              <Ionicons name={feature.icon} size={20} color="#60A5FA" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-slate-100">
                {feature.title}
              </Text>
              <Text className="mt-1 text-sm leading-5 text-slate-400">
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text className="mt-8 text-center text-xs text-slate-600">
        © 2026 TaskFlow
      </Text>
    </ScrollView>
  );
}
