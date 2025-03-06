import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@ui/components/button/Button';
import { paymentService } from '@api/services/payment';
import { API_ENDPOINTS, QUERY_KEY } from '@constants/apiEndpoints';
import { ROUTES } from '@constants/routes';
import { useSSE } from '@hooks/useSSE';
import { useMutation } from '@tanstack/react-query';
import LoadingAnimation from '@ui/components/loading/LoadingAnimation';
import type { OrderInfoJwtRes } from '@type/responses/payment';
import type { PaymentRequestReq } from '@type/requests/payment';
import { useCancelPayment } from '@hooks/queries/usePayments';
import { useCardList } from '@hooks/queries/useCard';
import useModal from '@hooks/useModal';
import type { ApiResponseError } from '@lib/apiClient';
import { paymentApiErrors } from '@constants/error';

interface QRDetailCardProps {
  orderData: OrderInfoJwtRes;
  token: string;
  expiredAt: number;
}
const QRDetailContent = ({
  orderData,
  token,
  expiredAt,
}: QRDetailCardProps) => {
  const navigate = useNavigate();
  const { openDialog, closeModal } = useModal();

  const state = {
    token: token,
    expiredAt: expiredAt,
    returnPath: ROUTES.PAYMENT.DETAIL,
  };

  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [messages, setMessages] = useState<string>('');
  const tokenReq: PaymentRequestReq = { token: token };

  const { data: cardList } = useCardList();
  const { mutate: cancelPayment } = useCancelPayment();
  const { connected, connect, disconnect } = useSSE<{
    message: string;
  }>({
    url: `${API_ENDPOINTS.PAYMENT.ORDER.SSE}?merchantId=${orderData.merchantId}&orderId=${orderData.orderId}`,
    onMessage: (data) => {
      console.log('sse data : ', data);
      setMessages(data.message);
    },
  });

  const { mutate: requestPayment } = useMutation({
    mutationKey: [QUERY_KEY.PAYMENT.REQUEST],
    mutationFn: async () => await paymentService.requestPayment(tokenReq),
    onSuccess: (res) => {
      console.log('res : ', res);
      if (res.ok) {
        connect();
        console.log('connected : ', res.data);
      }
    },
    onError: (error: ApiResponseError) => {
      console.log('requestPayment error : ', error);

      let title = '결제 요청 실패.';
      let description = '결제 요청에 실패했습니다.\n다시 시도해주세요.';
      let errorNumber = 0;

      try {
        for (const paymentApiError of paymentApiErrors) {
          if (error.error.code === paymentApiError.code) {
            title = paymentApiError.title;
            description = error.error.message;
            errorNumber = paymentApiError.errorNumber;
            break;
          }
        }
      } catch (e) {
        console.error('An error occurred:', e);
      }

      openDialog('alert', {
        title: title,
        description: description,
        confirm: () => {
          closeModal();
          switch (errorNumber) {
            case 0:
              navigate(ROUTES.PAYMENT.QR);
              break;
            case 1:
              navigate(ROUTES.CARD.ADD, { state });
              break;
            case 2:
              navigate(ROUTES.PAYMENT.QR);
              break;
          }
        },
      });
      setPaymentLoading(false);
    },
  });

  useEffect(() => {
    if (messages) {
      setPaymentLoading(false);
    }
  }, [messages]);

  const handlePayment = () => {
    if (cardList?.length === 0) {
      openDialog('alert', {
        title: '카드 등록',
        description: '결제를 위해 카드를 등록해주세요.',
        confirm: () => {
          closeModal();
          navigate(ROUTES.CARD.ADD, { state });
        },
      });
      return;
    }
    setPaymentLoading(true);

    requestPayment();
  };

  const handleCancel = () => {
    if (connected) {
      disconnect();
    }
    cancelPayment(token, {
      onSuccess: () => {
        closeModal();
        navigate(ROUTES.PAYMENT.QR);
      },
      onError: (error) => {
        console.log(error);
        closeModal();
        navigate(ROUTES.PAYMENT.QR);
      },
    });
  };

  const handleBack = () => {
    if (connected) {
      disconnect();
    }
    navigate(ROUTES.PAYMENT.QR);
  };

  return (
    <>
      {messages && (
        <div className='flex flex-col items-center p-6'>
          <div className='text-lg font-semibold text-gray-800'>
            결제가 완료되었습니다.
          </div>
          <Button
            onClick={handleBack}
            className='mt-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200'
          >
            돌아가기
          </Button>
        </div>
      )}
      {isPaymentLoading && (
        <>
          <LoadingAnimation />
          <p className=' text-lg font-semibold'>결제가 진행중입니다.</p>
        </>
      )}
      {!isPaymentLoading && !messages && (
        <>
          <img src='/logo.png' className='w-14 mb-8' alt='Logo' />
          <p className=' text-2xl font-medium'>결제를 하시겠습니까?</p>

          <div role='separator' className='mb-8' />

          <div className='flex justify-between items-center w-full'>
            <p className='text-gray-500'>상점</p>
            <p className='overflow-hidden text-ellipsis whitespace-nowrap max-w-[70%]'>
              {orderData?.merchantName}
            </p>
          </div>

          <div role='separator' className='mb-4' />

          <div className='flex justify-between items-center w-full'>
            <p className='text-gray-500'>상품</p>
            <p
              className='overflow-hidden text-ellipsis whitespace-normal max-w-[70%] line-clamp-2'
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal',
                maxWidth: '70%',
              }}
            >
              {orderData?.orderName}
            </p>
          </div>

          <div role='separator' className='mb-4' />

          <div className='flex justify-between items-center w-full'>
            <p className='text-gray-500'>가격</p>
            <p className='max-w-[70%] font-bold'>
              {Number(orderData?.amount).toLocaleString('ko')} KRW
            </p>
          </div>

          <div role='separator' className='mb-8' />
          <Button
            variant={'default'}
            size={'extraLarge'}
            rounded
            className='w-[calc(100%-34px)] font-bold'
            onClick={handlePayment}
          >
            결제하기
          </Button>

          <Button
            variant={'outline_primary'}
            size={'extraLarge'}
            rounded
            className='w-[calc(100%-34px)] text-[#18A0FB] font-bold rounded-full mt-4'
            onClick={handleCancel}
          >
            취소하기
          </Button>
        </>
      )}
    </>
  );
};

export default QRDetailContent;
