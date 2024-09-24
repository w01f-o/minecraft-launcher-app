import { FC, SVGAttributes } from 'react';

interface MaximizeIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const MaximizeIcon: FC<MaximizeIconProps> = ({ ...props }) => {
  return (
    <svg width="18" height="17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        x="1"
        y="5.103"
        width="10.897"
        height="10.897"
        rx="1"
        stroke="#F4F8FE"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.69 2h8.896v8.897h-2.69v2h2.69a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H6.69a2 2 0 0 0-2 2v2.103h2V2Z"
        fill="#F4F8FE"
      />
    </svg>
  );
};

export default MaximizeIcon;
