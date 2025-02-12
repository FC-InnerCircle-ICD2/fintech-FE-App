import type { InstallmentType, TransactionStatus } from '@type/payment';

/**
 * 주문 정보 응답 타입
 * @param orderId - 주문 ID
 * @param orderName - 주문 이름
 * @param amount - 주문 금액
 * @param store - 매장 이름
 */
export type OrderInfoRes = {
  orderId: string;
  orderName: string;
  amount: number;
  store: string;
};

/**
 * 결제 내역 응답 타입
 * @param id - 고유 ID
 * @param store - 매장 이름
 * @param orderName - 주문 이름
 * @param amount - 결제 금액
 * @param approvedAt - 승인 일시
 * @param cancelledAt - 취소 일시
 * @param transactionStatus - 결제 승인 상태
 */
export type TransactionsRes = {
  id: number;
  store: string;
  orderName: string;
  amount: number;
  approvedAt: string;
  cancelledAt?: string;
  transactionStatus: TransactionStatus;
};

/**
 * 결제 내역 페이지 응답 타입
 * @param transactions - 결제 내역 리스트
 * @param totalAmount - 총 결제 금액
 * @param page - 페이지
 * @param size - 페이지 크기
 * @param totalCount - 총 결제 건수
 * @param totalPages - 총 페이지 수
 */
export type TransactionsPageRes = {
  transactions: TransactionsRes[];
  totalAmount: number;
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
};

/**
 * 결제 내역 상세 응답 타입
 * @param id - 고유 ID
 * @param store - 매장 이름
 * @param orderName - 주문 이름
 * @param supplyAmount - 공급 금액
 * @param vatAmount - 부가세 금액
 * @param totalAmount - 총 금액
 * @param cardNumber - 카드 번호
 * @param paymentType - 결제 유형 (일시불, 할부)
 * @param approvedAt - 승인 일시
 * @param cancelledAt - 취소 일시
 * @param transactionStatus - 결제 승인 상태
 */
export type TransactionDetailRes = {
  id: number;
  store: string;
  orderName: string;
  supplyAmount: number;
  vatAmount: number;
  totalAmount: number;
  cardNumber: string;
  installmentType: InstallmentType;
  approvedAt: string;
  cancelledAt?: string;
  transactionStatus: TransactionStatus;
};

/**
 * 주문 정보 JWT 파싱 타입
 * @param orderName - 주문 이름
 * @param amount - 주문 금액
 * @param merchantName - 매장 이름
 * @param iat - 토큰 발급 시간
 * @param orderId - 주문 ID
 */
export type OrderInfoJwtRes = {
  orderId: string;
  orderName: string;
  amount: number;
  merchantName: string;
  iat: number;
};
