import { FC, SVGAttributes } from 'react';

interface CloseIconProps extends SVGAttributes<HTMLOrSVGElement> {
  color?: string;
}

const CloseIcon: FC<CloseIconProps> = ({ color, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
        stroke={color ?? '#F4F8FE'}
        strokeWidth="2"
      />
      <line
        x1="6"
        y1="18"
        x2="18"
        y2="6"
        stroke={color ?? '#F4F8FE'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default CloseIcon;
