import type { NavItem } from '../../types/navigation';
import { ROUTES } from '@constants/routes';

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'transactions',
    label: '결제내역',
    icon: 'List',
    path: ROUTES.TRANSACTIONS.LIST,
  },
  {
    id: 'qr-payment',
    label: 'QR 결제',
    icon: 'Camera',
    path: ROUTES.PAYMENT.QR,
  },
  {
    id: 'card',
    label: '카드',
    icon: 'CreditCard',
    path: ROUTES.CARD.LIST,
  },
] as const;
