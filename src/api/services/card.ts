import { api } from '@lib/apiClient';

import { API_ENDPOINTS } from '@constants/apiEndpoints';

import type { CardRegisterReq } from '@type/requests/card';

export const cardService = {
  registerCard: (cardData: CardRegisterReq) =>
    api.post(API_ENDPOINTS.CARD.REGISTER, cardData),
  getCardList: () => api.get(API_ENDPOINTS.CARD.LIST),
  setRepresentativeCard: (cardId: string) =>
    api.post(API_ENDPOINTS.CARD.SET_REPRESENTATIVE(cardId), { cardId }),
  deleteCard: (cardId: string) => api.delete(API_ENDPOINTS.CARD.DELETE(cardId)),
};
