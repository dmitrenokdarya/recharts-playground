import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren & {
    variant?: 'primary' | 'mono' | 'secondary' | 'xsPrimary' | 'xsSecondary';
    size?: 'm' | 's' | 'xs' | 'sm';
    leftContent?: ReactNode;
    rightContent?: ReactNode;
  };

const variants = {
  primary: 'btn-primary text-btn',
  secondary: 'btn-secondary border border-stroke text-btn',
  mono: 'btn-secondary border border-stroke text-mono-btn',
  xsPrimary: 'btn-primary text-mono-btn',
  xsSecondary: 'btn-secondary border border-stroke text-mono-btn',
};

const sizes = {
  m: 'px-7 py-3 max-h-11.5',
  s: 'px-5 py-1.5 max-h-8',
  xs: 'px-3 py-1',
  sm: 'py-2 px-7',
};

const Button = ({
  variant = 'primary',
  size,
  className,
  leftContent,
  rightContent,
  children,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={clsx(
      'inline-flex items-center justify-center gap-1.5 rounded-full transition cursor-pointer disabled:pointer-events-none',
      variants[variant],
      size && sizes[size],
      className,
    )}
  >
    {!!leftContent && leftContent}
    {children}
    {!!rightContent && rightContent}
  </button>
);

export default Button;
