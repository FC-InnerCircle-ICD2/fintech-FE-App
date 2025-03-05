import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@lib/apiClient';
import type { TransactionsRes } from '@type/responses/payment';
import { API_ENDPOINTS, QUERY_KEY } from '@constants/apiEndpoints';
import useModal from '@hooks/useModal';
import Button from '@ui/components/button/Button';
import ErrorComponent from '@ui/components/error/ErrorComponent';
import LoadingAnimation from '@ui/components/loading/LoadingAnimation';
import PaymentHistoryDetailModal from '../modal/PaymentHistoryDetailModal';
import Icon from '@ui/components/icon/Icon';
import PaymentListFilter from './PaymentListFilter';

/**
 * @todo 리스트 가상화 하기
 */
/**
 * 결제 상태별 스타일 클래스 반환 함수
 */
export const getStatusClass = (status: string): string => {
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

/**
 * API 응답 타입
 */
type PaymentHistoryResponse = {
  payments: TransactionsRes[];
};

const LIMIT_COUNT = 10;

/**
 * 결제 내역 리스트 컴포넌트
 */
const PaymentList = () => {
  const today = new Date();
  const formattedUTCDate = today.toISOString().split('T')[0]; // UTC 날짜 변환
  const { openModal } = useModal();

  const { data, isFetchingNextPage, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.MANAGEMENT.HISTORY],
      queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
        const response = await api.get<PaymentHistoryResponse>(
          API_ENDPOINTS.MANAGEMENT.HISTORY.LIST,
          {
            searchParams: {
              startDate: '2020-01-01',
              endDate: formattedUTCDate,
              page: pageParam.toString(),
              limit: LIMIT_COUNT.toString(),
            },
          },
        );

        if (response.ok) {
          return response.data;
        }
        return { payments: [] };
      },
      initialPageParam: 0, // ✅ 필수: 첫 번째 요청의 기본 pageParam 값 설정
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.payments.length < LIMIT_COUNT
          ? undefined
          : allPages.length;
      },
    });

  if (!data) {
    return (
      <div className='w-full mx-auto pt-12 pb-24 space-y-12'>
        <LoadingAnimation />
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent />;
  }

  // 전체 결제 내역 리스트
  const allPayments = data.pages.flatMap((page) => page.payments);

  return (
    <>
      <div className='w-full mx-auto px-4 pt-4 pb-20 bg-gray-50'>
        <div className='flex justify-between items-center pt-8 pb-4'>
          <div></div>
          <Button
            variant={'outline_default'}
            width={'fit'}
            size={'medium'}
            rounded
            className='text-xs'
            onClick={() =>
              openModal(<PaymentListFilter />, {
                enableOverlay: false,
                enableOverlayClickClose: false,
              })
            }
          >
            <Icon name='ListFilter' size={16} /> Filter
          </Button>
        </div>
        {allPayments.length === 0 ? (
          <p className='text-gray-500'>결제 내역이 없습니다.</p>
        ) : (
          <div className='flex flex-col gap-4'>
            <ul className='flex flex-col gap-4'>
              {allPayments.map((paymentItem) => {
                const hasTransaction = paymentItem.transactions.length > 0;
                const latestTransaction = hasTransaction
                  ? paymentItem.transactions[0]
                  : null;

                return (
                  <li
                    key={paymentItem.paymentKey}
                    className='bg-white rounded-xl border px-4 py-4 border-gray-200'
                  >
                    <header className='flex justify-between gap-4 items-center pb-2'>
                      {latestTransaction && (
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-medium ${getStatusClass(
                            latestTransaction.status,
                          )}`}
                        >
                          {latestTransaction.status}
                        </span>
                      )}
                      <p className='text-xs text-gray-400'>
                        결제일시:{' '}
                        {latestTransaction &&
                          new Date(
                            latestTransaction.completedAt,
                          ).toLocaleString()}
                      </p>
                    </header>
                    <div className='flex flex-col gap-1 pb-4'>
                      <h2 className='text-base font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-1'>
                        {paymentItem.orderName}
                      </h2>
                      <div className='flex justify-between items-end'>
                        <p className='text-[14px] text-gray-500'>
                          **** **** **** {paymentItem.cardNumber.slice(-4)}
                        </p>
                        <p className='text-xl font-semibold'>
                          {latestTransaction &&
                            latestTransaction.amount.toLocaleString()}
                          원
                        </p>
                      </div>
                    </div>
                    <Button
                      variant='outline_primary'
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
            {hasNextPage && (
              <Button
                className='text-[14px] '
                onClick={() => fetchNextPage()}
                isPending={isFetchingNextPage}
                variant={'gray'}
                size={'large'}
              >
                더 보기
                <Icon name='ChevronDown' />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentList;
