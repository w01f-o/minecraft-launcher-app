import { FC, SVGAttributes } from 'react';

interface ArrowRightProps extends SVGAttributes<HTMLOrSVGElement> {}

export const ArrowRightIcon: FC<ArrowRightProps> = ({ ...props }) => {
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
      <path d="m18 8 4 4-4 4M2 12h20" />
    </svg>
  );
};
