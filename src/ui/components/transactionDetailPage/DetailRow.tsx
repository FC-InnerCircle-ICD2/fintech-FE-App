const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <>
      <div className='flex justify-between items-center px-4'>
        <p className='text-gray-500'>{label}</p>
        <p>{value}</p>
      </div>

      <div role='separator' className='mb-8' />
    </>
  );
};

export default DetailRow;
