/**
 * 카드 데이터 타입
 * @param id - 카드 ID
 * @param accountId - 계정 ID
 * @param isRepresentative - 대표 카드 여부
 * @param cardCompany - 카드 회사
 * @param cardNumber - 카드 번호
 * @param expirationPeriod - 카드 만료일
 * @param cvc - 카드 cvc
 * @param owner - 카드 소유자
 * @param type - 카드 타입
 */
export type CardData = {
  id: number;
  accountId: number;
  isRepresentative: boolean;
  cardCompany: string;
  cardNumber: string;
  expirationPeriod: string;
  cvc: string;
  owner: string;
  type: string;
};
