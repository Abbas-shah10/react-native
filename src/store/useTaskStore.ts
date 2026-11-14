import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "upcoming" | "inProgress" | "done";
  completed: boolean;
  priority: "low" | "medium" | "high";
  userId: string;
  createdAt: Date;
  dueDate: string | null;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  addTask: (
    ttitle: string,
    description: string,
    dueDate: string,
    priority: Task["priority"],
  ) => Promise<void>;
  fetchTasks: (userId: string) => Promise<void>;
  updateTask: (
    taskId: string,
    updatedFields: Record<string, any>,
  ) => Promise<void>;
  toggleTaskCompletion: (
    taskId: string,
    currentStatus: boolean,
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,

  addTask: async (
    title: string,
    description: string,
    dueDate: string,
    priority: Task["priority"],
  ): Promise<void> => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw new Error("You must be signed in to create a task.");
    }

    set({ isLoading: true });
    try {
      const newTask = {
        title,
        description,
        completed: false,
        userId: user.uid,
        createdAt: new Date(),
        status: "upcoming" as Task["status"],
        priority,
        dueDate: dueDate || null,
      };

      const docRef = await addDoc(collection(db, "tasks"), {
        ...newTask,
        createdAt: serverTimestamp(),
      });

      set((state) => ({
        tasks: [{ id: docRef.id, ...newTask }, ...state.tasks],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error adding task:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  fetchTasks: async (userId: string) => {
    set({ isLoading: true });
    try {
      let taskQuery = query(
        collection(db, "tasks"),
        orderBy("createdAt", "desc"),
      );

      if (userId) {
        taskQuery = query(
          collection(db, "tasks"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
        );
      }

      const querySnapShot = await getDocs(taskQuery);
      const loadedTasks: Task[] = [];

      querySnapShot.forEach((doc) => {
        loadedTasks.push({ id: doc.id, ...doc.data() } as Task);
      });

      set({ tasks: loadedTasks, isLoading: false });
    } catch (error: any) {
      console.log(error.message || "Error fetching tasks from firebase");
    }
  },
  updateTask: async (taskId: string, updatedFields: Record<string, any>) => {
    set({ isLoading: true });
    try {
      const taskRef = doc(db, "tasks", taskId);

      await updateDoc(taskRef, updatedFields);

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updateDoc } : task,
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      console.log("Error updating task in Firestore:", error);
    }
  },
  toggleTaskCompletion: async (taskId: string, currentStatus: boolean) => {
    set({ isLoading: true });
    try {
      const taskRef = doc(db, "tasks", taskId);

      await updateDoc(taskRef, { completed: !currentStatus });

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !currentStatus } : task,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error updating task in Firestore:", error);
      throw error;
    }
  },
  deleteTask: async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);

      await deleteDoc(taskRef);

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error("Error deleting task from Firestore:", error);
      throw error;
    }
  },
}));
