import { Card, CardContent } from '@lib/shadcn/components/ui/card';
import Icon from '@ui/components/icon/Icon';

const NewCard = () => {
  return (
    <Card className='h-[200px] w-[320px] bg-[#D6D6D6] rounded-xl'>
      <CardContent className='h-full flex flex-col items-center justify-center p-6'>
        <Icon name='PlusCircle' size={38} color='#393939' className='mb-4' />
        <div className='text-lg font-semibold text-gray-800'>
          새 카드 만들기
        </div>
      </CardContent>
    </Card>
  );
};

export default NewCard;
