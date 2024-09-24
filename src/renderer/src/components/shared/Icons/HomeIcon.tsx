import { FC, SVGAttributes } from 'react';

interface HomeIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const HomeIcon: FC<HomeIconProps> = ({ ...props }) => {
  return (
    <svg width="20" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13 20v-8a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v8"
        stroke="#F4F8FE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 9a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 19 9v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9Z"
        stroke="#F4F8FE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
