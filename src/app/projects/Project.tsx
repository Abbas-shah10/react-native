import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import type { Project } from "@/store/useProjectStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const projectStatuses: Project["status"][] = [
  "upcoming",
  "inProgress",
  "done",
];

const statusLabels: Record<Project["status"], string> = {
  upcoming: "Upcoming",
  inProgress: "In progress",
  done: "Done",
};

const ProjectScreen = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const {
    projects,
    isLoading,
    addProject,
    fetchProjects,
    updateProject,
    deleteProject,
  } = useProjectStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) {
      void fetchProjects(user.uid).catch(() => {
        Alert.alert("Couldn't load projects", "Please try again.");
      });
    }
  }, [fetchProjects, user]);

  const createProject = async () => {
    if (!title.trim()) {
      Alert.alert("Project name required", "Enter a name for your project.");
      return;
    }
    try {
      await addProject(title, description);
      setTitle("");
      setDescription("");
    } catch (error) {
      Alert.alert(
        "Couldn't create project",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  const changeStatus = async (project: Project, status: Project["status"]) => {
    try {
      await updateProject(project.id, { status });
    } catch {
      Alert.alert("Couldn't update project", "Please try again.");
    }
  };

  const confirmDelete = (project: Project) => {
    Alert.alert(
      "Delete project?",
      `“${project.title}” will be permanently deleted.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            void deleteProject(project.id).catch(() => {
              Alert.alert("Couldn't delete project", "Please try again.");
            });
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-5 pb-10 pt-14"
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-8 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-slate-900"
        >
          <Text className="text-xl text-white">‹</Text>
        </Pressable>
        <View>
          <Text className="text-sm font-medium text-slate-400">
            YOUR WORKSPACE
          </Text>
          <Text className="mt-1 text-2xl font-bold text-white">
            Manage projects
          </Text>
        </View>
      </View>

      <View className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-5">
        <Text className="mb-4 text-lg font-bold text-white">
          Create a project
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Project name"
          placeholderTextColor="#94a3b8"
          accessibilityLabel="Project name"
          returnKeyType="next"
          className="mb-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-base text-white"
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description (optional)"
          placeholderTextColor="#94a3b8"
          accessibilityLabel="Project description"
          multiline
          textAlignVertical="top"
          className="mb-4 min-h-24 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-base text-white"
        />
        <Pressable
          onPress={() => void createProject()}
          disabled={isLoading}
          accessibilityRole="button"
          className="items-center rounded-2xl bg-indigo-600 py-4 disabled:opacity-60"
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="font-semibold text-white">Create project</Text>
          )}
        </Pressable>
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Your projects</Text>
        <Text className="text-sm text-slate-400">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </Text>
      </View>

      {projects.length === 0 && !isLoading ? (
        <View className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <Text className="text-center text-slate-400">
            No projects yet. Create one above to get started.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          {projects.map((project) => (
            <View
              key={project.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <View className="mb-4 flex-row items-start justify-between">
                <View className="mr-3 flex-1">
                  <Text className="text-base font-semibold text-white">
                    {project.title}
                  </Text>
                  {project.description ? (
                    <Text className="mt-1 text-sm text-slate-400">
                      {project.description}
                    </Text>
                  ) : null}
                </View>
                <Pressable
                  onPress={() => confirmDelete(project)}
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${project.title}`}
                  className="rounded-lg px-2 py-1"
                >
                  <Text className="text-sm font-semibold text-rose-300">
                    Delete
                  </Text>
                </Pressable>
              </View>
              <Text className="mb-2 text-xs font-semibold uppercase text-slate-500">
                Status
              </Text>
              <View className="flex-row gap-2">
                {projectStatuses.map((status) => {
                  const selected = project.status === status;
                  return (
                    <Pressable
                      key={status}
                      onPress={() => void changeStatus(project, status)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      className={`flex-1 items-center rounded-xl border px-2 py-2 ${selected ? "border-indigo-400 bg-indigo-500/15" : "border-slate-700 bg-slate-950"}`}
                    >
                      <Text
                        className={`text-xs font-semibold ${selected ? "text-indigo-300" : "text-slate-400"}`}
                      >
                        {statusLabels[status]}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ProjectScreen;
