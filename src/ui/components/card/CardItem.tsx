import { Card, CardContent, CardHeader } from '@lib/shadcn/components/ui/card';
import type { CardData } from '@type/responses/card';

const CardItem = ({ card }: { card: CardData }) => {
  return (
    <Card className='h-[200px] w-[320px] bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-xl p-6'>
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
          {card.cardNumber}
        </div>
        <div className='flex justify-between items-end'>
          <div>
            <div className='text-xs opacity-80'>CARD HOLDER</div>
            <div className='font-medium'>{card.owner}</div>
          </div>
          <div className='text-right'>
            <div className='text-xs opacity-80'>EXPIRES</div>
            <div className='font-medium'>{card.expirationPriod}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;
