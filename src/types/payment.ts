import type {
  PAYMENT_INSTALLMENT,
  TRANSACTION_STATUS,
} from '@constants/payment';

export interface PaymentOrder {
  orderId: string;
  store: string;
  productName: string;
  amount: number;
  token: string;
  expiredAt: number;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export type InstallmentType =
  (typeof PAYMENT_INSTALLMENT)[keyof typeof PAYMENT_INSTALLMENT];
