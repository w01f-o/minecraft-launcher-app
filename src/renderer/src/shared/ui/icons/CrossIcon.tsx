import { FC, SVGAttributes } from 'react';

interface CrossIconProps extends SVGAttributes<HTMLOrSVGElement> {}

export const CrossIcon: FC<CrossIconProps> = ({ ...props }) => {
  return (
    <svg
      width="26"
      height="26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m24.133.307 1.86 1.83-22.882 23.26-1.86-1.83L24.133.307Z"
        fill="#FEFEFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.963 1.846 2.824.016l22.883 23.26-1.861 1.83L.963 1.846Z"
        fill="#FEFEFF"
      />
    </svg>
  );
};
