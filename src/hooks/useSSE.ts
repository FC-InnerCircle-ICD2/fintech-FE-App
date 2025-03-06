import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ACCESS_TOKEN } from '@constants/token';
/**@TODO  console.log 지우기 */
export interface UseSSEOptions<T> {
  url: string; // SSE 연결 URL
  onMessage?: (data: T) => void; // 메시지 수신 시 실행할 콜백
  onError?: (error: Event) => void; // 연결 오류 발생 시 실행할 콜백
  reconnectInterval?: number; // 재연결 간격 (밀리초)
  timeout?: number; // 데이터 수신 상태 확인 시간 제한 (밀리초)
}

export interface UseSSEReturn {
  connected: boolean; // 물리적 연결 상태
  isReceivingData: boolean; // 데이터 수신 상태
  connect: () => void; // SSE 연결 시작
  disconnect: () => void; // SSE 연결 중지
}

export const useSSE = <T>({
  url,
  onMessage,
  onError,
  reconnectInterval = 3000,
  timeout = 10000,
}: UseSSEOptions<T>): UseSSEReturn => {
  const [connected, setConnected] = useState(false); // 물리적 연결 상태
  const [lastMessageTime, setLastMessageTime] = useState(0); // 마지막 메시지 수신 시간
  const eventSourceRef = useRef<EventSource | null>(null); // EventSource 인스턴스 참조
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 재연결 타이머 참조

  // SSE 연결 시작 함수
  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      console.log('기존 SSE 연결 종료 후 재연결');
      eventSourceRef.current.close(); // 기존 연결 닫기
      eventSourceRef.current = null;
    }

    const establishConnection = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const eventSource = new EventSourcePolyfill(
        `${import.meta.env.VITE_API_URL}${url}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Custom-Header': 'Custom-Value',
          },

          withCredentials: true,
        },
      );

      // SSE 연결 성공
      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
        setConnected(true);
      };

      // 메시지 수신 처리
      (eventSource as EventSource).onmessage = (event: MessageEvent) => {
        try {
          console.log('event.data : ', event.data);
          const data: T = JSON.parse(event.data); // 메시지 데이터 파싱
          setLastMessageTime(Date.now()); // 메시지 수신 시간 갱신
          onMessage?.(data); // 메시지 핸들러 실행
        } catch (error) {
          console.error('메시지 파싱 오류:', error);
        }
      };

      // SSE 연결 오류 처리
      (eventSource as EventSource).onerror = (error: Event) => {
        console.error('SSE 연결 오류:', error);
        setConnected(false);
        onError?.(error); // 사용자 정의 에러 핸들러 실행
        eventSource.close(); // 기존 연결 종료
        eventSourceRef.current = null; // SSE 인스턴스 초기화

        // 재연결 시도
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('SSE 재연결 시도...');
          establishConnection();
        }, reconnectInterval);
      };

      (eventSource as EventSource).addEventListener('payment-done', ((
        event: MessageEvent,
      ) => {
        console.log('결제 완료 이벤트:', event);
        try {
          const cleanData = event.data.replace(/\\/g, '');
          const data: T = JSON.parse(cleanData);
          setLastMessageTime(Date.now());
          onMessage?.(data);
        } catch (error) {
          console.error('메시지 파싱 오류:', error);
        }
      }) as EventListener);

      eventSourceRef.current = eventSource; // SSE 인스턴스 저장
    };

    establishConnection();
  }, [url, onMessage, onError, reconnectInterval]);

  // SSE 연결 중지 함수
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close(); // 연결 종료
      eventSourceRef.current = null; // SSE 인스턴스 초기화
      console.log('SSE 연결 종료');
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current); // 재연결 타이머 정리
      reconnectTimeoutRef.current = null;
    }
    setConnected(false);
  }, []);

  // 데이터 수신 상태 계산
  const isReceivingData = useMemo(
    () => Date.now() - lastMessageTime < timeout,
    [lastMessageTime, timeout],
  );

  // 컴포넌트 언마운트 시 연결 종료
  useEffect(() => {
    // localStorage의 ACCESS_TOKEN이 변경되면 기존 SSE 연결을 닫고 새로운 연결을 자동으로 수립
    const handleTokenChange = () => {
      console.log('토큰 변경 감지 → SSE 재연결');
      disconnect();
      connect();
    };

    window.addEventListener('storage', handleTokenChange); // 토큰 변경 감지
    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, [connect, disconnect]);

  return { connected, isReceivingData, connect, disconnect };
};
