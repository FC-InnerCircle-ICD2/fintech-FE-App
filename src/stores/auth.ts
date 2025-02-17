import { ACCESS_TOKEN } from '@constants/token';
import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN),

  login: (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    set({ isAuthenticated: true }); // ✅ 상태 업데이트
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    set({ isAuthenticated: false });
  },
}));
