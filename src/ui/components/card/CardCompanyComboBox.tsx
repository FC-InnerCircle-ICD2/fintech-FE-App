import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@lib/shadcn/components/ui/dropdown-menu';
import Button from '../button/Button';
import Icon from '@ui/components/icon/Icon';

interface CardCompanyComboboxProps {
  cardCompanyList: readonly string[];
  cardCompany: string;
  setCardCompany: (field: string, value: string) => void;
}

const CardCompanyCombobox = ({
  cardCompanyList,
  cardCompany,
  setCardCompany,
}: CardCompanyComboboxProps) => {
  const handleSelect = (company: string) => {
    setCardCompany('cardCompany', company);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline_default'
          className='flex items-center justify-between w-full bg-white/20 border-white/30 text-white p-2 rounded-lg hover:bg-white/30'
        >
          {cardCompany || '카드사를 선택하세요'}
          <Icon name='ChevronDown' size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-full max-h-60 overflow-y-auto bg-white/20 border-white/30 rounded-lg'
      >
        {cardCompanyList.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => handleSelect(option)}
            className='text-white'
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardCompanyCombobox;
