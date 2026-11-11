import { db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  userId: string;
  createdAt: Date;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  addTask: (title: string, description: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,

  addTask: async (title: string, description: string) => {
    const user = useAuthStore((state) => state.user);
    set({ isLoading: true });
    try {
      const newTask = {
        title,
        description,
        completed: false,
        userId: user.uid,
        createdAt: new Date(),
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
  fetchTasks: async () => {},
}));
