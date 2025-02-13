import { ROUTES } from '@constants/routes';
import type { IconName } from '@ui/components/icon/Icon';

export type NavigationID = 'transactions' | 'qr-payment' | 'card';
export type NavigationPath =
  | typeof ROUTES.TRANSACTIONS.LIST
  | typeof ROUTES.PAYMENT.QR
  | typeof ROUTES.CARD.LIST;

export interface NavItem {
  id: NavigationID;
  label: string;
  icon: IconName;
  path: NavigationPath;
}

export interface NavItemProps {
  item: NavItem;
  isActive: boolean;
}
