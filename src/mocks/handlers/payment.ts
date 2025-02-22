import { API_ENDPOINTS } from '@constants/apiEndpoints';
// import { HistoryPaymentMethod, HistoryPaymentStatus } from '@constants/payment';
import { http, HttpResponse } from 'msw';

export const paymentHandler = [
  // // 결제 요청
  // http.post(`/${API_ENDPOINTS.PAYMENT.PROCESS(':orderId')}`, () => {
  //   return HttpResponse.json({
  //     code: 200,
  //   });
  // }),

  // // 결제 취소
  // http.post(`/${API_ENDPOINTS.PAYMENT.CANCEL(':orderId')}`, () => {
  //   return HttpResponse.json({
  //     code: 200,
  //   });
  // }),

  // // 결제 내역 목록 조회
  // http.get(`/${API_ENDPOINTS.MANAGEMENT.HISTORY.LIST}`, () => {
  //   return HttpResponse.json({
  //     code: 200,
  //     data: {
  //       items: [
  //         {
  //           historyId: 'history-001',
  //           store: '테스트 가맹점 A',
  //           orderId: 'order-001',
  //           orderName: '테스트 상품 A외 2건',
  //           paymentStatus: HistoryPaymentStatus.COMPLETED,
  //           paymentMethod: HistoryPaymentMethod.CARD,
  //           amount: 15000,
  //           createdAt: '2024-03-20T09:00:00',
  //         },
  //         {
  //           historyId: 'history-002',
  //           store: '테스트 가맹점 B',
  //           orderId: 'order-002',
  //           orderName: '테스트 상품 B',
  //           paymentStatus: HistoryPaymentStatus.CANCELED,
  //           paymentMethod: HistoryPaymentMethod.CARD,
  //           amount: 25000,
  //           createdAt: '2024-03-19T15:30:00',
  //         },
  //       ],
  //       totalCount: 2,
  //     },
  //   });
  // }),

  // // 결제 내역 상세 조회
  // http.get(`/${API_ENDPOINTS.MANAGEMENT.HISTORY.DETAIL(':historyId')}`, () => {
  //   return HttpResponse.json({
  //     code: 200,
  //     data: {
  //       historyId: 'history-001',
  //       orderId: 'order-001',
  //       orderName: '테스트 상품 A외 2건',
  //       paymentStatus: HistoryPaymentStatus.COMPLETED,
  //       paymentMethod: HistoryPaymentMethod.CARD,
  //       amount: 15000,
  //       cardInfo: {
  //         cardCompany: '신한카드',
  //         cardNumber: '123456******7890',
  //         installmentPeriod: 0,
  //       },
  //       store: '테스트 가맹점',
  //       createdAt: '2024-03-20T09:00:00',
  //       canceledAt: null,
  //     },
  //   });
  // }),

  http.get(API_ENDPOINTS.MANAGEMENT.HISTORY.LIST, () => {
    return HttpResponse.json({
      ok: true,
      data: {
        payments: [
          {
            paymentKey: '0JTH7H67ZDFW8',
            cardNumber: '1234-5678-9012-3456',
            accountId: '293847562342874239',
            transactions: [],
            paymentType: 'CARD',
            orderId: 'test-order-4',
            orderName: 'test-order-4',
          },
          {
            paymentKey: '0JTMEZ2CS4J85',
            cardNumber: '1234-5678-9012-3456',
            accountId: '293847562342874239',
            transactions: [
              {
                id: '678512148491875068',
                paymentKey: '0JTMEZ2CS4J85',
                amount: 100000,
                status: 'APPROVED',
                reason: null,
                requestedAt: '2025-02-15T08:05:02.346125',
                completedAt: '2025-02-15T08:05:02.34753',
              },
              {
                id: '679686029491790951',
                paymentKey: '0JTMEZ2CS4J85',
                amount: 500,
                status: 'CANCELED',
                reason: null,
                requestedAt: '2025-02-15T08:05:02.346125',
                completedAt: '2025-02-18T22:49:37.386919',
              },
              {
                id: '679686078816806103',
                paymentKey: '0JTMEZ2CS4J85',
                amount: -500,
                status: 'CANCELED',
                reason: null,
                requestedAt: '2025-02-15T08:05:02.346125',
                completedAt: '2025-02-18T22:49:49.146155',
              },
            ],
            paymentType: 'CARD',
            orderId: '8765433',
            orderName: '8765433',
          },
          {
            paymentKey: '0JSRCFC6JBRWB',
            cardNumber: '1234-5678-9012-3456',
            accountId: '293847562342874239',
            transactions: [],
            paymentType: 'CARD',
            orderId: 'test-order2',
            orderName: 'test-order2',
          },
          {
            paymentKey: '0JTK7XD25DE70',
            cardNumber: '1234-5678-9012-3456',
            accountId: '293847562342874239',
            transactions: [],
            paymentType: 'CARD',
            orderId: 'test-order-10',
            orderName: 'test-order-10',
          },
          {
            paymentKey: '0JTMX7C7N4J86',
            cardNumber: '1234-5678-9012-3456',
            accountId: '293847562342874239',
            transactions: [],
            paymentType: 'CARD',
            orderId: 'test-order-5',
            orderName: 'test-order-5',
          },
        ],
      },
    });
  }),
];
