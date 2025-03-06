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
import { TRANSACTION_STATUS } from '@constants/payment';

const options = [
  { label: '승인완료', value: TRANSACTION_STATUS.APPROVED },
  { label: '승인취소', value: TRANSACTION_STATUS.CANCELED },
];

const PaymentListFilterModal = () => {
  const { closeModal } = useModal();
  const { startDate, endDate, status, updateFilters } = usePaymentFilterStore(); // ✅ Zustand에서 필터 가져옴

  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedStatus, setSelectedStatus] = useState<SelectOption | null>(
    status || null,
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
        <div className='mt-10'>
          <h3 className='font-medium pb-3'>결제 상태</h3>
          <BottomSheetSelect
            placeholder='결제 상태'
            selectName='결제 상태'
            options={options}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
          />
        </div>

        <div className='mt-10'>
          <h3 className='font-medium pb-3'>기간 선택</h3>
          <div className='flex items-center gap-2'>
            {/* 시작 날짜 선택 버튼 */}
            <div className='relative '>
              <input
                type='date'
                id='start-date'
                value={selectedStartDate}
                onChange={(e) => setSelectedStartDate(e.target.value)}
                className='absolute w-0 h-0 opacity-0 pointer-events-none clip-path'
              />
              <button
                onClick={() => {
                  const input = document.getElementById(
                    'start-date',
                  ) as HTMLInputElement;
                  if (input) input.showPicker();
                }} // ✅ showPicker() 사용 가능하도록 타입 단언 적용
                className={cn(
                  'flex items-center text-xs gap-2 px-3 py-2 border rounded-full bg-white transition-all font-medium w-full',
                  selectedStartDate
                    ? 'text-gray-700 border-gray-300'
                    : 'text-gray-400 border-gray-200',
                )}
              >
                <Icon name='Calendar' size={16} />
                {selectedStartDate ? selectedStartDate : '시작 날짜 선택'}
              </button>
            </div>

            <span>~</span>

            {/* 종료 날짜 선택 버튼 */}
            <div className='relative'>
              <input
                type='date'
                id='end-date'
                value={selectedEndDate}
                onChange={(e) => setSelectedEndDate(e.target.value)}
                className='absolute w-0 h-0 opacity-0 pointer-events-none clip-path'
              />
              <button
                onClick={() => {
                  const input = document.getElementById(
                    'end-date',
                  ) as HTMLInputElement;
                  if (input) input.showPicker();
                }} // ✅ showPicker() 사용 가능하도록 타입 단언 적용
                className={cn(
                  'flex items-center text-xs gap-2 px-3 py-2 border rounded-full bg-white transition-all font-medium w-full',
                  selectedEndDate
                    ? 'text-gray-700 border-gray-300'
                    : 'text-gray-400 border-gray-200',
                )}
              >
                <Icon name='Calendar' size={16} />
                {selectedEndDate ? selectedEndDate : '종료 날짜 선택'}
              </button>
            </div>
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
