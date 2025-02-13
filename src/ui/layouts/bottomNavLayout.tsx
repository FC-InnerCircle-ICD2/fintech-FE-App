import { Outlet } from 'react-router-dom';
import { cn } from '@lib/shadcn/lib/utils';
import { theme } from '@styles/theme';
import { BottomNavigation } from '@ui/templates/navigation/bottomNav';

export const BottomNavLayout = () => {
  return (
    <div className='h-[100dvh]'>
      <header
        className={cn(
          `sticky bg-white  flex items-center top-0 h-14 w-responsive_container mx-auto border-b`,
          theme.safe_area_inline_padding,
        )}
      >
        <img src='/logo.png' width={24} />
      </header>
      <main className={cn('w-responsive_container mx-auto pb-[4rem] bg-white')}>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
