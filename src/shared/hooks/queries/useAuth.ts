import { authService } from '@shared/api/services/auth';
import type { LoginDTO, RegisterDTO } from '@shared/api/types';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => authService.login(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterDTO) => authService.register(data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
};
