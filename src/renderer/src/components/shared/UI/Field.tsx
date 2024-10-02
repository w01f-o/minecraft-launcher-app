import { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  minify?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const Field: FC<FieldProps> = ({ minify, className, fullWidth, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        'bg-blue_light shadow-sm rounded-2xl px-6 py-3 text-xl focus:outline-none focus:ring-2 transition',
        {
          'text-center w-28': minify,
          'w-full': fullWidth,
          [`${className}`]: className,
        },
      )}
    ></input>
  );
};

export default Field;
