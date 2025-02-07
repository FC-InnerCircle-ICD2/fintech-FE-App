import { ROUTES } from '@constants/routes';
import { useTransactionList } from '@hooks/queries/usePayments';
import { convertDateFormat, convertCurrencyFormat } from '@lib/formatter';
import ErrorComponent from '@ui/components/error/ErrorComponent';
import LoadingAnimation from '@ui/components/loading/LoadingAnimation';
import { useNavigate, generatePath } from 'react-router-dom';

const PaymentList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTransactionList();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError || !data) {
    return <ErrorComponent />;
  }

  return (
    <ul className='pt-6 pb-24'>
      {data.transactions?.map((list) => (
        <li
          key={list.id}
          className='w-full h-16 border-b border-gray-200 flex justify-between items-center px-4 mb-4 cursor-pointer'
          onClick={() => {
            const path = generatePath(ROUTES.TRANSACTIONS.DETAIL, {
              id: list.id.toString(),
            });
            navigate(path);
          }}
        >
          <div>
            <p className='font-bold'>
              {convertCurrencyFormat(list.amount)} KRW
            </p>
            <p>{list.store}</p>
          </div>
          <div className='text-gray-400'>
            {convertDateFormat(list.approvedAt)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PaymentList;
