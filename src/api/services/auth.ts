import { api } from '@lib/apiClient';
import type { LoginReq, RegisterReq } from '@type/requests/auth';
import { API_ENDPOINTS } from '@constants/apiEndpoints';

export const authService = {
  login: (data: LoginReq) => api.post(API_ENDPOINTS.USERS.LOGIN, data),

  register: (data: RegisterReq) => api.post(API_ENDPOINTS.USERS.REGISTER, data),

  logout: () => api.post(API_ENDPOINTS.USERS.LOGOUT, {}),
};
