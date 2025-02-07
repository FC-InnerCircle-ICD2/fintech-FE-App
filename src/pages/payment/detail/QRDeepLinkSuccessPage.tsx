import { ROUTES } from '@constants/routes';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const QRDeepLinkSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const expiredAt = searchParams.get('expiredAt');

    if (token && expiredAt) {
      navigate(ROUTES.PAYMENT.DETAIL, {
        state: { token, expiredAt },
        replace: true,
      });
    } else {
      navigate(ROUTES.PAYMENT.QR, { replace: true });
    }
  }, [searchParams, navigate]);
  return <></>;
};

export default QRDeepLinkSuccessPage;
