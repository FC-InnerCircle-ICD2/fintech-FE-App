import { ACCESS_TOKEN } from '@constants/token';
import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
  getAccessToken: () => string | null;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN),
  accessToken: localStorage.getItem(ACCESS_TOKEN),

  login: (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    set({ isAuthenticated: true, accessToken });
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    set({ isAuthenticated: false, accessToken: null });
  },

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),
}));
