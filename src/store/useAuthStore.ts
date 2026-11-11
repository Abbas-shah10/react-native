import { auth } from "@/firebase/config";
import { router } from "expo-router";
import { signOut, type User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  setLoading: (isLoading) => set({ isLoading }),

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
