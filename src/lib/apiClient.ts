import ky, { HTTPError, type Options } from 'ky';
import { API_BASE_URL } from '../config';

type ApiResponse<T> = {
  ok: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
};

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
     * @param {Request} _request - 요청 객체
     * @param {Options} _options - 요청 옵션
     * @param {Response} response - 응답 객체
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
      credentials: 'include', // 쿠키 포함
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
 * 각 메서드는 동적으로 httpClient를 호출합니다.
 */
export const api = {
  /**
   * GET 요청
   */
  get: async <T>(url: string, options?: Options): Promise<ApiResponse<T>> => {
    try {
      return await httpClient.get(url, options).json<ApiResponse<T>>();
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
      return await httpClient
        .post(url, { json: body, ...options })
        .json<ApiResponse<T>>();
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
      return await httpClient
        .put(url, { json: body, ...options })
        .json<ApiResponse<T>>();
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
      return await httpClient.delete(url, options).json<ApiResponse<T>>();
    } catch (error) {
      return await handleError<T>(error);
    }
  },
};

/**
 * 에러 처리 함수
 * @param {unknown} error - 처리할 에러 객체
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
      const json = (await error.response.json()) as ApiResponse<T>;
      return json;
    } catch (jsonError) {
      console.error('JSON parse error:', jsonError);
    }

    return {
      ok: false,
      data: null,
      error: {
        code: error.response.status.toString(),
        message: error.response.statusText || 'Unknown error',
      },
    };
  }

  console.error('Unexpected Error:', error);
  return {
    ok: false,
    data: null,
    error: {
      code: 'UNKNOWN',
      message: 'Unexpected error occurred',
    },
  };
};
