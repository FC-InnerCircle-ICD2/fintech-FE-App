import type { OrderInfoJwtRes } from '@type/responses/payment';
import { useState, useEffect } from 'react';

/**
 * jwt 파싱 훅
 *
 * 이 훅은 jwt 토큰을 파싱하여 주문 정보를 반환하는 훅입니다.
 *
 * @param token - jwt 토큰
 * @returns {{
 *   payload: OrderInfoJwtRes;
 *   isLoading: boolean;
 *   isError: string | null;
 *  }}
 * - payload: 주문 정보
 * - isLoading: 로딩 상태
 * - isError: 에러 상태
 *
 * @example
 * const { payload, isLoading, isError } = useParseJwt(token);
 */

export const useParseJwt = (
  token: string,
): {
  payload: OrderInfoJwtRes | null;
  isLoading: boolean;
  isError: string | null;
} => {
  const [payload, setPayload] = useState<OrderInfoJwtRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsError('주문정보 Token 이 없습니다.');
      setIsLoading(false);
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      // Base64로 변환합니다.
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // Base64 문자열을 디코딩합니다.
      const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
      const payload = JSON.parse(jsonPayload);
      setPayload(payload);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setIsError(`JWT 파싱 중 오류가 발생했습니다. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return { payload, isLoading, isError };
};
