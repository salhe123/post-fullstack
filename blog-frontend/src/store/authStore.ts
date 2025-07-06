
import { create } from 'zustand';

interface AuthState {
  user: { email: string; token: string; role: string } | null;
  setUser: (user: { email: string; token: string; role: string } | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
  },
}));
