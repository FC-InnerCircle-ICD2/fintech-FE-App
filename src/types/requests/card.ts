/**
 * 카드 등록 요청 타입
 * @param cardNumber - 카드 번호
 * @param expireDate - 만료 날짜
 * @param cvc - 비밀번호
 */
export type CardRegisterReq = {
  isRepresentative: boolean;
  cardNumber: string;
  expirationPeriod: string;
  cvc: string;
};
