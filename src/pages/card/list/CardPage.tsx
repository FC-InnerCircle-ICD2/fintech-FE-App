import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import PageLayout from '@ui/layouts/PageLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@lib/shadcn/components/ui/carousel';
import CardItem from '@ui/components/card/CardItem';
import Button from '@ui/components/button/Button';
import { ROUTES } from '@constants/routes';
import useModal from '@hooks/useModal';
import { useRepresentativeCard } from '@hooks/useRepresenCard';
import { useDeleteCard } from '@hooks/useDeleteCard';
import type { CardData } from '@type/responses/card';
import { QUERY_KEY } from '@constants/apiEndpoints';
import { cardService } from '@api/services/card';

const CardPage = () => {
  const navigate = useNavigate();
  const { openDialog, closeModal } = useModal();
  const { setRepresentativeCard } = useRepresentativeCard();
  const { deleteCard } = useDeleteCard();

  const [cardList, setCardList] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const { mutate: getCardList } = useMutation({
    mutationKey: [QUERY_KEY.CARD.LIST],
    mutationFn: () => cardService.getCardList(),
    onSuccess: (res) => {
      if (res.ok) {
        if (res.data) {
          setCardList(res.data);
        } else {
          setCardList([]);
        }
      }
    },
    onError: (error) => {
      console.log(error);
      return (
        <div>
          <p>카드 목록 조회 실패</p>
        </div>
      );
    },
  });

  useEffect(() => {
    getCardList();
  }, []);

  useEffect(() => {
    console.log(api);

    api?.on('select', () => {
      setCurrentIndex(api?.selectedScrollSnap() + 1 || 0);
    });
  }, [api]);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  const handleNewCardClick = () => {
    navigate(`${ROUTES.CARD.ADD}`);
  };

  const handleRepresentativeCardClick = () => {
    const currentCard = cardList[currentIndex - 1];
    console.log('주 카드로 설정', currentIndex);
    console.log('currentCard', cardList);
    console.log('currentCard', currentCard);

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
                console.log('대표 카드 설정 성공:', res);
                if (res.data) {
                  console.log('대표 카드 설정 성공:', res.data);
                }
              } else {
                console.log('대표 카드 설정 실패:', res);
                // 실패 처리 로직 추가
              }
              closeModal();
            },
          });
        },
      });
    }
  };

  const handleDeleteCardClick = () => {
    const currentCard = cardList[currentIndex - 1];
    if (currentCard) {
      openDialog('alert', {
        title: '카드 삭제',
        description: '카드를 삭제하시겠습니까?',
        confirm: () => {
          deleteCard.mutate(currentCard.id);
          getCardList();
          closeModal();
        },
      });
    }
  };

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
      <div className='bg-white/10 backdrop-blur-sm rounded-2xl py-6 mb-6 flex'>
        <Carousel className='w-full' setApi={setApi}>
          <CarouselContent className='ml-4 mr-8'>
            {cardList.length > 0 ? (
              <>
                {cardList.map((card, index) => (
                  <>
                    <CarouselItem key={index} className='basis-auto'>
                      <CardItem card={card} />
                    </CarouselItem>
                  </>
                ))}
                <CarouselItem
                  key={cardList.length + 1}
                  className='basis-auto'
                  onClick={handleNewCardClick}
                >
                  <CardItem variant='newCard' />
                </CarouselItem>
              </>
            ) : (
              <>
                <CarouselItem
                  onClick={handleNewCardClick}
                  className='basis-auto'
                >
                  <CardItem variant='newCard' />
                </CarouselItem>
              </>
            )}
          </CarouselContent>
        </Carousel>
      </div>
      {cardList.length > 0 && (
        <div
          className={`flex flex-col items-center ${currentIndex === cardList.length + 1 ? 'invisible' : ''}`}
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
