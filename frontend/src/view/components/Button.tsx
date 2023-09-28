import { cn } from '@/app/utils/cn';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({
  isLoading,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'h-12 w-full rounded-2xl bg-teal-900 px-6 font-medium text-white transition-all hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        className,
      )}
      {...props}
    ></button>
  );
}

