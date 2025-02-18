import { ACCESS_TOKEN } from '@constants/token';
import { useAuthStore } from '@stores/auth';
import { useEffect } from 'react';

export const AuthStatusWatcher = () => {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN && event.newValue === null) {
        logout(); // ✅ 토큰이 삭제되면 로그아웃 실행
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return null;
};
