import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import PageLayout from '@ui/layouts/PageLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@lib/shadcn/components/ui/carousel';
import CardItem from '@ui/components/card/CardItem';
import Button from '@ui/components/button/Button';
import LoadingAnimation from '@ui/components/loading/LoadingAnimation';
import ErrorComponent from '@ui/components/error/ErrorComponent';
import { ROUTES } from '@constants/routes';
import { QUERY_KEY } from '@constants/apiEndpoints';

import useModal from '@hooks/useModal';
import { useRepresentativeCard } from '@hooks/useRepresenCard';
import { useDeleteCard } from '@hooks/useDeleteCard';
import { useCardList } from '@hooks/queries/useCard';
import type { CardData } from '@type/responses/card';

const CardPage = () => {
  const navigate = useNavigate();
  const { openDialog, closeModal } = useModal();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useCardList();
  const { setRepresentativeCard } = useRepresentativeCard();
  const { deleteCard } = useDeleteCard();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api) {
      api.on('select', () => {
        setCurrentIndex(api.selectedScrollSnap() + 1 || 0);
      });
    }
  }, [api]);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  const handleNewCardClick = () => {
    navigate(ROUTES.CARD.ADD);
  };

  const handleRepresentativeCardClick = () => {
    const currentCard = data?.[currentIndex - 1];
    if (!currentCard) return;

    if (currentCard.isRepresentative) {
      openDialog('alert', {
        title: '주 카드 설정',
        description: '이미 주 카드로 설정되어 있습니다.',
      });
    } else {
      openDialog('confirm', {
        title: '주 카드 설정',
        description: '주 카드로 설정하시겠습니까?',
        confirm: () => {
          setRepresentativeCard.mutate(currentCard.id, {
            onSuccess: (res) => {
              if (res.ok) {
                if (res.data) {
                  queryClient.setQueryData(
                    [QUERY_KEY.CARD.LIST],
                    (
                      oldData: { ok: boolean; data: CardData[] } | undefined,
                    ) => {
                      if (!oldData || !Array.isArray(oldData.data)) {
                        return oldData;
                      }
                      return {
                        ...oldData,
                        data: oldData.data.map((card) =>
                          card.id === currentCard.id
                            ? { ...card, isRepresentative: true }
                            : { ...card, isRepresentative: false },
                        ),
                      };
                    },
                  );
                }
              } else {
                openDialog('alert', {
                  title: '대표 카드 설정 실패',
                  description: '대표 카드 설정에 실패했습니다.',
                });
              }
              closeModal();
            },
            onError: (error) => {
              console.error('Mutation onError executed', error);
              openDialog('alert', {
                title: '오류 발생',
                description: '카드 설정 중 오류가 발생했습니다.',
              });
              closeModal();
            },
          });
        },
      });
    }
  };

  const handleDeleteCardClick = () => {
    const currentCard = data?.[currentIndex - 1];
    if (!currentCard) return;
    openDialog('confirm', {
      title: '카드 삭제',
      description: '카드를 삭제하시겠습니까?',
      confirm: () => {
        deleteCard.mutate(currentCard.id);
      },
    });
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError || !data) {
    return <ErrorComponent />;
  }

  return (
    <PageLayout
      hasNav
      className='w-full h-full flex flex-col justify-center'
      style={{
        backgroundImage: `radial-gradient(
          circle at top right,
          rgba(60, 20, 136, 0.6) 0%,
          rgba(75, 71, 180, 0.6) 20%,
          rgba(95, 122, 199, 0.6) 40%,
          rgba(64, 134, 147, 0.6) 60%,
          rgba(30, 127, 132, 0.6) 80%,
          rgba(30, 127, 132, 0.6) 100%
        )`,
      }}
    >
      <div className='bg-white/10 backdrop-blur-sm rounded-2xl pt-6 mb-6 flex'>
        <Carousel className='w-full' setApi={setApi}>
          <CarouselContent className='ml-4 mr-8 pb-6'>
            {data && data.length > 0 ? (
              <>
                {data.map((card, index) => (
                  <CarouselItem key={index} className='basis-auto'>
                    <CardItem card={card} />
                  </CarouselItem>
                ))}
                <CarouselItem
                  key={data.length + 1}
                  className='basis-auto'
                  onClick={handleNewCardClick}
                >
                  <CardItem variant='newCard' />
                </CarouselItem>
              </>
            ) : (
              <CarouselItem onClick={handleNewCardClick} className='basis-auto'>
                <CardItem variant='newCard' />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>
      {data && data.length > 0 && (
        <div
          className={`flex flex-col items-center ${currentIndex === data.length + 1 ? 'invisible' : ''}`}
        >
          <Button
            className=' text-white px-6 py-3 rounded-full mb-5'
            variant='default'
            size='large'
            width='fit'
            onClick={handleRepresentativeCardClick}
          >
            + 주 카드로 설정
          </Button>
          <Button
            className=' bg-transparent text-red-500 px-6 py-3 rounded-full mb-5'
            size='large'
            width='fit'
            onClick={handleDeleteCardClick}
          >
            카드 삭제
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default CardPage;
