import PageLayout from '@ui/layouts/PageLayout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1900);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageLayout className='p-0 '>
      <div
        className='flex flex-col h-[100dvh] justify-center items-center'
        style={{ background: 'linear-gradient(135deg, #89CFF0, #007BFF)' }}
      >
        <img src='/animate.gif' alt='Logo' className='w-48' width={200} />
        <h2 className='text-5xl mt-8 font-black text-[#e1e1e1]'>PAY 200</h2>
      </div>
    </PageLayout>
  );
};

export default SplashPage;
