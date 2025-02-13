import React, { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Icon, { type IconName } from '@ui/components/icon/Icon';
import { cn } from '@lib/shadcn/lib/utils';

const buttonVariants = cva(
  'inline-flex w-fit gap-[6px] items-center justify-center rounded-[6px] disabled:cursor-not-allowed font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-gradient-10 disabled:bg-gradient-50 disabled:hover:bg-gradient-50',
        secondary:
          'bg-secondary text-white hover:bg-gradient-10 disabled:bg-gradient-50 disabled:hover:bg-gradient-50',
        destructive:
          'bg-destructive text-white hover:bg-gradient-10 disabled:bg-gradient-50 disabled:hover:bg-gradient-50',
        outline_default:
          'border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:bg-white disabled:border-slate-200 disabled:text-slate-400',
        outline_primary:
          'border border-blue-300 bg-white text-primary hover:bg-blue-50 disabled:bg-white disabled:border-blue-200 disabled:text-blue-400',
        outline_ghost:
          'border border-white bg-white text-slate-800 hover:bg-slate-100 hover:border-slate-100 disabled:bg-white disabled:border-white disabled:border-white disabled:text-slate-400',
      },
      size: {
        default: 'h-[2.25rem] px-4 text-[0.875rem]',
        small: 'h-[1.5rem] px-2 text-[0.75rem]',
        medium: 'h-[2rem] px-3 text-[0.875rem]',
        large: 'h-[2.5rem] px-4 text-[1rem]',
        extraLarge: 'h-[2.75rem] px-5 text-[1.125rem]',
      },
      status: {
        default: null,
        loading: 'cursor-default',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      status: 'default',
      width: 'full',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'stroke-white',
      secondary: 'stroke-white',
      destructive: 'stroke-white',
      outline_default: 'stroke-slate-400',
      outline_primary: 'stroke-blue-400',
      outline_ghost: 'stroke-slate-400',
    },
    defaultVariants: {
      variant: 'default',
    },
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'status'> {
  children: React.ReactNode;
  leftIcon?: IconName;
  rightIcon?: IconName;
  isPending?: boolean;
  rounded?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      disabled,
      width,
      isPending = false,
      leftIcon,
      rightIcon,
      rounded,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref} // ref 전달
        className={`${buttonVariants({
          variant,
          size,
          width,
          status: isPending ? 'loading' : 'default',
        })} ${rounded && 'rounded-full'} ${className}`}
        disabled={isPending || disabled}
        {...props}
      >
        {isPending ? (
          <Icon
            className={cn(
              iconVariants({ variant }),
              `animate-spin [animation-duration:1600ms]`,
            )}
            name='Loader'
            size='16px'
          />
        ) : leftIcon ? (
          <Icon
            className={iconVariants({ variant })}
            name={leftIcon}
            size='16px'
          />
        ) : null}
        {children}
        {rightIcon && (
          <Icon
            className={iconVariants({ variant })}
            name={rightIcon}
            size='16px'
          />
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
