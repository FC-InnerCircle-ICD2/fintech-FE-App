import { api } from '../api';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import type { HistoryDetailDTO, HistoryDTO, OrderInfoDTO } from '../types';

export const paymentService = {
  getOrderInfo: (orderToken: string) =>
    api.get<OrderInfoDTO>(API_ENDPOINTS.PAYMENT.ORDER.INFO(orderToken)),

  requestPayment: (orderId: string) =>
    api.post(API_ENDPOINTS.PAYMENT.PROCESS(orderId), {}),

  cancelPayment: (orderId: string) =>
    api.post(API_ENDPOINTS.PAYMENT.CANCEL(orderId), {}),

  getHistoryList: () =>
    api.get<HistoryDTO[]>(API_ENDPOINTS.MANAGEMENT.HISTORY.LIST),

  getHistoryDetail: (historyId: string) =>
    api.get<HistoryDetailDTO>(
      API_ENDPOINTS.MANAGEMENT.HISTORY.DETAIL(historyId),
    ),
};
