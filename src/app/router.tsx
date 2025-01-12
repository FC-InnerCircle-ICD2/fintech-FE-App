import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '../App';
import { BasicLayout } from './layouts/basic-layout';
import { AppLayout } from './layouts/app-layout';
import { withSuspense } from './providers/with-suspense';
import { ROUTES } from '@shared/config/routes';
import { SplashPage } from '@pages/basic/splash';
import ModalUITest from '@pages/test/ModalUITest';
import ApiHookTest from '@pages/test/ApiHookTest';

// Lazy load pages
const LoginPage = lazy(() =>
  import('@pages/basic/login').then((m) => ({ default: m.LoginPage })),
);
const HomePage = lazy(() =>
  import('@pages/app/home').then((m) => ({ default: m.HomePage })),
);
const PaymentsPage = lazy(() =>
  import('@pages/app/payments').then((m) => ({ default: m.PaymentsPage })),
);
const ScanPage = lazy(() =>
  import('@pages/app/scan').then((m) => ({ default: m.ScanPage })),
);
const ProfilePage = lazy(() =>
  import('@pages/app/profile').then((m) => ({ default: m.ProfilePage })),
);

// withSuspense로 감싸기
const SuspendedLoginPage = withSuspense(LoginPage);
const SuspendedHomePage = withSuspense(HomePage);
const SuspendedPaymentsPage = withSuspense(PaymentsPage);
const SuspendedScanPage = withSuspense(ScanPage);
const SuspendedProfilePage = withSuspense(ProfilePage);

// 라우트 설정
const routes = {
  path: '/',
  element: <App />,
  children: [
    {
      path: '/basic',
      element: <BasicLayout />,
      children: [
        { path: ROUTES.BASIC.SPLASH, element: <SplashPage /> },
        { path: ROUTES.BASIC.LOGIN, element: <SuspendedLoginPage /> },
      ],
    },
    {
      path: '/app',
      element: <AppLayout />,
      children: [
        { path: ROUTES.APP.HOME, element: <SuspendedHomePage /> },
        { path: ROUTES.APP.PAYMENTS, element: <SuspendedPaymentsPage /> },
        { path: ROUTES.APP.SCAN, element: <SuspendedScanPage /> },
        { path: ROUTES.APP.PROFILE, element: <SuspendedProfilePage /> },
      ],
    },
    {
      path: '/modal-test',
      element: <ModalUITest />,
    },
    {
      path: '/api-hook-test',
      element: <ApiHookTest />,
    },
  ],
};

export const router = createBrowserRouter([routes]);
