import { ROUTES } from '@constants/routes';
import useModal from '@hooks/useModal';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const QRDeepLinkSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openDialog, closeModal } = useModal();

  useEffect(() => {
    const token = searchParams.get('token');
    const expiredAt = searchParams.get('expiredAt');

    if (!token || !expiredAt) {
      navigate(ROUTES.PAYMENT.QR, { replace: true });
      return;
    }

    const isExpired = Date.now() > new Date(expiredAt).getTime();

    if (isExpired) {
      console.warn('⚠️ QR 코드 만료됨');
      openDialog('alert', {
        title: '오류',
        description: '만료된 QR 코드입니다.\n다시 시도해 주세요.',
        confirm: () => {
          closeModal();
          navigate(ROUTES.PAYMENT.QR, { replace: true }); // 만료되었을 경우 QR 페이지로 리디렉션
        },
      });
      return;
    }

    navigate(ROUTES.PAYMENT.DETAIL, {
      state: { token, expiredAt },
      replace: true,
    });
  }, [searchParams, navigate]);

  return null;
};

export default QRDeepLinkSuccessPage;
