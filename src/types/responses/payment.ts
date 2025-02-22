import type { InstallmentType, TransactionStatus } from '@type/payment';

/**
 * 주문 정보 응답 타입
 * @param paymentKey - 결제 키
 * @param orderId - 주문 ID
 * @param cardNumber - 카드 번호
 * @param amount - 주문 금액
 */
export type PaymentRequestRes = {
  paymentKey: string;
  orderId: string;
  cardNumber: number;
  amount: number;
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

/**
 * 트랜잭션 정보
 */
export interface Transaction {
  id: number;
  paymentKey: string;
  amount: number;
  status: TransactionStatus; // 가능한 상태값 명시
  reason: string;
  requestedAt: string; // ISO 날짜 형식
  completedAt: string; // ISO 날짜 형식
}
export type TransactionsRes = {
  paymentKey: string;
  cardNumber: string;
  accountId: number;
  transactions: Transaction[];
  paymentType: 'CARD' | 'BANK_TRANSFER' | 'MOBILE' | 'POINT';
  orderId: string;
  orderName: string;
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
 * @param orderId - 주문 ID
 * @param orderName - 주문 이름
 * @param amount - 주문 금액
 * @param merchantId - 매장 ID
 * @param merchantName - 매장 이름
 * @param iat - 토큰 발급 시간
 */
export type OrderInfoJwtRes = {
  orderId: string;
  orderName: string;
  amount: number;
  merchantId: number;
  merchantName: string;
  iat: number;
};
