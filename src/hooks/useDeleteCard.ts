import { cardService } from '@api/services/card';
import { QUERY_KEY } from '@constants/apiEndpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useModal from './useModal';

export const useDeleteCard = () => {
  const { openDialog, closeModal } = useModal();
  const queryClient = useQueryClient();

  const deleteCard = useMutation({
    mutationKey: [QUERY_KEY.CARD.DELETE],
    mutationFn: async (cardId: number) => {
      return cardService.deleteCard(cardId);
    },
    onSuccess: (res) => {
      if (res.ok) {
        openDialog('alert', {
          title: '카드 삭제 완료',
          description: '카드 삭제가 완료되었습니다.',
          confirm: () => {
            closeModal();
          },
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARD.LIST] });
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
