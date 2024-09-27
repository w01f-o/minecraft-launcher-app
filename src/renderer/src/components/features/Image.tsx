import { FC, ImgHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { useTransition, animated } from '@react-spring/web';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  wrapperClassName?: string;
  imageClassName?: string;
  onLoad?: () => void;
}

const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  wrapperClassName,
  imageClassName,
  onLoad,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadHandler = (): void => {
    setIsLoading(false);
    onLoad?.();
  };

  const loadingTransition = useTransition(isLoading, {
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <div
      className={clsx('flex relative overflow-hidden', wrapperClassName)}
      style={{ width, height }}
    >
      <img
        src={src}
        alt={alt}
        {...props}
        className={clsx('size-full object-cover', imageClassName, {
          ['invisible']: isLoading,
        })}
        onLoad={loadHandler}
        loading={'lazy'}
      />
      {loadingTransition(
        (styles, item) =>
          item && (
            <animated.div style={styles} className="absolute inset-0">
              <Skeleton
                className="block size-full"
                containerClassName="flex size-full"
                baseColor="#CFDAF5"
                highlightColor="#F4F8FE"
              />
            </animated.div>
          ),
      )}
    </div>
  );
};

export default Image;
