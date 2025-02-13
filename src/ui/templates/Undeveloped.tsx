import PageLayout from '../layouts/PageLayout';

const Undeveloped = () => {
  return (
    <PageLayout hasNav className='flex flex-col items-center justify-center '>
      <img src='/logo.png' className='w-24' alt='Logo' />
      <h2 className='text-3xl mt-8 mb-8 font-black text-[#18A0FB]'>
        To be continued
      </h2>

      <p onClick={() => window.history.back()}>돌아가기</p>
    </PageLayout>
  );
};

export default Undeveloped;
