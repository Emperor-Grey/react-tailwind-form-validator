import clsx from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'default' | 'outline';
  disabled?: boolean;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const Button = ({
  variant = 'default',
  className,
  disabled,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) => {
  const buttonClass = clsx(
    'rounded-md px-4 py-2 font-semibold cursor-pointer text-md transition-all duration-300 ease-in-out hover:px-3',
    'inline-flex items-center justify-center gap-2',
    {
      'h-12 animate-shimmer border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50':
        variant === 'default',
      'h-12 animate-shimmer border-2 border-gray-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50':
        variant === 'outline',
      'opacity-50 cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      {...props}
      aria-disabled={disabled ? 'true' : 'false'}
    >
      {iconLeft && <span className="mr-1">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-1">{iconRight}</span>}
    </button>
  );
};

export default Button;
