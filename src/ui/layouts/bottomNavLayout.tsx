import { Outlet } from 'react-router-dom';
import { cn } from '@lib/shadcn/lib/utils';
import { theme } from '@styles/theme';
import { BottomNavigation } from '@ui/templates/navigation/bottomNav';
import Button from '@ui/components/button/Button';
import { useAuth } from '@hooks/useAuth';

export const BottomNavLayout = () => {
  const { logout } = useAuth();
  return (
    <div className='h-[100dvh]'>
      <header
        className={cn(
          `sticky bg-white justify-between flex items-center top-0 h-14 w-responsive_container mx-auto border-b`,
          theme.safe_area_inline_padding,
        )}
      >
        <img src='/logo.png' width={24} />
        <Button variant={'outline_ghost'} width={'fit'} onClick={logout}>
          logout
        </Button>
      </header>
      <main className={cn('w-responsive_container mx-auto pb-[4rem] bg-white')}>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
