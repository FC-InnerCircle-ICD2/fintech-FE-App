import { TRANSACTION_STATUS } from '@constants/payment';
import useModal from '@hooks/useModal';
import { cn } from '@lib/shadcn/lib/utils';
import { theme } from '@styles/theme';
import Button from '@ui/components/button/Button';
import Icon from '@ui/components/icon/Icon';
import BottomSheetSelect from '@ui/components/select/BottomSheetSelect';
const options = [
  { label: '승인완료', value: TRANSACTION_STATUS.APPROVED },
  { label: '승인취소', value: TRANSACTION_STATUS.CANCELLED },
];
const PaymentListFilter = () => {
  const { closeModal } = useModal();
  return (
    <div className='w-responsive_container grid grid-rows-[3.5rem_1fr_auto] bg-white h-full'>
      <header
        className={cn(
          'grid grid-cols-[auto_1fr_auto] items-center h-14',
          theme.safe_area_inline_padding,
        )}
      >
        <div />
        <span className='text-center font-semibold'>Filter</span>
        <button type='button' onClick={closeModal}>
          <Icon name='X' size={24} />
        </button>
      </header>
      <div className='px-4 h-full overflow-auto'>
        <div>
          <h3 className='font-medium pb-3'>결제 상태</h3>
          <BottomSheetSelect
            placeholder='결제 상태'
            selectName='결제 상태'
            options={options}
          />
        </div>
        <div></div>
      </div>
      <Button
        size={'large'}
        className='mt-auto rounded-none'
        style={{ height: 48 }}
      >
        조회하기
      </Button>
    </div>
  );
};
export default PaymentListFilter;
