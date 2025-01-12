import { useQuery, useMutation } from '@tanstack/react-query';
import { paymentService } from '@shared/api/services/payment';
import { QUERY_KEY } from '@shared/constants/api-endpoints';

export const useOrderInfo = (orderToken: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.PAYMENT.ORDER_INFO, orderToken],
    queryFn: () => paymentService.getOrderInfo(orderToken),
    select: (response) => response.data,
  });
};

export const useRequestPayment = () => {
  return useMutation({
    mutationFn: (orderId: string) => paymentService.requestPayment(orderId),
  });
};

export const useCancelPayment = () => {
  return useMutation({
    mutationFn: (orderId: string) => paymentService.cancelPayment(orderId),
  });
};

export const useHistoryList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MANAGEMENT.HISTORY],
    queryFn: () => paymentService.getHistoryList(),
    select: (response) => response.data,
  });
};

export const useHistoryDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MANAGEMENT.HISTORY, id],
    queryFn: () => paymentService.getHistoryDetail(id),
    select: (response) => response.data,
  });
};
