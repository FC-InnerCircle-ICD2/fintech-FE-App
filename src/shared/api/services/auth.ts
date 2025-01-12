import { api } from '../api';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import type { LoginDTO, RegisterDTO } from '../types';

export const authService = {
  login: (data: LoginDTO) => api.post(API_ENDPOINTS.USERS.LOGIN, data),

  register: (data: RegisterDTO) => api.post(API_ENDPOINTS.USERS.REGISTER, data),

  logout: () => api.post(API_ENDPOINTS.USERS.LOGOUT, {}),
};
