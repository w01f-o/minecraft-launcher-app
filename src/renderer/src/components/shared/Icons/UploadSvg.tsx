import { FC, SVGAttributes } from 'react';

interface UploadSvgProps extends SVGAttributes<HTMLOrSVGElement> {
  isHover: boolean;
}

const UploadSvg: FC<UploadSvgProps> = ({ isHover, ...props }) => {
  return (
    <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#a)" fill={isHover ? '#85A2E8' : '#F4F8FE'} className="transition-all">
        <path d="M73.573 44.373a6.415 6.415 0 0 0-6.416 6.415V67.17H12.843V50.788a6.415 6.415 0 0 0-12.83 0v22.797A6.415 6.415 0 0 0 6.427 80h67.145a6.415 6.415 0 0 0 6.415-6.415V50.788a6.415 6.415 0 0 0-6.415-6.415Z" />
        <path d="m26.424 29.064 7.16-7.161v23.901a6.415 6.415 0 0 0 12.831 0V21.902l7.161 7.162a6.394 6.394 0 0 0 4.536 1.878 6.415 6.415 0 0 0 4.536-10.951L44.536 1.88a6.415 6.415 0 0 0-9.072 0L17.352 19.991a6.415 6.415 0 1 0 9.072 9.073Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#F4F8FE" d="M0 0h80v80H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UploadSvg;
