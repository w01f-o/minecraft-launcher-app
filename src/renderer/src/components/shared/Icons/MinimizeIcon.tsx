import { FC, SVGAttributes } from 'react';

interface MinimizeIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const MinimizeIcon: FC<MinimizeIconProps> = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="6" y="11" width="12" height="2" fill="#F4F8FE" />
    </svg>
  );
};

export default MinimizeIcon;
