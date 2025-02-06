export const API_ENDPOINTS = {
  USERS: {
    LOGIN: 'api/v1/users/login', // 로그인
    REGISTER: 'api/v1/users', // 회원가입
    LOGOUT: 'api/v1/users/logout', // 로그아웃
    REFRESH: 'api/v1/users/refresh', // 토큰 재발급 ( 논의 필요 )
  },
  PAYMENT: {
    ORDER: {
      INFO: (orderToken: string) => `api/v1/payments/${orderToken}/info`, // 주문 상세 정보 조회
      // 임시
      SSE: 'payment/order/sse',
      SSE_TEMP: 'payment/order/sse-temp',
    },
    PROCESS: (orderId: string) => `api/v1/payments/${orderId}/process`, // QR 결제 요청
    CANCEL: (orderId: string) => `api/v1/payments/${orderId}/cancel`, // QR 결제 취소
  },
  MANAGEMENT: {
    HISTORY: {
      LIST: 'api/v1/managements/histories', // 결제 내역 목록 조회
      DETAIL: (historyId: string) =>
        `api/v1/managements/histories/${historyId}`, // 결제 내역 상세 조회
    },
  },
} as const;

export const QUERY_KEY = {
  PAYMENT: {
    ORDER_INFO: 'payment/order-info',
  },
  MANAGEMENT: {
    HISTORY: 'management/history',
  },
} as const;
