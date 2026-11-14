import { useTaskStore } from "@/store/useTaskStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

const projects = [
  {
    name: "Website refresh",
    tasks: "8 of 12 tasks",
    progress: 66,
    icon: "✦",
    iconStyle: "bg-amber-400/15",
    progressStyle: "bg-amber-400",
  },
  {
    name: "Mobile app",
    tasks: "4 of 10 tasks",
    progress: 40,
    icon: "◈",
    iconStyle: "bg-sky-400/15",
    progressStyle: "bg-sky-400",
  },
];

const Board = () => {
  const { tasks, toggleTaskCompletion, fetchTasks } = useTaskStore();
  const user = useAuthStore((state) => state.user);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const completedTasks = tasks.filter((task) => task.completed === true).length;
  const weeklyCompleted = completedTasks;
  const weeklyProgress = Math.min((weeklyCompleted / 18) * 100, 100);

  useEffect(() => {
    if (user) {
      void fetchTasks(user.uid);
    }
  }, [fetchTasks, user]);

  const handleTaskCompletion = async (
    taskId: string,
    currentCompletion: boolean,
  ) => {
    try {
      await toggleTaskCompletion(taskId, currentCompletion);
    } catch {
      Alert.alert("Couldn't update task", "Please try again.");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-5 pb-10 pt-14"
    >
      <View className="mb-8 flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-medium uppercase text-slate-400">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text className="mt-1 text-3xl font-bold text-white">Your board</Text>
        </View>
        <View className="h-12 w-12 items-center justify-center rounded-full bg-indigo-500">
          <Text className="text-lg font-bold text-white">A</Text>
        </View>
      </View>

      <View className="mb-7 rounded-3xl bg-indigo-600 p-5">
        <Text className="text-sm font-medium text-indigo-100">
          WEEKLY PROGRESS
        </Text>
        <View className="mt-3 flex-row items-end justify-between">
          <Text className="text-3xl font-bold text-white">
            {weeklyCompleted}
            <Text className="text-lg font-medium text-indigo-200">
              {" "}
              / 18 tasks
            </Text>
          </Text>
          <Text className="text-sm font-semibold text-indigo-100">
            {Math.round(weeklyProgress)}%
          </Text>
        </View>
        <View className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-400">
          <View
            className="h-full rounded-full bg-white"
            style={{ width: `${weeklyProgress}%` }}
          />
        </View>
      </View>

      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Today</Text>
        <Text className="text-sm font-semibold text-indigo-300">
          {tasks.length} tasks
        </Text>
      </View>

      <View className="gap-3">
        {tasks.map((task) => {
          const done = task.completed;
          const markerStyle = done
            ? "border-emerald-400 bg-emerald-400"
            : task.status === "inProgress"
              ? "border-indigo-400"
              : "border-slate-600";
          const badgeStyle = done
            ? "bg-emerald-400/15"
            : task.status === "inProgress"
              ? "bg-indigo-400/15"
              : "bg-slate-800";
          const badgeTextStyle = done
            ? "text-emerald-300"
            : task.status === "inProgress"
              ? "text-indigo-300"
              : "text-slate-300";
          const label = done
            ? "Done"
            : task.status === "inProgress"
              ? "In progress"
              : "Upcoming";

          return (
            <Pressable
              key={task.id}
              accessibilityRole="checkbox"
              onPress={() =>
                void handleTaskCompletion(task.id, task.completed)
              }
              accessibilityLabel={`${task.title}, ${label}`}
              accessibilityState={{ checked: done }}
              className="flex-row items-center rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <View
                className={`mr-4 h-6 w-6 rounded-full border-2 ${markerStyle}`}
              >
                {done && (
                  <Text className="text-center text-xs font-bold text-white">
                    ✓
                  </Text>
                )}
              </View>
              <View className="flex-1">
                <Text
                  className={`font-semibold text-base text-black dark:text-white ${done ? "line-through text-slate-400 dark:text-slate-500" : ""}`}
                >
                  {task.title}
                </Text>
              </View>
              <View className={`rounded-full px-3 py-1 ${badgeStyle}`}>
                <Text className={`text-xs font-semibold ${badgeTextStyle}`}>
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View className="mb-4 mt-9 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Projects</Text>
        <Pressable
          onPress={() => setSelectedProject(null)}
          accessibilityRole="button"
        >
          <Text className="text-sm font-semibold text-indigo-300">
            {selectedProject ? "Clear selection" : "Select a project"}
          </Text>
        </Pressable>
      </View>
      <View className="flex-row gap-3">
        {projects.map((project) => {
          const selected = selectedProject === project.name;
          return (
            <Pressable
              key={project.name}
              onPress={() => setSelectedProject(selected ? null : project.name)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              className={`flex-1 rounded-2xl border bg-slate-900 p-4 ${selected ? "border-indigo-400" : "border-slate-800"}`}
            >
              <View
                className={`mb-4 h-10 w-10 items-center justify-center rounded-xl ${project.iconStyle}`}
              >
                <Text className="text-lg">{project.icon}</Text>
              </View>
              <Text className="text-base font-semibold text-white">
                {project.name}
              </Text>
              <Text className="mt-1 text-sm text-slate-400">
                {selected ? "Project selected" : project.tasks}
              </Text>
              <View className="mt-4 h-1.5 rounded-full bg-slate-700">
                <View
                  className={`h-full rounded-full ${project.progressStyle}`}
                  style={{ width: `${project.progress}%` }}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Board;
