import { cardService } from '@api/services/card';
import { QUERY_KEY } from '@constants/apiEndpoints';
import { useMutation } from '@tanstack/react-query';

export const useRepresentativeCard = () => {
  const setRepresentativeCard = useMutation({
    mutationKey: [QUERY_KEY.CARD.SET_REPRESENTATIVE],
    mutationFn: async (cardId: number) => {
      return cardService.setRepresentativeCard(cardId);
    },
  });

  return { setRepresentativeCard };
};
