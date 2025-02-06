import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import PageLayout from '@ui/layouts/PageLayout';
import { QRScanWidget } from '@ui/templates/qrCode/QRScanWidget';
import { parseQueryString } from '@lib/parseQueryString';
import { DUMMY_API_CONFIG } from '@mocks/config/dummy';

const QRPage = () => {
  const navigate = useNavigate();

  const handleScanSuccess = (resultUrl: string) => {
    const result = parseQueryString(resultUrl);
    console.log('result', result);
    // 임시 데이터
    const result_dummy = {
      token: DUMMY_API_CONFIG.ORDER_TOKEN,
      expiredAt: 1810025200000,
    };
    const state = {
      token: result_dummy.token,
      expiredAt: result_dummy.expiredAt,
    };

    if (state) {
      /**
       * @todo
       * state로 전달하는건 조작이 가능하지만 일단은 이렇게 구현.
       * 후에 백엔드와 논의 후 api를 요청해야 함
       */

      navigate(`${ROUTES.PAYMENT.DETAIL}`, { state });
    } else {
      alert('QR에 유효한 값이 없습니다.');
    }
  };

  return (
    <PageLayout
      hasNav
      className='relative h-full px-0 '
      style={{
        backgroundImage: `radial-gradient(
          circle at top right,
          rgba(60, 20, 136, 0.6) 0%,
          rgba(75, 71, 180, 0.6) 20%,
          rgba(95, 122, 199, 0.6) 40%,
          rgba(64, 134, 147, 0.6) 60%,
          rgba(30, 127, 132, 0.6) 80%,
          rgba(30, 127, 132, 0.6) 100%
        )`,
      }}
    >
      <QRScanWidget onScanSuccess={handleScanSuccess} />
    </PageLayout>
  );
};

export default QRPage;
