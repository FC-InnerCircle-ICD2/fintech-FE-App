import { api } from '@lib/apiClient';

import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type {
  TransactionDetailRes,
  PaymentRequestRes,
  TransactionsRes,
} from '@type/responses/payment';
import type { PaymentRequestReq } from '@type/requests/payment';

export const paymentService = {
  getOrderInfo: (orderToken: string) =>
    api.get<PaymentRequestRes>(API_ENDPOINTS.PAYMENT.ORDER.INFO(orderToken)),

  requestPayment: (token: PaymentRequestReq) =>
    api.post<PaymentRequestRes, PaymentRequestReq>(
      API_ENDPOINTS.PAYMENT.REQUEST,
      token,
    ),

  cancelPayment: (orderId: string) =>
    api.post(API_ENDPOINTS.PAYMENT.CANCEL(orderId), {}),

  getTransactionList: ({ page, limit }: { page: number; limit: number }) => {
    return api.get<{ payments: TransactionsRes[] }>(
      API_ENDPOINTS.MANAGEMENT.HISTORY.LIST,
      {
        searchParams: { page: page.toString(), limit: limit.toString() }, // ✅ page, limit 추가
      },
    );
  },

  getTransactionDetail: (transactionId: string) =>
    api.get<TransactionDetailRes>(
      API_ENDPOINTS.MANAGEMENT.HISTORY.DETAIL(transactionId),
    ),
};
