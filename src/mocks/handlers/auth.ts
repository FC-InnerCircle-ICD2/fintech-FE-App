import { API_ENDPOINTS } from '@constants/apiEndpoints';
import { http, HttpResponse } from 'msw';

export const authHandler = [
  http.get(API_ENDPOINTS.USERS.LOGIN, () => {
    return HttpResponse.json({
      code: 200,
      data: {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
      },
    });
  }),
];
