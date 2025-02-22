import { useTransactionList } from '@hooks/queries/usePayments';
import useModal from '@hooks/useModal';
import Button from '@ui/components/button/Button';
import ErrorComponent from '@ui/components/error/ErrorComponent';
import LoadingAnimation from '@ui/components/loading/LoadingAnimation';
import PaymentHistoryDetailModal from '../modal/PaymentHistoryDetailModal';
/**
 * 상태별 스타일 지정
 */
export const getStatusClass = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-700';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700';
    case 'FAILED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
const PaymentList = () => {
  const { data, isLoading, isError } = useTransactionList(0, 999);
  const { openModal } = useModal();
  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError) {
    return <ErrorComponent />;
  }
  return (
    <div className='w-full mx-auto pt-12 pb-24 space-y-12'>
      <h1 className='text-2xl font-bold text-gray-900 text-center'>
        결제 내역
      </h1>

      {data?.length === 0 ? (
        <p className='text-gray-500'>결제 내역이 없습니다.</p>
      ) : (
        <ul className='flex flex-col gap-4'>
          {data?.map((paymentItem) => {
            const latestTransaction = paymentItem.transactions[0];
            return (
              <li
                key={paymentItem.paymentKey}
                className='bg-white rounded-xl border px-6 py-4 border-gray-200'
                onClick={() => {}}
              >
                {/* 결제 정보 */}
                <header className='flex justify-between gap-4 items-center pb-2'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(latestTransaction.status)}`}
                  >
                    {latestTransaction.status}
                  </span>
                  <p className='text-xs text-gray-400'>
                    결제일:{' '}
                    {new Date(latestTransaction.completedAt).toLocaleString()}{' '}
                  </p>
                </header>
                <div className='flex flex-col gap-1 pb-4'>
                  <h2 className='text-base font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-1'>
                    {paymentItem.orderName}
                  </h2>
                  <div className='flex justify-between items-center'>
                    <p className='text-2xl font-semibold'>
                      {latestTransaction.amount.toLocaleString()}원
                    </p>
                    <p className='text-sm text-gray-500'>
                      카드 번호: **** **** ****{' '}
                      {paymentItem.cardNumber.slice(-4)}
                    </p>
                  </div>
                </div>
                <div></div>
                <Button
                  variant={'secondary'}
                  onClick={() =>
                    openModal(
                      <PaymentHistoryDetailModal
                        data={paymentItem.transactions}
                      />,
                    )
                  }
                >
                  상세내역 보기
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PaymentList;
