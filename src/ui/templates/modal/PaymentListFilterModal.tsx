import { useState } from 'react';
import useModal from '@hooks/useModal';
import { cn } from '@lib/shadcn/lib/utils';
import { theme } from '@styles/theme';
import Button from '@ui/components/button/Button';
import Icon from '@ui/components/icon/Icon';
import BottomSheetSelect, {
  type SelectOption,
} from '@ui/components/select/BottomSheetSelect';
import { usePaymentFilterStore } from '@stores/paymentFilter';

const options = [
  { label: '승인완료', value: 'APPROVED' },
  { label: '승인취소', value: 'CANCELLED' },
];

const PaymentListFilterModal = () => {
  const { closeModal } = useModal();
  const { startDate, endDate, updateFilters } = usePaymentFilterStore();

  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedStatus, setSelectedStatus] = useState<SelectOption | null>(
    null,
  );

  const handleApplyFilter = () => {
    updateFilters({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      status: selectedStatus,
    });
    closeModal();
  };

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
            onChange={(value) => setSelectedStatus(value)}
          />
        </div>

        <div className='mt-4'>
          <h3 className='font-medium pb-3'>기간 선택</h3>
          <div className='flex items-center gap-4'>
            <input
              type='date'
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
              className='border px-3 py-2 rounded-md w-full bg-white text-gray-800'
            />
            <span>~</span>
            <input
              type='date'
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
              className='border px-3 py-2 rounded-md w-full bg-white text-gray-800'
            />
          </div>
        </div>
      </div>

      <Button
        size='large'
        className='mt-auto rounded-none'
        style={{ height: 48 }}
        onClick={handleApplyFilter}
      >
        조회하기
      </Button>
    </div>
  );
};

export default PaymentListFilterModal;
