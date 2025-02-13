import { TRANSACTION_STATUS } from '@constants/payment';
import { useTransactionDetail } from '@hooks/queries/usePayments';
import { convertCurrencyFormat } from '@lib/formatter';
import Button from '@ui/components/button/Button';
import ErrorComponent from '@ui/components/error/ErrorComponent';
import LoadingAnimation from '@ui/components/loading/LoadingAnimation';
import DetailRow from '@ui/components/transactionDetailPage/DetailRow';
import PaymentResultDisplay from '@ui/components/transactionDetailPage/PaymentResultDisplay';
import TaxRow from '@ui/components/transactionDetailPage/TaxRow';
import PageLayout from '@ui/layouts/PageLayout';
import { useLocation } from 'react-router-dom';

const TransactionDetailPage = () => {
  const location = useLocation();
  const historyId = location.pathname.split('/').pop() || '';

  const { data, isLoading, isError } = useTransactionDetail(historyId);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError || !data) {
    return <ErrorComponent />;
  }

  return (
    <PageLayout hasNav className='flex flex-col justify-center py-8'>
      <div className='mt-8'>
        <PaymentResultDisplay data={data.transactionStatus} />

        <h2
          className={`text-center mt-4 font-bold text-3xl ${data.transactionStatus === TRANSACTION_STATUS.APPROVED ? 'text-black' : 'text-red-500'}`}
        >
          {convertCurrencyFormat(data.totalAmount)} KRW
        </h2>
      </div>
      <hr className='my-8 border-b border-gray-200 w-full' />
      <div>
        <DetailRow label='거래 번호' value={data.id} />
        <DetailRow
          label={
            data.transactionStatus === TRANSACTION_STATUS.APPROVED
              ? '결제 일시'
              : '취소 일시'
          }
          value={
            data.transactionStatus === TRANSACTION_STATUS.APPROVED
              ? data.approvedAt
              : data.cancelledAt
          }
        />
        <DetailRow label='카드번호' value={data.cardNumber} />
        <DetailRow label='상점명' value={data.store} />
      </div>
      <hr className='mb-8 border-b-2 border-dashed border-gray-200 w-full' />
      <div>
        <TaxRow label='공급가액' value={data.supplyAmount} />

        <div role='separator' className='mb-8' />

        <TaxRow label='부가세' value={data.vatAmount} />
      </div>

      <Button
        size={'extraLarge'}
        width={'fit'}
        variant={'outline_primary'}
        rounded
        className='m-auto mt-8'
        onClick={() => window.history.back()}
      >
        확인
      </Button>
    </PageLayout>
  );
};

export default TransactionDetailPage;
