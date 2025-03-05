import { api } from '@lib/apiClient';

import { API_ENDPOINTS } from '@constants/apiEndpoints';
import type {
  TransactionDetailRes,
  PaymentRequestRes,
  TransactionsRes,
} from '@type/responses/payment';
import type { PaymentRequestReq } from '@type/requests/payment';
import type { TransactionListFilter } from '@hooks/queries/usePayments';

export const paymentService = {
  getOrderInfo: (orderToken: string) =>
    api.get<PaymentRequestRes>(API_ENDPOINTS.PAYMENT.ORDER.INFO(orderToken)),

  requestPayment: (token: PaymentRequestReq) =>
    api.post<PaymentRequestRes, PaymentRequestReq>(
      API_ENDPOINTS.PAYMENT.REQUEST,
      token,
    ),

  cancelPayment: (token: string) =>
    api.post(API_ENDPOINTS.PAYMENT.CANCEL, { token }),

  getTransactionList: ({
    startDate,
    endDate,
    status,
    page,
    limit,
  }: Required<TransactionListFilter>) => {
    return api.get<{ payments: TransactionsRes[] }>(
      API_ENDPOINTS.MANAGEMENT.HISTORY.LIST,
      {
        searchParams: {
          startDate,
          endDate,
          status: status?.toString(),
          page: page.toString(),
          limit: limit.toString(),
        },
      },
    );
  },

  getTransactionDetail: (transactionId: string) =>
    api.get<TransactionDetailRes>(
      API_ENDPOINTS.MANAGEMENT.HISTORY.DETAIL(transactionId),
    ),
};
