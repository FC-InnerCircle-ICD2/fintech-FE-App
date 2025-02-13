import { api } from '@lib/apiClient';

import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type {
  TransactionDetailRes,
  OrderInfoRes,
  TransactionsPageRes,
} from '@type/responses/payment';

export const paymentService = {
  getOrderInfo: (orderToken: string) =>
    api.get<OrderInfoRes>(API_ENDPOINTS.PAYMENT.ORDER.INFO(orderToken)),

  requestPayment: (orderId: string) =>
    api.post(API_ENDPOINTS.PAYMENT.PROCESS(orderId), {}),

  cancelPayment: (orderId: string) =>
    api.post(API_ENDPOINTS.PAYMENT.CANCEL(orderId), {}),

  getTransactionList: () =>
    api.get<TransactionsPageRes>(API_ENDPOINTS.MANAGEMENT.HISTORY.LIST),

  getTransactionDetail: (transactionId: string) =>
    api.get<TransactionDetailRes>(
      API_ENDPOINTS.MANAGEMENT.HISTORY.DETAIL(transactionId),
    ),
};
