import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { DefaultLayout } from './ui/layouts/defaultLayout';
import { BottomNavLayout } from './ui/layouts/bottomNavLayout';
import { withSuspense } from '@ui/components/withSuspense/WithSuspense';
import { ROUTES } from '@constants/routes';
import SplashPage from '@pages/splash/Splash';
import ModalUITest from '@pages/test/ModalUITest';
import ApiHookTest from '@pages/test/ApiHookTest';
import ButtonSample from '@pages/test/ButtonSample';
import SSETest from '@pages/test/SSETest';
import { ProtectedRoute } from '@ui/layouts/ProtectedRoute';

// Lazy load pages
const LoginPage = lazy(() =>
  import('@pages/auth/LoginPage').then((m) => ({ default: m.default })),
);
const SignupPage = lazy(() =>
  import('@pages/auth/SignupPage').then((m) => ({ default: m.default })),
);

const QRPage = lazy(() =>
  import('@pages/payment/qr/QRPage').then((m) => ({ default: m.default })),
);
const QRPaymentDetailPage = lazy(() =>
  import('@pages/payment/detail/QRPaymentDetailPage').then((m) => ({
    default: m.default,
  })),
);
const QRPaymentCompletePage = lazy(() =>
  import('@pages/payment/complete/QRPaymentCompletePage').then((m) => ({
    default: m.default,
  })),
);

const TransactionsPage = lazy(() =>
  import('@pages/transactions/list/TransactionsListPage').then((m) => ({
    default: m.default,
  })),
);
const TransactionDetailPage = lazy(() =>
  import('@pages/transactions/detail/TransactionDetailPage').then((m) => ({
    default: m.default,
  })),
);
const CardPage = lazy(() =>
  import('@pages/card/list/CardPage').then((m) => ({ default: m.default })),
);

const QRDeepLinkSuccessPage = lazy(() =>
  import('@pages/payment/detail/QRDeepLinkSuccessPage').then((m) => ({
    default: m.default,
  })),
);

const AddCardPage = lazy(() =>
  import('@pages/card/list/AddCardPage').then((m) => ({ default: m.default })),
);

const SuspendedLoginPage = withSuspense(LoginPage);
const SuspendedSignupPage = withSuspense(SignupPage);

const SuspendedQRPage = withSuspense(QRPage);
const SuspendedQRPaymentDetailPage = withSuspense(QRPaymentDetailPage);
const SuspendedQRPaymentCompletePage = withSuspense(QRPaymentCompletePage);

const SuspendedTransactionsPage = withSuspense(TransactionsPage);
const SuspendedTransactionDetailPage = withSuspense(TransactionDetailPage);
const SuspendedCardPage = withSuspense(CardPage);
const SuspendedQRDeepLinkSuccess = withSuspense(QRDeepLinkSuccessPage);
const SuspendedAddCardPage = withSuspense(AddCardPage);

const AUTH_REQUIRED_ROUTES = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: ROUTES.PAYMENT.DETAIL,
        element: <SuspendedQRPaymentDetailPage />,
      },
      {
        path: ROUTES.PAYMENT.COMPLETE,
        element: <SuspendedQRPaymentCompletePage />,
      },
      {
        path: ROUTES.PAYMENT.DEEPLINK,
        element: <SuspendedQRDeepLinkSuccess />,
      },
      {
        path: ROUTES.TRANSACTIONS.DETAIL,
        element: <SuspendedTransactionDetailPage />,
      },
      {
        path: ROUTES.CARD.ADD,
        element: <SuspendedAddCardPage />,
      },
    ],
  },
  {
    element: <BottomNavLayout />,
    children: [
      { path: ROUTES.PAYMENT.QR, element: <SuspendedQRPage /> },
      {
        path: ROUTES.TRANSACTIONS.LIST,
        element: <SuspendedTransactionsPage />,
      },
      { path: ROUTES.CARD.LIST, element: <SuspendedCardPage /> },
    ],
  },
];

const PUBLIC_ROUTES = [
  {
    element: <DefaultLayout />,
    children: [
      { index: true, element: <SplashPage /> },
      { path: ROUTES.LOGIN, element: <SuspendedLoginPage /> },
      { path: ROUTES.SIGNUP, element: <SuspendedSignupPage /> },
    ],
  },
];

const TEST_ROUTES = [
  { path: '/modal-test', element: <ModalUITest /> },
  { path: '/button-test', element: <ButtonSample /> },
  { path: '/api-hook-test', element: <ApiHookTest /> },
  { path: '/sse-hook-test', element: <SSETest /> },
];

// 라우트 설정
const routes = [
  {
    path: '/',
    children: [
      {
        element: <ProtectedRoute />,
        children: AUTH_REQUIRED_ROUTES,
      },
      ...PUBLIC_ROUTES,
      ...TEST_ROUTES,
    ],
  },
];

export const router = createBrowserRouter(routes);
