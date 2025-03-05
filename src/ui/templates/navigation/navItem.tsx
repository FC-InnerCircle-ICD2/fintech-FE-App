import { Link } from 'react-router-dom';
import { cn } from '@lib/shadcn/lib/utils';
import type { NavItemProps } from '@type/navigation';
import Icon from '@ui/components/icon/Icon';

export const NavigationItem = ({ item, isActive }: NavItemProps) => {
  return (
    <Link
      to={item.path}
      className={cn(
        'flex flex-col items-center justify-center gap-1 w-16 p-1 relative',
        'transition-colors duration-200',
        'active:opacity-70',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary',
        item.id === 'qr-payment'
          ? 'text-white bg-[#1293FB] h-na rounded-full w-[60px] h-[60px] absolute bottom-0 translate-y-[calc(-50%+8px)]'
          : '',
      )}
    >
      {item.id === 'qr-payment' ? (
        <>
          <Icon name={item.icon} size={26} />
          {/* <span className='text-xs font-medium'>{item.label}</span> */}
        </>
      ) : (
        <>
          <Icon name={item.icon} />
          <span className='text-xs font-medium'>{item.label}</span>
        </>
      )}
    </Link>
  );
};
