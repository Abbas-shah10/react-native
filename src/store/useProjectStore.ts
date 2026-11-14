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
  where,
} from "firebase/firestore";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "upcoming" | "inProgress" | "done";
  userId: string;
  createdAt: Date;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  addProject: (name: string, description: string) => Promise<void>;
  fetchProjects: (userId: string) => Promise<void>;
  updateProject: (
    projectId: string,
    updatedFields: Record<string, any>,
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  addProject: async (title: string, description: string): Promise<void> => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw new Error("You must be signed in to create a task.");
    }
    set({ isLoading: true });

    try {
      const newProject: Omit<Project, "id"> = {
        title,
        description,
        status: "upcoming",
        userId: user.uid,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "projects"), {
        ...newProject,
        createdAt: serverTimestamp(),
      });

      set((state) => ({
        projects: [{ id: docRef.id, ...newProject }, ...state.projects],
        isLoading: false,
      }));
    } catch (error: any) {
      console.log("Error adding project:", error);
      set({ isLoading: false });
    }
  },
  fetchProjects: async (userId: string) => {
    try {
      let projectQuery = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc"),
      );

      if (userId) {
        projectQuery = query(
          collection(db, "projects"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
        );
      }

      const querySnapShot = await getDocs(projectQuery);
      const loadedProjects: Project[] = [];

      querySnapShot.forEach((doc) => {
        const projectData = doc.data() as Omit<Project, "id">;
        loadedProjects.push({ ...projectData, id: doc.id });
      });

      set({ projects: loadedProjects, isLoading: false });
    } catch (error: any) {
      console.log(error.message || "Error fetching projects from firebase");
    }
  },
  updateProject: async () => {},
  deleteProject: async (projectId: string) => {
    try {
      const projectRef = doc(db, "projects", projectId);

      await deleteDoc(projectRef);

      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
      }));
    } catch (error: any) {
      console.log(error.message || "Error deleting project from firebase");
    }
  },
}));
