import { api } from '@lib/apiClient';

import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type {
  TransactionDetailRes,
  PaymentRequestRes,
  TransactionsPageRes,
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

  getTransactionList: () =>
    api.get<TransactionsPageRes>(API_ENDPOINTS.MANAGEMENT.HISTORY.LIST),

  getTransactionDetail: (transactionId: string) =>
    api.get<TransactionDetailRes>(
      API_ENDPOINTS.MANAGEMENT.HISTORY.DETAIL(transactionId),
    ),
};
