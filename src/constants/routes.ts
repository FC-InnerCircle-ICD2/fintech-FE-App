export const ROUTES = {
  SPLASH: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PAYMENT: {
    QR: '/payment/qr',
    DETAIL: '/payment/detail',
    COMPLETE: '/payment/complete',
    DEEPLINK: '/payment/deeplink/success',
  },
  TRANSACTIONS: {
    LIST: '/transactions',
    DETAIL: '/transactions/:id',
  },
  CARD: {
    LIST: '/card',
  },
} as const;
