import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Bars } from 'react-loader-spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  role: 'primary' | 'secondary';
  children?: ReactNode;
  isPending?: boolean;
  rounded?: boolean;
  danger?: boolean;
  minify?: boolean;
}

const Button: FC<ButtonProps> = ({
  role,
  children,
  className,
  isPending,
  rounded,
  danger,
  minify,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        'flex items-center justify-center rounded-2xl font-medium disabled:opacity-50 text-xl px-12 py-2.5 relative before:absolute before:rounded-2xl before:inset-0 before:transition before:opacity-20 transition duration-100 enabled:active:scale-95 select-none',
        {
          'bg-white text-blue enabled:hover:before:bg-blue_dark enabled:active:before:bg-blue_dark before:opacity-10':
            role === 'secondary',
          'bg-blue text-white enabled:hover:before:bg-blue_light enabled:active:before:bg-blue_light':
            role === 'primary',
          'rounded-full before:rounded-full !p-2.5': rounded,
          'bg-red-400 text-white': danger,
          'size-10': minify,
          [`${className}`]: className,
        },
      )}
      disabled={isPending || props.disabled}
    >
      {isPending ? <Bars height={28} color={'#F4F8FE'} /> : children}
    </button>
  );
};

export default Button;
