import type { Transaction } from '@type/responses/payment';
import { getStatusClass } from '../transactions/PaymentList';
import Icon from '@ui/components/icon/Icon';
import useModal from '@hooks/useModal';

interface PaymentHistoryDetailModalProps {
  data: Transaction[];
}
const PaymentHistoryDetailModal = ({
  data,
}: PaymentHistoryDetailModalProps) => {
  const { closeModal } = useModal();
  return (
    <div className='bg-white w-[calc(min(100%,600px)-2rem)] py-4 max-h-[70dvh] rounded-xl'>
      <header className='flex justify-between items-center px-4 pb-4'>
        <div className='flex items-center'>
          <h3 className='text-xl font-medium text-gray-800 '>상세내역</h3>
          <span className='text-lg text-gray-400 '>({data.length})</span>
        </div>
        <button type='button' onClick={closeModal}>
          <Icon name={'X'} size={24} />
        </button>
      </header>
      <div className='grid gap-4 px-4 overflow-auto max-h-[60dvh]'>
        <ul>
          {data.map((trx) => (
            <li
              key={trx.id}
              className=' p-4 border-b last:border-0 border-gray-100 flex flex-col gap-2'
            >
              <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-700'>
                  금액:{' '}
                  <span className='font-semibold text-blue-600'>
                    {trx.amount.toLocaleString()} 원
                  </span>
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(trx.status)}`}
                >
                  {trx.status}
                </span>
              </div>

              <p className='text-sm text-gray-500'>
                요청 일시: {new Date(trx.requestedAt).toLocaleString()}
              </p>
              <p className='text-sm text-gray-500'>
                생성 일시: {new Date(trx.completedAt).toLocaleString()}
              </p>
            </li>
          ))}{' '}
        </ul>
      </div>
    </div>
  );
};

export default PaymentHistoryDetailModal;
