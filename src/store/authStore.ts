import { create } from "zustand";
// import { User } from '../types';
import { supabase } from "../lib/supabase";

interface AuthState {
	user: any | null;
	setUser: (user: any | null) => void;
	signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	signOut: async () => {
		await supabase.auth.signOut();
		set({ user: null });
	},
}));
