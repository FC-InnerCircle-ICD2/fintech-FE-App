import { API_ENDPOINTS } from '@constants/apiEndpoints';
import { http, HttpResponse } from 'msw';

export const orderHandler = [
  // 주문 정보 조회
  http.get(API_ENDPOINTS.PAYMENT.ORDER.INFO(':orderToken'), ({ params }) => {
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
  }),
  // sse
  http.get(API_ENDPOINTS.PAYMENT.ORDER.SSE, () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const messages = [
          'data: {"message": "Event 1"}\n\n',
          'data: {"message": "Event 2"}\n\n',
          'data: {"message": "Event 3"}\n\n',
        ];

        messages.forEach((message, index) => {
          setTimeout(() => {
            controller.enqueue(encoder.encode(message));
            if (index === messages.length - 1) {
              controller.close();
            }
          }, index * 3000); // 3초 간격으로 메시지 전송
        });
      },
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }),

  http.get(API_ENDPOINTS.PAYMENT.ORDER.SSE_TEMP, () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const message = 'data: {"message": "success"}\n\n';
        setTimeout(() => {
          controller.enqueue(encoder.encode(message));
          controller.close();
        }, 3000); // 3초 간격으로 메시지 전송
      },
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  }),
];
