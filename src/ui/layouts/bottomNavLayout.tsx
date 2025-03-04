import { Link, Outlet } from 'react-router-dom';
import { cn } from '@lib/shadcn/lib/utils';
import { theme } from '@styles/theme';
import { BottomNavigation } from '@ui/templates/navigation/bottomNav';
import { useAuth } from '@hooks/useAuth';
import Icon from '@ui/components/icon/Icon';
import { ROUTES } from '@constants/routes';

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
        <Link to={ROUTES.PAYMENT.QR}>
          <img src='/logo.png' width={20} />
        </Link>
        <button type='button' onClick={logout}>
          <Icon name='LogOut' size={20} />
        </button>
      </header>
      <main className={cn('w-responsive_container mx-auto pb-[4rem] bg-white')}>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
