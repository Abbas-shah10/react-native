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

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "upcoming" | "inProgress" | "done";
  userId: string;
  createdAt: Date;
}

type ProjectUpdate = Partial<
  Pick<Project, "title" | "description" | "status">
>;

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  addProject: (name: string, description: string) => Promise<void>;
  fetchProjects: (userId: string) => Promise<void>;
  updateProject: (projectId: string, updatedFields: ProjectUpdate) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  addProject: async (title: string, description: string): Promise<void> => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw new Error("You must be signed in to create a project.");
    }
    set({ isLoading: true });

    try {
      const newProject: Omit<Project, "id"> = {
        title: title.trim(),
        description: description.trim(),
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
      set({ isLoading: false });
      console.error("Error adding project:", error);
      throw error;
    }
  },
  fetchProjects: async (userId: string) => {
    set({ isLoading: true });
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
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching projects from Firestore:", error);
      throw error;
    }
  },
  updateProject: async (projectId, updatedFields) => {
    set({ isLoading: true });
    try {
      await updateDoc(doc(db, "projects", projectId), updatedFields);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === projectId ? { ...project, ...updatedFields } : project,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error updating project in Firestore:", error);
      throw error;
    }
  },
  deleteProject: async (projectId: string) => {
    set({ isLoading: true });
    try {
      const projectRef = doc(db, "projects", projectId);

      await deleteDoc(projectRef);

      set((state) => ({
        projects: state.projects.filter((project) => project.id !== projectId),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error deleting project from Firestore:", error);
      throw error;
    }
  },
}));
