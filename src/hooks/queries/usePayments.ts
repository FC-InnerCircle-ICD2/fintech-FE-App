import { paymentService } from '@api/services/payment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/apiEndpoints';

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

export const useTransactionList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MANAGEMENT.HISTORY],
    queryFn: () => paymentService.getTransactionList(),
    select: (response) => response.data,
  });
};

export const useTransactionDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MANAGEMENT.HISTORY, id],
    queryFn: () => paymentService.getTransactionDetail(id),
    select: (response) => response.data,
  });
};
