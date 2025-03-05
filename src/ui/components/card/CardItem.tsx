// import { Card, CardContent, CardHeader } from '@lib/shadcn/components/ui/card';
// import type { CardData } from '@type/responses/card';

import { forwardRef, type HTMLAttributes } from 'react';
import { Card, CardContent, CardHeader } from '@lib/shadcn/components/ui/card';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/shadcn/lib/utils';
import type { CardData } from '@type/responses/card';
import Icon from '../icon/Icon';

const cardVariants = cva(
  'rounded-xl relative shadow-2xl transform transition-transform',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 text-white',
        newCard: 'bg-[#D6D6D6]',
      },
      size: {
        default: 'h-[180px] w-[280px] text-xs p-6',
        small: 'h-[160px] w-[250px] text-[0.75rem] p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface CardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  card?: CardData;
  className?: string;
}

const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  ({ card, variant, size, className, ...props }, ref) => {
    const isRepresentative = card?.isRepresentative;

    return (
      <Card
        ref={ref}
        className={cn(
          cardVariants({ variant, size }),
          className,
          isRepresentative ? 'border-4 border-blue-500' : 'border',
        )}
        {...props}
      >
        {isRepresentative && (
          <div className='absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1'>
            <Icon name='Check' size={12} />
          </div>
        )}
        {!card && (
          <CardContent className='h-full flex flex-col items-center justify-center p-6'>
            <Icon
              name='PlusCircle'
              size={38}
              color='#393939'
              className='mb-4'
            />
            <div className='text-lg font-semibold text-gray-800'>
              새 카드 만들기
            </div>
          </CardContent>
        )}
        {card && (
          <>
            <CardHeader className='flex flex-row justify-between items-center p-0'>
              <div className='text-sm font-medium'>
                {card.type ? card.type : 'credit'}
              </div>
              <div className='text-lg font-bold'>
                {card.cardCompany ? card.cardCompany : 'VISA'}
              </div>
            </CardHeader>

            <CardContent className='space-y-6 mt-6 p-0'>
              <div className='tracking-[4px] font-mono'>
                {formatCardNumber(card.cardNumber)}
              </div>
              <div className='flex justify-between items-end'>
                <div>
                  <div className='text-xs opacity-80'>CARD HOLDER</div>
                  <div className='font-medium'>
                    {card.owner ? card.owner : '***'}
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-xs opacity-80'>EXPIRES</div>
                  <div className='font-medium'>{card.expirationPeriod}</div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    );
  },
);

const formatCardNumber = (cardNumber: string) => {
  const visibleDigits = cardNumber.slice(-4);
  return `****-****-****-${visibleDigits}`;
};

CardItem.displayName = 'CardItem';

export default CardItem;
