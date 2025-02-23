// import { Card, CardContent, CardHeader } from '@lib/shadcn/components/ui/card';
// import type { CardData } from '@type/responses/card';

import { forwardRef, type HTMLAttributes } from 'react';
import { Card, CardContent, CardHeader } from '@lib/shadcn/components/ui/card';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/shadcn/lib/utils';
import type { CardData } from '@type/responses/card';
import Icon from '../icon/Icon';

const cardVariants = cva('h-[200px] w-[320px] rounded-xl p-6', {
  variants: {
    variant: {
      default: 'bg-gradient-to-br from-blue-600 to-blue-400 text-white',
      newCard: 'bg-[#D6D6D6]',
    },
    size: {
      default: 'h-[200px] w-[320px]',
      small: 'h-[180px] w-[280px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  card?: CardData;
  className?: string;
}

const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  ({ card, variant, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      >
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
              <div className='text-md tracking-[4px] font-mono'>
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
