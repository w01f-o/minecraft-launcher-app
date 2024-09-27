import { FC, SVGAttributes } from 'react';

interface NoThumbnailModIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const NoThumbnailModIcon: FC<NoThumbnailModIconProps> = ({ ...props }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden size-[60px] relative z-20">
      <svg
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="1.5"
        clipRule="evenodd"
        viewBox="0 0 104 104"
        aria-hidden="true"
        {...props}
      >
        <path data-v-78e239b4="" fill="none" d="M0 0h103.4v103.4H0z"></path>
        <path
          data-v-78e239b4=""
          fill="none"
          stroke="#9a9a9a"
          strokeWidth="5"
          d="M51.7 92.5V51.7L16.4 31.3l35.3 20.4L87 31.3 51.7 11 16.4 31.3v40.8l35.3 20.4L87 72V31.3L51.7 11"
        ></path>
      </svg>
    </div>
  );
};

export default NoThumbnailModIcon;
