import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * URL의 쿼리 파라미터를 파싱하고 관리하는 커스텀 훅입니다.
 *
 * @template T - 쿼리 파라미터 키를 나타내는 문자열 유니온 타입입니다.
 *
 * @returns {{
 *   params: Record<T, string>;
 *   isLoading: boolean;
 * }}
 * `params`는 URL에서 추출한 쿼리 파라미터 객체이며,
 * `isLoading`은 쿼리 파라미터를 처리 중인지 나타내는 로딩 상태입니다.
 *
 * @example
 * // URL: https://example.com?token=abc123&expiredAt=2025-01-01
 * const { params, isLoading } = useQueryParams<'token' | 'expiredAt'>();
 *
 * console.log(params.token); // "abc123"
 * console.log(params.expiredAt); // "2025-01-01"
 * console.log(isLoading); // false
 */
export const useQueryParams = <T extends string>(): {
  params: Record<T, string>;
  isLoading: boolean;
} => {
  const location = useLocation();
  const [params, setParams] = useState<Record<T, string>>(
    {} as Record<T, string>,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const result = Array.from(queryParams.entries()).reduce(
      (acc, [key, value]) => {
        acc[key as T] = value;
        return acc;
      },
      {} as Record<T, string>,
    );

    setParams(result);
    setIsLoading(false);
  }, [location.search]);

  return { params, isLoading };
};
