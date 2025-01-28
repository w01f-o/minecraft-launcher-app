import { ArrowLeftIcon, ArrowRightIcon } from '@/renderer/shared/ui';
import { Button } from '@heroui/react';
import { animated, useTransition } from '@react-spring/web';
import { FC } from 'react';
import { useSwiper } from 'swiper/react';

interface GallerySwiperButtonsProps {
  isOpen: boolean;
}

export const GallerySwiperButtons: FC<GallerySwiperButtonsProps> = ({
  isOpen,
}) => {
  const swiper = useSwiper();

  const clickHandler = (type: 'prev' | 'next') => (): void => {
    switch (type) {
      case 'prev':
        swiper.slidePrev();
        return;
      case 'next':
        swiper.slideNext();
        return;
    }
  };

  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  return transitions(
    (props, item) =>
      item && (
        <>
          <animated.div
            style={props}
            className="fixed z-50 top-1/2 -translate-y-1/2 left-[10vw] xl:block hidden"
          >
            <Button
              onPress={clickHandler('prev')}
              isIconOnly
              className="rounded-full"
              size="lg"
            >
              <ArrowLeftIcon />
            </Button>
          </animated.div>
          <animated.div
            style={props}
            className="fixed z-50 top-1/2 -translate-y-1/2 right-[10vw] xl:block hidden"
          >
            <Button
              onPress={clickHandler('next')}
              isIconOnly
              className="rounded-full"
              size="lg"
            >
              <ArrowRightIcon />
            </Button>
          </animated.div>
        </>
      )
  );
};
