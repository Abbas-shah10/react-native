import { useRouter } from "expo-router";
import { useState } from "react";
import {
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
  const [priority, setPriority] = useState("Medium");

  const createTask = () => {
    if (!title.trim()) {
      Alert.alert(
        "Task title required",
        "Add a title before creating your task.",
      );
      return;
    }

    Alert.alert("Task created", `“${title.trim()}” is ready to go.`);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
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

        <View className="mb-6 rounded-3xl bg-indigo-600 p-5">
          <Text className="text-sm font-medium text-indigo-100">
            A fresh start
          </Text>
          <Text className="mt-2 text-xl font-bold text-white">
            Make room for what matters.
          </Text>
          <Text className="mt-1 text-sm leading-5 text-indigo-100">
            Break it down, set a deadline, and get moving.
          </Text>
        </View>

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
            {["Low", "Medium", "High"].map((item) => {
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
          className="items-center rounded-2xl bg-indigo-600 py-4 active:bg-indigo-700"
        >
          <Text className="text-base font-bold text-white">Create task</Text>
        </Pressable>
        <Text className="mt-4 text-center text-xs text-slate-400">
          You can always edit your task later.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Task;
