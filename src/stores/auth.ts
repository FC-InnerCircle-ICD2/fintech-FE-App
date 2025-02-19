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
  isAuthenticated: !!sessionStorage.getItem(ACCESS_TOKEN),
  accessToken: sessionStorage.getItem(ACCESS_TOKEN),

  login: (accessToken: string) => {
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    set({ isAuthenticated: true, accessToken });
  },

  logout: () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    set({ isAuthenticated: false, accessToken: null });
  },

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),
}));
