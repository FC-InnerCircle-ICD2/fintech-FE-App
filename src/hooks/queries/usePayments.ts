import { paymentService } from '@api/services/payment';
import { useQuery, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/apiEndpoints';
import type { TransactionStatus } from '@type/payment';

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

export type TransactionListFilter = {
  startDate?: string;
  endDate?: string;
  status?: TransactionStatus | 'null';
  page: number;
  limit: number;
};

// export const useTransactionList = ({
//   startDate,
//   endDate,
//   status,
//   page,
//   limit,
// }: TransactionListFilter) => {
//   return useSuspenseQuery({
//     queryKey: [QUERY_KEY.MANAGEMENT.HISTORY, startDate, endDate, page, limit],
//     queryFn: () =>
//       paymentService.getTransactionList({
//         startDate,
//         endDate,
//         status,
//         page,
//         limit,
//       }),
//     select: (response) => {
//       if (response.ok) {
//         return response.data.payments;
//       }
//       throw new Error(response.error.message);
//     },
//     // placeholderData: (previousData) => previousData ?? undefined,
//   });
// };

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
