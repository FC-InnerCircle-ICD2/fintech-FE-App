import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '@hooks/useModal';
import { ScannerOverlay } from './ScannerOverlay';
import { Scanner } from './Scanner';
import { ROUTES } from '@constants/routes';

interface QRScanWidgetProps {
  onScanSuccess: (resultUrl: string) => void;
}

export const QRScanWidget = ({ onScanSuccess }: QRScanWidgetProps) => {
  const navigate = useNavigate();

  const { openDialog, closeModal } = useModal();
  const [viewportRatio, setViewportRatio] = useState({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    const container = document.querySelector('.scanner-container');
    const overlaySvg = container?.querySelector('svg');
    if (overlaySvg) {
      overlaySvg.remove();
    }
    updateViewportRatio();
    window.addEventListener('resize', updateViewportRatio);
    return () => window.removeEventListener('resize', updateViewportRatio);
  }, []);

  const updateViewportRatio = () => {
    const MAX_WIDTH = 600;
    const vh = window.innerHeight;
    const vw = Math.min(window.innerWidth, MAX_WIDTH);
    setViewportRatio({
      width: 100,
      height: (vh / vw) * 100,
    });
  };

  const handleError = (error: unknown) => {
    if (error) {
      if (
        error instanceof Error &&
        'name' in error &&
        error.name === 'NotAllowedError'
      ) {
        openDialog('alert', {
          title: '알림',
          description: '카메라 권한이 필요합니다.\n다시 시도해 주세요.',
          confirm: () => {
            closeModal();
            navigate(`${ROUTES.TRANSACTIONS.LIST}`);
          },
        });
      }
    }
  };
  return (
    <div className='relative h-[calc(100dvh-4rem-3.5rem)]'>
      <div className='absolute inset-0 overflow-hidden'>
        <Scanner
          onScan={onScanSuccess}
          onError={handleError}
          classNames={'scanner-container'}
        />
        <ScannerOverlay viewportRatio={viewportRatio} />
      </div>
    </div>
  );
};
