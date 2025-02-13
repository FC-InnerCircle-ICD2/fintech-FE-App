import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * `location.state` 값을 가져오고 관리하는 커스텀 훅입니다.
 *
 * 이 훅은 현재 라우터의 `location.state`를 지정된 타입으로 반환하며,
 * 상태가 없거나 유효하지 않은 경우 에러를 발생시킵니다.
 *
 * @template T - 상태 객체의 타입으로, 키-값 구조(`Record<string, unknown>`)를 가져야 합니다.
 *
 * @returns {{
 *   state: T;
 *   isLoading: boolean;
 * }}
 * - `state`: `location.state` 값을 포함하는 객체로, 제네릭 타입 `T`에 따라 설정됩니다.
 * - `isLoading`: 상태를 로딩 중인지 나타내는 불리언 값입니다.
 *
 * @throws {Error}
 * - `location.state`가 없거나 객체 타입이 아닌 경우 에러가 발생합니다.
 * - 상태가 초기화되지 않아 `state`가 `null`일 경우 에러가 발생합니다.
 *
 * @example
 * // location.state의 값이 다음과 같다고 가정합니다:
 * // { userId: 123, userName: "John Doe" }
 *
 * const { state, isLoading } = useLocationState<{
 *   userId: number;
 *   userName: string;
 * }>();
 *
 * if (isLoading) {
 *   return <div>로딩 중...</div>;
 * }
 *
 * return (
 *   <div>
 *     <p>사용자 ID: {state.userId}</p>
 *     <p>사용자 이름: {state.userName}</p>
 *   </div>
 * );
 */
export const useLocationState = <T extends Record<string, unknown>>(): {
  state: T;
  isLoading: boolean;
} => {
  const location = useLocation(); // 현재 라우터 위치 가져오기
  const [state, setState] = useState<T | null>(location.state as T | null); // 초기 상태를 location.state로 설정
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    setIsLoading(true); // 로딩 시작

    // `location.state`를 안전하게 T 타입으로 캐스팅
    const currentState = location.state as T | null;

    // `location.state`가 없거나 객체가 아닐 경우 에러 발생
    if (!currentState || typeof currentState !== 'object') {
      throw new Error('라우터 상태가 필요하지만 제공되지 않았습니다.');
    }

    setState(currentState); // 상태 설정
    setIsLoading(false); // 로딩 완료
  }, [location]);

  // 상태가 null인 경우 최종적으로 에러를 발생
  if (state === null) {
    throw new Error('location.state가 null입니다');
  }

  // 상태와 로딩 상태 반환
  return { state, isLoading };
};
