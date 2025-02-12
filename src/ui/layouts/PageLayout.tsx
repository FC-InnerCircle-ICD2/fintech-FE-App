import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@lib/shadcn/lib/utils';
import { theme } from '@styles/theme';

interface MainLayoutProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'class'> {
  className?: string;
  hasNav?: boolean;
}
const PageLayout = ({ className, hasNav, ...rest }: MainLayoutProps) => {
  return (
    <div
      className={cn(
        hasNav ? 'min-h-[calc(100dvh-4rem-3.5rem)] grid' : 'min-h-[100dvh]',
        theme.safe_area_inline_padding,
        className,
      )}
      {...rest}
    />
  );
};

export default PageLayout;
