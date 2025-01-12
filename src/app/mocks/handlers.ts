import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import { http, HttpResponse } from 'msw';

// user 정보 조회 핸들러 추가
export const handlers = [
  http.get(API_ENDPOINTS.USERS.LOGIN, () => {
    return HttpResponse.json({
      code: 200,
      data: {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
      },
    });
  }),

  // 주문 정보 조회
  http.get(
    `/${API_ENDPOINTS.PAYMENT.ORDER.INFO(':orderToken')}`,
    ({ params }) => {
      const { orderToken } = params;
      return HttpResponse.json({
        code: 200,
        data: {
          orderToken: `order-${orderToken}`,
          orderId: `order-${orderToken}`,
          orderName: '테스트 상품 외2',
          amount: 15000,
          store: '테스트 가맹점',
          url: 'https://example.com',
        },
      });
    },
  ),

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
            orderId: 'order-001',
            orderName: '테스트 상품 A외 2건',
            paymentStatus: 'COMPLETED', // COMPLETED, CANCELED
            paymentMethod: 'CARD',
            amount: 15000,
            createdAt: '2024-03-20T09:00:00',
          },
          {
            historyId: 'history-002',
            orderId: 'order-002',
            orderName: '테스트 상품 B',
            paymentStatus: 'CANCELED',
            paymentMethod: 'CARD',
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
        paymentStatus: 'COMPLETED',
        paymentMethod: 'CARD',
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
