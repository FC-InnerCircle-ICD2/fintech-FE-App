import { API_BASE_URL } from '@app/config';
import ky, { HTTPError, type Options } from 'ky';

type ApiResponse<T> = {
  code: string;
  data: T;
  message?: string;
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
     * 요청 전 헤더에 인증 토큰을 추가합니다.
     * @param {Request} request - 요청 객체
     */
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    /**
     * 응답 후 처리 로직을 정의합니다.
     * 예: 401 상태 코드가 반환되면 로그인 페이지로 리다이렉트 처리
     * @param {Request} _request - 요청 객체
     * @param {Options} _options - 요청 옵션
     * @param {Response} response - 응답 객체
     */
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          console.warn('Unauthorized - redirecting to login...');
        }
      },
    ],
  },
});

/**
 * API Wrapper
 * 각 메서드는 동적으로 httpClient를 호출합니다.
 */
export const api = {
  /**
   * GET 요청
   * @template T - 응답 데이터 타입
   * @param {string} url - API 엔드포인트
   * @param {Options} [options] - 요청 옵션
   * @returns {Promise<ApiResponse<T>>} - 응답 데이터의 Promise
   */
  get: async <T>(url: string, options?: Options): Promise<ApiResponse<T>> => {
    try {
      return await httpClient.get(url, options).json<ApiResponse<T>>();
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * POST 요청
   * @template T - 응답 데이터 타입
   * @template R - 요청 바디 타입
   * @param {string} url - API 엔드포인트
   * @param {R} body - 요청 바디
   * @param {Options} [options] - 요청 옵션
   * @returns {Promise<ApiResponse<T>>} - 응답 데이터의 Promise
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
      return handleError(error);
    }
  },

  /**
   * PUT 요청
   * @template T - 응답 데이터 타입
   * @template R - 요청 바디 타입
   * @param {string} url - API 엔드포인트
   * @param {R} body - 요청 바디
   * @param {Options} [options] - 요청 옵션
   * @returns {Promise<ApiResponse<T>>} - 응답 데이터의 Promise
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
      return handleError(error);
    }
  },

  /**
   * DELETE 요청
   * @template T - 응답 데이터 타입
   * @param {string} url - API 엔드포인트
   * @param {Options} [options] - 요청 옵션
   * @returns {Promise<ApiResponse<T>>} - 응답 데이터의 Promise
   */
  delete: async <T>(
    url: string,
    options?: Options,
  ): Promise<ApiResponse<T>> => {
    try {
      return await httpClient.delete(url, options).json<ApiResponse<T>>();
    } catch (error) {
      return handleError(error);
    }
  },
};

/**
 * 에러 처리 함수
 * @param {unknown} error - 처리할 에러 객체
 */
const handleError = (error: unknown): never => {
  if (error instanceof HTTPError) {
    console.error(`HTTP Error: ${error.response.status}`, error);
  } else {
    console.error('Unexpected Error:', error);
  }
  throw error; // 에러를 다시 던져서 상위 호출자가 처리할 수 있게 함
};
