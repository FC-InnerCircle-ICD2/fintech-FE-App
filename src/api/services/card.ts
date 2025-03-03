import { api } from '@lib/apiClient';

import { API_ENDPOINTS } from '@constants/apiEndpoints';

import type { CardRegisterReq } from '@type/requests/card';
import type { CardData } from '@type/responses/card';

export const cardService = {
  registerCard: (cardData: CardRegisterReq) =>
    api.post(API_ENDPOINTS.CARD.REGISTER, cardData),

  getCardList: () => api.get<CardData[]>(API_ENDPOINTS.CARD.LIST),

  setRepresentativeCard: (cardId: number) =>
    api.patch<CardData[]>(API_ENDPOINTS.CARD.SET_REPRESENTATIVE(cardId)),

  deleteCard: (cardId: number) => api.delete(API_ENDPOINTS.CARD.DELETE(cardId)),
};
