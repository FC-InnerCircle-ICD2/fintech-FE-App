export const DUMMY_API_CONFIG = {
  ORDER_TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9uYW1lIjoiZGV2ZWxvcGVyIHNob3AiLCJvcmRlcl9uYW1lIjoibmV4dGpzIDEiLCJhbW91bnQiOjUwMDAwLCJpYXQiOjE1MTYyMzkwMjJ9.JFQ2zCTeF7y5Chq9c-p-vMyQ2wn_RyYX9dTxeI5cSxo',
  ORDER: {
    ORDER_NAME: 'MacBook Pro M4',
    AMOUNT: 50000,
    MERCHANT_NAME: '더조은 컴퓨터',
    IAT: 171232323232,
  },
} as const;

/**
 * 카드 목록
 * TODO: owner 추가요청
 *
 *
 * @description 카드 목록을 반환합니다.
 * @returns 카드 목록
 */
export const DUMMY_CARD_LIST = [
  {
    id: '1',
    isRepresentative: true,
    cardCompany: 'VISA',
    cardNumber: '**** **** **** 1234',
    owner: '김철수',
    expirationPriod: '12/26',
    cvc: '123',
    type: 'credit',
    createdAt: '2024-02-11T10:00:00Z',
    updatedAt: '2024-02-11T12:00:00Z',
  },
  {
    id: '2',
    isRepresentative: false,
    cardCompany: 'VISA',
    cardNumber: '**** **** **** 5678',
    owner: '김철수',
    expirationPriod: '07/25',
    cvc: '123',
    type: 'credit',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-02-05T08:45:00Z',
  },
  {
    id: '3',
    isRepresentative: false,
    cardCompany: 'VISA',
    cardNumber: '**** **** **** 9012',
    owner: '이영희',
    expirationPriod: '09/27',
    cvc: '123',
    type: 'credit',
    createdAt: '2023-12-15T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
  },
  {
    id: '4',
    isRepresentative: true,
    cardCompany: 'VISA',
    cardNumber: '**** **** **** 3456',
    owner: '박민수',
    expirationPriod: '03/28',
    cvc: '123',
    type: 'credit',
    createdAt: '2023-11-08T16:20:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: '5',
    isRepresentative: false,
    cardCompany: 'VISA',
    cardNumber: '**** **** **** 7890',
    owner: '최지훈',
    expirationPriod: '06/26',
    cvc: '123',
    type: 'credit',
    createdAt: '2023-10-05T11:45:00Z',
    updatedAt: '2024-01-25T14:30:00Z',
  },
];
