import { cardService } from '@api/services/card';
import { QUERY_KEY } from '@constants/apiEndpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useModal from './useModal';
import type { CardData } from '@type/responses/card';

export const useDeleteCard = () => {
  const { openDialog, closeModal } = useModal();
  const queryClient = useQueryClient();

  const deleteCard = useMutation({
    mutationKey: [QUERY_KEY.CARD.DELETE],
    mutationFn: async (cardId: number) => {
      return cardService.deleteCard(cardId);
    },
    onSuccess: (res) => {
      if (res.ok && res.data) {
        const currentCard = res.data as CardData;
        queryClient.setQueryData(
          [QUERY_KEY.CARD.LIST],
          (oldData: { ok: boolean; data: CardData[] } | undefined) => {
            if (!oldData || !Array.isArray(oldData.data)) return oldData;
            return {
              ...oldData,
              data: oldData.data.filter(
                (card: CardData) => card.id !== currentCard.id,
              ),
            };
          },
        );
        closeModal();
      } else {
        openDialog('alert', {
          title: '카드 삭제 실패',
          description: '카드 삭제에 실패했습니다.',
          confirm: () => {
            closeModal();
          },
        });
      }
    },
  });

  return { deleteCard };
};
