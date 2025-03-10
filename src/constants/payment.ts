/**
 * 결제 상태 타입
 * @param APPROVED - 승인완료
 * @param CANCELED - 승인취소
 * * @param REFUNDED - 환불
 */
export const TRANSACTION_STATUS = {
  APPROVED: 'APPROVED',
  CANCELED: 'CANCELED',
} as const;

/**
 * 결제 유형
 * @param LUMP_SUM - 일시불
 * @param INSTALLMENT - 할부
 */
export const PAYMENT_INSTALLMENT = {
  LUMP_SUM: 'LUMP_SUM', // 일시불
  INSTALLMENT: 'INSTALLMENT', // 할부
} as const;

export enum HistoryPaymentStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum HistoryPaymentMethod {
  CARD = 'CARD',
}
