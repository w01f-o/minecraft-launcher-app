import { FC, SVGAttributes } from 'react';

interface ArrowLeftProps extends SVGAttributes<HTMLOrSVGElement> {}

export const ArrowLeftIcon: FC<ArrowLeftProps> = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 8-4 4 4 4M2 12h20" />
    </svg>
  );
};
