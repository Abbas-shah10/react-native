import { auth } from "@/firebase/config";
import { useAuthStore } from "@/store/useAuthStore";
import { useTaskStore } from "@/store/useTaskStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DashboardScreen() {
  const loggedInUser = auth?.currentUser;
  const router = useRouter();
  const user = useAuthStore(
    (state) => (state as { user?: { email?: string | null } }).user,
  );
  const { fetchTasks, tasks, toggleTaskCompletion } = useTaskStore();
  const [completionOverrides, setCompletionOverrides] = useState<
    Record<string, boolean>
  >({});

  const email = user?.email ?? "";

  useEffect(() => {
    if (loggedInUser) {
      fetchTasks(loggedInUser.uid);
    }
  }, [loggedInUser]);

  // Calculate dynamic stats
  const isTaskCompleted = (task: (typeof tasks)[number]) =>
    completionOverrides[task.id] ?? task.completed;
  const todoCount = tasks.filter((task) => !isTaskCompleted(task)).length;
  const completedCount = tasks.filter(isTaskCompleted).length;

  // Helper styles for Priority Badges
  const getPriorityStyles = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return {
          bg: "bg-rose-100 dark:bg-rose-900/40",
          text: "text-rose-700 dark:text-rose-300",
        };
      case "medium":
      case "normal":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/40",
          text: "text-amber-700 dark:text-amber-300",
        };
      default:
        return {
          bg: "bg-slate-100 dark:bg-slate-800",
          text: "text-slate-600 dark:text-slate-300",
        };
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 px-4 py-4 bg-slate-50 dark:bg-slate-950"
    >
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Text className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Welcome back,
          </Text>
          <Text className="font-bold text-2xl text-black dark:text-white mt-0.5">
            {email ? email.split("@")[0] : "User"}
          </Text>
        </View>
        <TouchableOpacity className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full items-center justify-center border border-slate-300 dark:border-slate-700">
          <Text className="text-slate-700 dark:text-slate-300 font-bold text-base">
            {email ? email.slice(0, 1).toUpperCase() : "U"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task Management Title Bar */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1 pr-4">
          <Text className="text-black dark:text-white text-xl font-bold">
            My tasks
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Stay focused and get things done
          </Text>
        </View>
        <TouchableOpacity
          className="bg-blue-600 active:bg-blue-700 px-4 py-3 rounded-2xl shadow-sm"
          onPress={() => router.push("/tasks")}
        >
          <Text className="text-white font-semibold">+ New task</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Counter Badges */}
      <View className="flex-row mb-6">
        <View className="flex-1 bg-blue-600 rounded-2xl p-4 mr-2 shadow-sm">
          <Text className="text-blue-100 text-xs font-semibold uppercase tracking-wider">
            To do
          </Text>
          <Text className="text-white text-3xl font-bold mt-1">
            {todoCount}
          </Text>
        </View>
        <View className="flex-1 bg-emerald-500 rounded-2xl p-4 ml-2 shadow-sm">
          <Text className="text-emerald-50 text-xs font-semibold uppercase tracking-wider">
            Completed
          </Text>
          <Text className="text-white text-3xl font-bold mt-1">
            {completedCount}
          </Text>
        </View>
      </View>

      {/* Subtitle Section */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-black dark:text-white text-lg font-bold">
          Upcoming Tasks
        </Text>
        {tasks.length > 0 && (
          <TouchableOpacity>
            <Text className="text-blue-600 dark:text-blue-400 font-semibold">
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Task Loop Wrapper */}
      <View className="pb-10">
        {tasks.length === 0 ? (
          /* Empty View State */
          <View className="bg-white dark:bg-slate-900 rounded-2xl p-8 items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm">
            <Text className="text-slate-400 dark:text-slate-500 text-base text-center font-medium">
              No upcoming tasks found.{"\n"}Tap "+ New task" to get started!
            </Text>
          </View>
        ) : (
          /* Task List Map Loop */
          tasks.map((task) => {
            const priorityStyle = getPriorityStyles(task.priority);
            const isCompleted = isTaskCompleted(task);
            return (
              <View
                key={task.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-3 border border-slate-100 dark:border-slate-800 shadow-sm"
              >
                <View className="flex-row items-start">
                  {/* Dynamic Status Ring indicator */}
                  <TouchableOpacity
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isCompleted }}
                    accessibilityLabel={`Mark ${task.title} as ${isCompleted ? "incomplete" : "complete"}`}
                    onPress={() => {
                      setCompletionOverrides((current) => ({
                        ...current,
                        [task.id]: !isCompleted,
                      }));
                      toggleTaskCompletion(task.id, isCompleted);
                    }}
                    className={`w-5 h-5 rounded-full border-2 mt-1 mr-3 items-center justify-center ${isCompleted ? "border-emerald-500 bg-emerald-500" : "border-blue-500"}`}
                  >
                    {isCompleted && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </TouchableOpacity>

                  <View className="flex-1">
                    <Text
                      className={`font-semibold text-base text-black dark:text-white ${isCompleted ? "line-through text-slate-400 dark:text-slate-500" : ""}`}
                    >
                      {task.title}
                    </Text>

                    {task.description ? (
                      <Text
                        className="text-slate-400 dark:text-slate-500 text-sm mt-0.5"
                        numberOfLines={2}
                      >
                        {task.description}
                      </Text>
                    ) : null}

                    <Text className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-medium">
                      {task.dueDate
                        ? `📅 Due: ${task.dueDate}`
                        : "📅 No due date"}
                    </Text>
                  </View>

                  {/* Priority Tag Element */}
                  <View
                    className={`${priorityStyle.bg} px-2.5 py-1 rounded-full`}
                  >
                    <Text
                      className={`${priorityStyle.text} text-xs font-semibold`}
                    >
                      {task.priority || "Normal"}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
