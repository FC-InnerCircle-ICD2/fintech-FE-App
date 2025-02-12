import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@ui/layouts/PageLayout';
import QRDetailContent from '@ui/templates/qrCode/detail/QRDetailContent';
import { LoadingSpinner } from '@ui/components/loading/LoadingSpinner';
import Button from '@ui/components/button/Button';
import { useLocationState } from '@hooks/useLocationState';

// import { useOrderInfo } from '@hooks/queries/usePayments';
import { parseQueryString } from '@lib/parseQueryString';
import { useParseJwt } from '@hooks/useParseJwt';
import { ROUTES } from '@constants/routes';
import useModal from '@hooks/useModal';

const QRPaymentDetailPage = () => {
  const navigate = useNavigate();
  const { openDialog, closeModal } = useModal();
  const { state } = useLocationState<{
    token: string;
    expiredAt: number;
  }>();

  const tokenFromUrl = parseQueryString(location.search).token;
  const expiredAtFromUrl = parseQueryString(location.search).expiredAt;
  const token = tokenFromUrl || state?.token;
  const expiredAt = expiredAtFromUrl || state?.expiredAt;

  const isOpenDialogRef = useRef(false);
  useEffect(() => {
    console.log('expiredAt', expiredAt);
    if (!expiredAt) return;

    const isExpired = Date.now() > new Date(expiredAt).getTime();
    if (isExpired && !isOpenDialogRef.current) {
      isOpenDialogRef.current = true;
      openDialog('alert', {
        title: '오류',
        description: '만료된 QR 코드입니다.\n다시 시도해 주세요.',
        confirm: () => {
          closeModal();
          isOpenDialogRef.current = false;
          navigate(`${ROUTES.PAYMENT.QR}`);
        },
      });
    }
  }, [expiredAt, openDialog, closeModal, navigate]);

  // 주문 정보 jwt 파싱
  const {
    payload: orderData,
    isLoading: orderLoading,
    isError: orderError,
  } = useParseJwt(token);

  // const {
  //   data: orderData,
  //   isLoading: orderLoading,
  //   isError: orderError,
  //   refetch: orderRefetch,
  // } = useOrderInfo(token);

  return (
    <PageLayout className='bg-gradient-to-br from-[#3c1488] via-[#408693] to-[#1e7f84] w-full  flex justify-center items-center'>
      <div className='bg-white w-[320px] h-[600px] rounded-[1rem] flex flex-col justify-center items-center p-8'>
        <>
          {orderData && <QRDetailContent orderData={orderData} />}
          {orderLoading && <LoadingSpinner />}
          {orderError && (
            <>
              <div>에러가 발생했습니다</div>
              <div>주문 정보를 불러오는데 실패했습니다. </div>
              <div>다시 시도해 주세요.</div>
              <Button
                className='w-[calc(100%-32px)] h-12 text-[#18A0FB] font-bold rounded-full mt-4'
                isPending={orderLoading}
                onClick={() => navigate(`${ROUTES.PAYMENT.QR}`)}
              >
                QR 다시 시도하기
              </Button>
              {/* <Button
                className='w-[calc(100%-32px)] h-12 text-[#18A0FB] font-bold rounded-full mt-4'
                isPending={orderLoading}
                onClick={() => orderRefetch()}
              >
                재시도 하기
              </Button> */}
            </>
          )}
        </>
      </div>
    </PageLayout>
  );
};

export default QRPaymentDetailPage;
