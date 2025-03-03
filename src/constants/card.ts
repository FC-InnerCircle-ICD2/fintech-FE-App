export const CARD_COMPANIES = [
  '국민',
  '현대',
  '신한',
  '비씨',
  '삼성',
  '롯데',
  'NH',
  '하나',
  '우리',
  '광주',
  '수협',
  '씨티',
  '전북',
  '제주',
  '카카오뱅크',
  '케이뱅크',
  'UnionPay',
] as const;

export type CardCompany = (typeof CARD_COMPANIES)[number];
