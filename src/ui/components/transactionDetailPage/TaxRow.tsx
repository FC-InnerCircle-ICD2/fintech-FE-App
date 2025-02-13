import { convertCurrencyFormat } from '@lib/formatter';

const TaxRow = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className='flex justify-between items-center px-4'>
      <p className='text-gray-500 text-2xl'>{label}</p>
      <p className='text-2xl font-bold'>{convertCurrencyFormat(value)} KRW</p>
    </div>
  );
};

export default TaxRow;
