import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@api/services/auth';
import { ROUTES } from '@constants/routes';
import useModal from '@hooks/useModal';
import { useAuthStore } from '@stores/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { openDialog } = useModal();
  const loginSuccess = useAuthStore((state) => state.login); // ✅ 수정된 부분

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (loginData: { email: string; password: string }) => {
      return authService.login(loginData);
    },
    onSuccess: (res) => {
      if (res.ok) {
        const accessToken = res.data.accessToken;
        loginSuccess(accessToken); // ✅ 수정: Zustand 상태 업데이트
        navigate(ROUTES.PAYMENT.QR);
      }
    },
    onError: async (e) => {
      openDialog('alert', {
        title: '로그인 실패',
        description: (
          <div>
            <p>{e.message}</p>
          </div>
        ),
      });
    },
  });

  const logout = useAuthStore((state) => state.logout); // ✅ Zustand에서 바로 가져오기

  return { login, logout };
};
