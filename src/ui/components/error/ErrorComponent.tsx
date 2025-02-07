import { useEffect } from 'react';

const ErrorComponent = ({ message = '다시 시도해주세요' }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <p className='text-red-600 text-lg mb-4'>{message}</p>
      <button
        onClick={() => window.location.reload()}
        className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
      >
        새로고침
      </button>
    </div>
  );
};

export default ErrorComponent;
