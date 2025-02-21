import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ModalProvider from './providers/modalProvider';
import { AuthStatusWatcher } from '@providers/AuthStatusWatcher';
import { useAuthStore } from '@stores/auth';
import { useEffect } from 'react';

// MSW를 개발 환경에서만 시작하도록 설정합니다.
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('@mocks/browser');
  worker.start();
}

const queryClient = new QueryClient();
function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    console.log('현재 로그인 상태:', isAuthenticated);
  }, [isAuthenticated]);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthStatusWatcher />
      <RouterProvider router={router} />
      <ModalProvider />
    </QueryClientProvider>
  );
}

export default App;
