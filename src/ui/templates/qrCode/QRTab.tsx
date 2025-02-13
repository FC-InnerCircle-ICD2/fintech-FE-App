import { motion } from 'framer-motion';
import { QRTabKey } from '@type/qr';

interface QRTabProps {
  activeTab: QRTabKey;
  onTabChange: (tab: QRTabKey) => void;
}

export const QRTab = ({ activeTab, onTabChange }: QRTabProps) => {
  return (
    <div className='absolute w-full flex justify-center mt-10'>
      <div className='absolute z-20 flex bg-white rounded-full w-64 h-10 items-center'>
        <motion.div
          layout
          className='absolute w-1/2 h-full bg-black rounded-full'
          animate={{
            x: activeTab === QRTabKey.QR ? 0 : '100%',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />

        <button
          onClick={() => onTabChange(QRTabKey.QR)}
          className={`w-1/2 h-full z-20 flex items-center justify-center ${
            activeTab === QRTabKey.QR ? 'text-white' : 'text-black'
          }`}
        >
          QR 생성
        </button>

        <button
          onClick={() => onTabChange(QRTabKey.SCAN)}
          className={`w-1/2 h-full z-10 flex items-center justify-center ${
            activeTab === QRTabKey.SCAN ? 'text-white' : 'text-black'
          }`}
        >
          QR 스캔
        </button>
      </div>
    </div>
  );
};
