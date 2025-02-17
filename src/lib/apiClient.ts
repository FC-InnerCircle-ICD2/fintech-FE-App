import ky, { HTTPError, type Options } from 'ky';
import { API_BASE_URL } from '../config';

type ApiResponseSuccess<T> = {
  ok: true;
  data: T;
};

type ApiResponseError = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

/**
 * API 클라이언트 생성
 * @description ky를 사용하여 기본 클라이언트를 설정합니다.
 */
const httpClient = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  hooks: {
    /**
     * 응답 후 처리 로직을 정의합니다.
     * 예: 401 상태 코드가 반환되면 로그인 페이지로 리다이렉트 처리
     */
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          console.warn('Unauthorized - attempting to refresh session...');
          await refreshSession();
          return ky(request, options); // 세션 갱신 후 원래 요청 다시 시도
        }
      },
    ],
  },
});

const refreshSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // ✅ 쿠키 자동 포함
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

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to refresh access token');
      return null;
    }

    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    }

    return null;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

/**
 * API Wrapper
 */
export const api = {
  /**
   * GET 요청
   */
  get: async <T>(url: string, options?: Options): Promise<ApiResponse<T>> => {
    try {
      const data = await httpClient.get(url, options).json<T>();
      return { ok: true, data };
    } catch (error) {
      return await handleError<T>(error);
    }
  },

  /**
   * POST 요청
   */
  post: async <T, R>(
    url: string,
    body: R,
    options?: Options,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await httpClient
        .post(url, { json: body, ...options })
        .json<T>();
      return { ok: true, data };
    } catch (error) {
      return await handleError<T>(error);
    }
  },

  /**
   * PUT 요청
   */
  put: async <T, R>(
    url: string,
    body: R,
    options?: Options,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await httpClient
        .put(url, { json: body, ...options })
        .json<T>();
      return { ok: true, data };
    } catch (error) {
      return await handleError<T>(error);
    }
  },

  /**
   * DELETE 요청
   */
  delete: async <T>(
    url: string,
    options?: Options,
  ): Promise<ApiResponse<T>> => {
    try {
      const data = await httpClient.delete(url, options).json<T>();
      return { ok: true, data };
    } catch (error) {
      return await handleError<T>(error);
    }
  },
};

/**
 * 에러 처리 함수
 */
const handleError = async <T>(error: unknown): Promise<ApiResponse<T>> => {
  if (error instanceof HTTPError) {
    if (error.response.status === 401) {
      console.warn('Unauthorized - attempting to refresh token...');
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        return await ky(error.request).json<ApiResponse<T>>(); // 원래 요청 다시 시도
      }
    }

    try {
      const json = await error.response.json();
      return {
        ok: false,
        error: {
          code: error.response.status.toString(),
          message:
            json?.message || error.response.statusText || 'Unknown error',
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
