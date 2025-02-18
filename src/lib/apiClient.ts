import ky, { HTTPError, type Options } from 'ky';
import { API_BASE_URL } from '../config';

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
type ApiResponseError = {
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
    httpClient
      .get(url, options)
      .json<ApiResponse<T>>() // ✅ 여기서 ApiResponse<T>로 명확하게 정의
      .then((response) => response) // ✅ response 자체를 그대로 반환
      .catch((error) => handleError<T>(error)),

  post: <T, R>(url: string, body: R, options?: Options) =>
    httpClient
      .post(url, { json: body, ...options })
      .json<ApiResponse<T>>() // ✅ 여기서 ApiResponse<T>로 명확하게 정의
      .then((response) => response) // ✅ response 자체를 그대로 반환
      .catch((error) => handleError<T>(error)),

  put: <T, R>(url: string, body: R, options?: Options) =>
    httpClient
      .put(url, { json: body, ...options })
      .json<ApiResponse<T>>() // ✅ 여기서 ApiResponse<T>로 명확하게 정의
      .then((response) => response) // ✅ response 자체를 그대로 반환
      .catch((error) => handleError<T>(error)),

  delete: <T>(url: string, options?: Options) =>
    httpClient
      .delete(url, options)
      .json<ApiResponse<T>>() // ✅ 여기서 ApiResponse<T>로 명확하게 정의
      .then((response) => response) // ✅ response 자체를 그대로 반환
      .catch((error) => handleError<T>(error)),
};

/**
 * ✅ API 오류 처리 함수
 */
const handleError = async <T>(error: unknown): Promise<ApiResponse<T>> => {
  if (error instanceof HTTPError) {
    try {
      const json = (await error.response.json()) as ApiResponseError;
      return {
        ok: false,
        error: {
          code: json.error.code || error.response.status.toString(),
          message:
            json.error.message || error.response.statusText || 'Unknown error',
        },
      };
    } catch (jsonError) {
      console.error('JSON parse error:', jsonError);
    }

    return {
      ok: false,
      error: {
        code: error.response.status.toString(),
        message: error.response.statusText || 'Unknown error',
      },
    };
  }

  console.error('Unexpected Error:', error);
  return {
    ok: false,
    error: {
      code: 'UNKNOWN',
      message: 'Unexpected error occurred',
    },
  };
};
