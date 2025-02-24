import { cn } from '@lib/shadcn/lib/utils';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  return (
    <div className='grid grid h-full grid-rows-auto  h-full'>
      <main className={cn('w-responsive_container mx-auto bg-white')}>
        <Outlet />
      </main>
    </div>
  );
};
