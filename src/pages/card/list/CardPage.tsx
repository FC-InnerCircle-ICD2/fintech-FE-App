import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@ui/layouts/PageLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@lib/shadcn/components/ui/carousel';
import { DUMMY_CARD_LIST } from '@mocks/config/dummy';
import CardItem from '@ui/components/card/CardItem';
import NewCard from '@ui/components/card/NewCard';
import Button from '@ui/components/button/Button';
import { ROUTES } from '@constants/routes';

const CardPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

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
    console.log('주 카드로 설정', currentIndex);
  };

  const handleDeleteCardClick = () => {
    console.log('카드 삭제', currentIndex);
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
          <CarouselContent className='carouselcontent mx-8 px-2'>
            {DUMMY_CARD_LIST.length > 0 ? (
              <>
                {DUMMY_CARD_LIST.map((card) => (
                  <CarouselItem key={card.id} className='carouselitem'>
                    <CardItem card={card} />
                  </CarouselItem>
                ))}
                <CarouselItem onClick={handleNewCardClick}>
                  <NewCard />
                </CarouselItem>
              </>
            ) : (
              <CarouselItem onClick={handleNewCardClick}>
                <NewCard />
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </div>
      {DUMMY_CARD_LIST.length > 0 && (
        <div className='flex flex-col items-center'>
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
