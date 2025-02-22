import { paymentService } from '@api/services/payment';
import { useQuery, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/apiEndpoints';

// export const useOrderInfo = (orderToken: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEY.PAYMENT.ORDER_INFO, orderToken],
//     queryFn: () => paymentService.getOrderInfo(orderToken),
//     select: (response) => {
//       if (response.ok) {
//         return response.data;
//       }
//     },
//   });
// };

// export const useRequestPayment = () => {
//   return useMutation({
//     mutationFn: (orderId: string) => paymentService.requestPayment(orderId),
//   });
// };

export const useCancelPayment = () => {
  return useMutation({
    mutationFn: (orderId: string) => paymentService.cancelPayment(orderId),
  });
};

export const useTransactionList = (page: number, limit: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.MANAGEMENT.HISTORY, page, limit],
    queryFn: () => paymentService.getTransactionList({ page, limit }),
    select: (response) => {
      if (response.ok) {
        return response.data.payments;
      }
      throw new Error(response.error.message);
    },
    // placeholderData: (previousData) => previousData ?? undefined,
  });
};

export const useTransactionDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MANAGEMENT.HISTORY, id],
    queryFn: () => paymentService.getTransactionDetail(id),
    select: (response) => {
      if (response.ok) {
        return response.data;
      }
    },
  });
};
