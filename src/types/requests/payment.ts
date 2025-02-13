import type { TransactionStatus } from '@type/payment';

/**
 * QR 결제 상세 조회 요청 타입
 * @param qrToken - QR 토큰
 */
export type GetOrderInfoReq = {
  qrToken: string;
};

/**
 * 결제 요청 요청 타입
 * @param orderId - 주문 ID
 */
export type StartPaymentReq = {
  orderId: string;
};

/**
 * 결제 내역 조회 요청 타입
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @param page - 페이지
 * @param size - 페이지 크기
 * @param transactionStatus - 결제 승인 상태
 */
export type TransactionsReq = {
  startDate?: Date;
  endDate?: Date;
  page: number;
  size: number;
  transactionStatus?: TransactionStatus;
};
