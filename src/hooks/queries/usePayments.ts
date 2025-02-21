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
    queryKey: [QUERY_KEY.MANAGEMENT.HISTORY, page, limit], // ✅ queryKey에 page, limit 추가
    queryFn: () => paymentService.getTransactionList({ page, limit }), // ✅ page, limit을 인자로 전달
    select: (response) => {
      if (response.ok) {
        return response.data.payments;
      }
      throw new Error(response.error.message); // ✅ 에러 핸들링 추가
    },
    // placeholderData: (previousData) => previousData ?? undefined, // ✅ 페이지네이션 시 이전 데이터 유지
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
