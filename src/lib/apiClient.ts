import ky, { type Options } from 'ky';
import { API_BASE_URL } from '../config';
import { useAuthStore } from '@stores/auth';

/**
 * ✅ API 성공 응답 타입
 */
type ApiResponseSuccess<T> = {
  ok: true;
  data: T;
};

/**
 * ✅ API 실패 응답 타입
 */
export type ApiResponseError = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

/**
 * ✅ 최종 API 응답 타입 (성공 또는 실패)
 */
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

const httpClient = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = useAuthStore.getState().getAccessToken();
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          console.warn('Unauthorized - attempting to refresh session...');
          await refreshSession();
          return httpClient(request, options);
        }
      },
    ],
  },
});

/**
 * ✅ 세션 갱신 함수 (401 발생 시)
 */
const refreshSession = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Session refresh failed');
      return false;
    }

    console.log('Session refreshed successfully');
    return true;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return false;
  }
};

/**
 * ✅ API 클라이언트 (모든 요청 함수 포함)
 */
export const api = {
  get: <T>(url: string, options?: Options) =>
    httpClient.get(url, options).json<ApiResponse<T>>(), // ✅ 여기서 ApiResponse<T>로 명확하게 정의
  post: <T, R>(url: string, body: R, options?: Options) =>
    httpClient.post(url, { json: body, ...options }).json<ApiResponse<T>>(), // ✅ 여기서 ApiResponse<T>로 명확하게 정의
  put: <T, R>(url: string, body: R, options?: Options) =>
    httpClient.put(url, { json: body, ...options }).json<ApiResponse<T>>(), // ✅ 여기서 ApiResponse<T>로 명확하게 정의
  delete: <T>(url: string, options?: Options) =>
    httpClient.delete(url, options).json<ApiResponse<T>>(), // ✅ 여기서 ApiResponse<T>로 명확하게 정의
};

// /**
//  * ✅ API 오류 처리 함수
//  */
// const handleError = async (error: unknown): Promise<never> => {
//   if (error instanceof HTTPError) {
//     try {
//       // ✅ 응답을 먼저 `text()`로 읽기
//       const text = await error.response.text();

//       // ✅ JSON 여부 검사 후 파싱 시도
//       const json =
//         text && isJsonString(text)
//           ? (JSON.parse(text) as ApiResponseError)
//           : null;

//       throw new Error(
//         json?.error?.message ||
//           error.response.statusText ||
//           '서버에서 알 수 없는 오류가 발생했습니다.',
//       );
//     } catch (jsonError) {
//       console.error('JSON parse error 발생:', jsonError);
//     }

//     throw new Error(
//       error.response.statusText || '서버에서 알 수 없는 오류가 발생했습니다.',
//     );
//   }

//   console.error('Unexpected Error:', error);
//   throw new Error('Unexpected error occurred');
// };

// /**
//  * ✅ JSON 여부를 확인하는 함수
//  */
// const isJsonString = (str: string): boolean => {
//   try {
//     JSON.parse(str);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };
