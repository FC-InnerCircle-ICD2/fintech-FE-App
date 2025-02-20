export const API_ENDPOINTS = {
  USERS: {
    LOGIN: 'api/v1/p/user/sign-in', // 로그인
    REGISTER: 'api/v1/users', // 회원가입
    LOGOUT: 'api/v1/users/logout', // 로그아웃
    REFRESH: 'api/v1/users/refresh', // 토큰 재발급 ( 논의 필요 )
  },
  PAYMENT: {
    ORDER: {
      INFO: (orderToken: string) => `api/v1/payments/${orderToken}/info`, // 주문 상세 정보 조회
      // 임시
      SSE: 'api/v1/p/user/sse/connect',
      SSE_TEMP: 'payment/order/sse-temp',
    },
    REQUEST: `api/v1/p/user/authentication/simple`, // 간편 결제 요청
    CANCEL: (orderId: string) => `api/v1/payments/${orderId}/cancel`, // QR 결제 취소
  },
  MANAGEMENT: {
    HISTORY: {
      LIST: 'api/v1/managements/histories', // 결제 내역 목록 조회
      DETAIL: (historyId: string) =>
        `api/v1/managements/histories/${historyId}`, // 결제 내역 상세 조회
    },
  },
  CARD: {
    REGISTER: 'api/v1/p/user/cards', // 카드 등록
    LIST: 'api/v1/p/user/cards', // 카드 목록 조회
    SET_REPRESENTATIVE: (cardId: string) => `api/v1/p/user/cards/${cardId}`, // 주 카드 설정
    DELETE: (cardId: string) => `api/v1/p/user/cards/${cardId}/delete`, // 카드 삭제
  },
} as const;

export const QUERY_KEY = {
  USER: {
    LOGIN: 'login',
  },
  PAYMENT: {
    REQUEST: 'paymentRequest',
  },
  MANAGEMENT: {
    HISTORY: 'management/history',
  },
  CARD: {
    LIST: 'cardList',
    REGISTER: 'cardRegister',
    SET_REPRESENTATIVE: 'cardRepresentative',
    DELETE: 'cardDelete',
  },
} as const;
