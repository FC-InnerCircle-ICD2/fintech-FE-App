import { API_ENDPOINTS } from '@constants/apiEndpoints';
import { HistoryPaymentMethod, HistoryPaymentStatus } from '@constants/payment';
import { http, HttpResponse } from 'msw';

export const paymentHandler = [
  // 결제 요청
  http.post(`/${API_ENDPOINTS.PAYMENT.PROCESS(':orderId')}`, () => {
    return HttpResponse.json({
      code: 200,
    });
  }),

  // 결제 취소
  http.post(`/${API_ENDPOINTS.PAYMENT.CANCEL(':orderId')}`, () => {
    return HttpResponse.json({
      code: 200,
    });
  }),

  // 결제 내역 목록 조회
  http.get(`/${API_ENDPOINTS.MANAGEMENT.HISTORY.LIST}`, () => {
    return HttpResponse.json({
      code: 200,
      data: {
        items: [
          {
            historyId: 'history-001',
            store: '테스트 가맹점 A',
            orderId: 'order-001',
            orderName: '테스트 상품 A외 2건',
            paymentStatus: HistoryPaymentStatus.COMPLETED,
            paymentMethod: HistoryPaymentMethod.CARD,
            amount: 15000,
            createdAt: '2024-03-20T09:00:00',
          },
          {
            historyId: 'history-002',
            store: '테스트 가맹점 B',
            orderId: 'order-002',
            orderName: '테스트 상품 B',
            paymentStatus: HistoryPaymentStatus.CANCELED,
            paymentMethod: HistoryPaymentMethod.CARD,
            amount: 25000,
            createdAt: '2024-03-19T15:30:00',
          },
        ],
        totalCount: 2,
      },
    });
  }),

  // 결제 내역 상세 조회
  http.get(`/${API_ENDPOINTS.MANAGEMENT.HISTORY.DETAIL(':historyId')}`, () => {
    return HttpResponse.json({
      code: 200,
      data: {
        historyId: 'history-001',
        orderId: 'order-001',
        orderName: '테스트 상품 A외 2건',
        paymentStatus: HistoryPaymentStatus.COMPLETED,
        paymentMethod: HistoryPaymentMethod.CARD,
        amount: 15000,
        cardInfo: {
          cardCompany: '신한카드',
          cardNumber: '123456******7890',
          installmentPeriod: 0,
        },
        store: '테스트 가맹점',
        createdAt: '2024-03-20T09:00:00',
        canceledAt: null,
      },
    });
  }),
];
