import { auth } from "@/firebase/config";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { create } from "zustand";

interface User {
  username: string;
  email: string;
  password: string;
}

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  setUser: (user: User) => set({ user, isLoading: false }),

  setLoading: (isLoading: boolean) => ({ isLoading }),

  logout: async () => {
    set({ isLoading: true });

    try {
      await signOut(auth);
      set({ user: null, isLoading: false });
      router.replace("/login");
    } catch (error) {
      console.error("Error SIgn out user", error);
      set({ isLoading: false });
    }
  },
}));
