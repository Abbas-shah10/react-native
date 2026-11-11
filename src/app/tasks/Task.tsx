import { useTaskStore } from "@/store/useTaskStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const Task = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = useTaskStore((state) => state.addTask);

  const createTask = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Please provide a task title!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await addTask(title, description, dueDate, priority);
    } catch (error) {
      console.error("Error creating new task:", error);
      setError(
        error instanceof Error ? error.message : "Error creating new task",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-6 pb-10 pt-5">
        <View className="mb-8 flex-row items-center">
          <Pressable
            onPress={() => router.replace("/")}
            accessibilityRole="button"
            accessibilityLabel="Go to home"
            className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-white"
          >
            <Text className="text-xl text-slate-700">‹</Text>
          </Pressable>
          <View>
            <Text className="text-sm font-medium text-slate-500">MY TASKS</Text>
            <Text className="mt-1 text-2xl font-bold text-slate-900">
              Create a task
            </Text>
          </View>
        </View>

        {/* <View className="mb-6 rounded-3xl bg-indigo-600 p-5">
          <Text className="text-sm font-medium text-indigo-100">
            A fresh start
          </Text>
          <Text className="mt-2 text-xl font-bold text-white">
            Make room for what matters.
          </Text>
          <Text className="mt-1 text-sm leading-5 text-indigo-100">
            Break it down, set a deadline, and get moving.
          </Text>
        </View> */}

        {error && <Text className="text-red-500">{error}</Text>}

        <View className="mb-5">
          <Text className="mb-2 text-sm font-semibold text-slate-800">
            Task title <Text className="text-rose-500">*</Text>
          </Text>
          <TextInput
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-900"
            placeholder="What needs to get done?"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />
        </View>

        <View className="mb-5">
          <Text className="mb-2 text-sm font-semibold text-slate-800">
            Description{" "}
            <Text className="font-normal text-slate-400">(optional)</Text>
          </Text>
          <TextInput
            className="min-h-[112px] rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-900"
            placeholder="Add details or notes..."
            placeholderTextColor="#94a3b8"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View className="mb-5">
          <Text className="mb-2 text-sm font-semibold text-slate-800">
            Due date
          </Text>
          <TextInput
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-900"
            placeholder="e.g. Jun 24, 2025"
            placeholderTextColor="#94a3b8"
            value={dueDate}
            onChangeText={setDueDate}
          />
        </View>

        <View className="mb-8">
          <Text className="mb-3 text-sm font-semibold text-slate-800">
            Priority
          </Text>
          <View className="flex-row">
            {["low", "medium", "high"].map((item) => {
              const selected = priority === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setPriority(item)}
                  className={`mr-3 flex-1 items-center rounded-2xl border py-3 ${selected ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                >
                  <Text
                    className={`text-sm font-semibold ${selected ? "text-indigo-700" : "text-slate-500"}`}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={createTask}
          disabled={loading}
          className="items-center rounded-2xl bg-indigo-600 py-4 active:bg-indigo-700"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">
              Create Task
            </Text>
          )}
        </Pressable>
        <Text className="mt-4 text-center text-xs text-slate-400">
          You can always edit your task later.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Task;
