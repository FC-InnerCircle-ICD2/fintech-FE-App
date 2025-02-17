/**
 * 카드 데이터 타입
 * @param id - 카드 ID
 * @param isRepresentative - 대표 카드 여부
 * @param cardCompany - 카드 회사
 * @param cardNumber - 카드 번호
 * @param owner - 카드 소유자
 * @param expirationPriod - 카드 만료일
 * @param cvc - 카드 cvc
 * @param type - 카드 타입
 * @param createdAt - 카드 생성일
 * @param updatedAt - 카드 수정일
 */
export type CardData = {
  id: string;
  isRepresentative: boolean;
  cardCompany: string;
  cardNumber: string;
  owner: string;
  expirationPriod: string;
  cvc: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};
