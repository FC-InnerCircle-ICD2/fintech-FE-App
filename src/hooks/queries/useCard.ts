import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/apiEndpoints';
import { cardService } from '@api/services/card';

export const useCardList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CARD.LIST],
    queryFn: () => cardService.getCardList(),
    select: (response) => (response.ok ? response.data : []),
  });
};
