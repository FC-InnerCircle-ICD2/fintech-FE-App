import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@api/services/auth';
import { ROUTES } from '@constants/routes';
import useModal from '@hooks/useModal';
import { useAuthStore } from '@stores/auth';
import { QUERY_KEY } from '@constants/apiEndpoints';
import type { LoginReq } from '@type/requests/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { openDialog } = useModal();
  const loginSuccess = useAuthStore((state) => state.login);

  const login = useMutation({
    mutationKey: [QUERY_KEY.USER.SIGN_IN],
    mutationFn: async (loginData: LoginReq) => {
      return authService.login(loginData);
    },
    onSuccess: (res) => {
      if (res.ok) {
        const accessToken = res.data.accessToken;
        loginSuccess(accessToken);
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

  const logout = useAuthStore((state) => state.logout);

  return { login, logout };
};
