import type { FC } from 'react';
import { Scanner as QRScanner } from '@yudiel/react-qr-scanner';

interface ScannerProps {
  onScan: (resultUrl: string) => void;
  onError: (error: unknown) => void;
  classNames: string;
}

export const Scanner: FC<ScannerProps> = ({ onScan, onError, classNames }) => {
  return (
    <QRScanner
      onScan={(detectedCodes) => {
        const result = detectedCodes?.[0]?.rawValue;

        if (result && result.length > 0) {
          onScan(result);
        }
      }}
      onError={(error) => {
        onError(error);
      }}
      allowMultiple={true}
      classNames={{
        container: classNames,
      }}
      styles={{
        container: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        video: {
          position: 'absolute',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
        },
      }}
    />
  );
};
