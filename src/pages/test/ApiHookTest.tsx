import {
  useOrderInfo,
  useRequestPayment,
  useCancelPayment,
  useHistoryList,
  useHistoryDetail,
} from '@shared/hooks/queries/usePayments';

const ApiHookTest = () => {
  // 1. 주문 정보 조회 테스트
  const { data: orderData, isLoading: orderLoading } =
    useOrderInfo('test-order-123');

  // 2. 결제 요청/취소 테스트
  const { mutate: requestPayment, isPending: requestPending } =
    useRequestPayment();
  const { mutate: cancelPayment, isPending: cancelPending } =
    useCancelPayment();

  // 3. 결제 내역 조회 테스트
  const { data: historyList } = useHistoryList();
  const { data: historyDetail } = useHistoryDetail('history-123');

  // 결제 요청 핸들러
  const handlePaymentRequest = () => {
    requestPayment('test-order-123', {
      onSuccess: () => {
        alert('결제가 성공적으로 처리되었습니다.');
      },
      onError: (error) => {
        alert(`결제 처리 중 오류가 발생했습니다: ${error.message}`);
      },
    });
  };

  // 결제 취소 핸들러
  const handlePaymentCancel = () => {
    cancelPayment('test-order-123', {
      onSuccess: () => {
        alert('결제가 성공적으로 취소되었습니다.');
      },
      onError: (error) => {
        alert(`결제 취소 중 오류가 발생했습니다: ${error.message}`);
      },
    });
  };

  if (orderLoading) return <div>주문 정보 로딩 중...</div>;

  return (
    <div className='p-4 space-y-8'>
      <section>
        <h2 className='text-xl font-bold mb-4'>🔍 주문 정보 테스트</h2>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p>주문 ID: {orderData?.orderId}</p>
          <p>상품명: {orderData?.orderName}</p>
          <p>금액: {orderData?.amount}원</p>
          <p>가맹점: {orderData?.store}</p>
        </div>
      </section>

      <section>
        <h2 className='text-xl font-bold mb-4'>💳 결제 요청/취소 테스트</h2>
        <div className='space-x-4'>
          <button
            onClick={handlePaymentRequest}
            disabled={requestPending}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            {requestPending ? '처리 중...' : '결제 요청'}
          </button>
          <button
            onClick={handlePaymentCancel}
            disabled={cancelPending}
            className='bg-red-500 text-white px-4 py-2 rounded'
          >
            {cancelPending ? '처리 중...' : '결제 취소'}
          </button>
        </div>
      </section>

      <section>
        <h2 className='text-xl font-bold mb-4'>📋 결제 내역 테스트</h2>
        <div className='space-y-4'>
          <div>
            <h3 className='font-bold mb-2'>결제 내역 목록</h3>
            <pre className='bg-gray-50 p-4 rounded-lg'>
              {JSON.stringify(historyList, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className='font-bold mb-2'>결제 상세 내역</h3>
            <pre className='bg-gray-50 p-4 rounded-lg'>
              {JSON.stringify(historyDetail, null, 2)}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiHookTest;
