import { FC } from 'react';
import ReactPortal from '../features/ReactPortal';
import Button from '../shared/UI/Button';
import ArrowLeftIcon from '../shared/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../shared/Icons/ArrowRightIcon';
import { useSwiper } from 'swiper/react';
import { useTransition, animated } from '@react-spring/web';

interface GallerySwiperButtonsProps {
  isOpen: boolean;
}

const GallerySwiperButtons: FC<GallerySwiperButtonsProps> = ({ isOpen }) => {
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
        <ReactPortal>
          <animated.div
            style={props}
            className="fixed z-50 top-1/2 -translate-y-1/2 left-[5vw]"
          >
            <Button role={'secondary'} rounded onClick={clickHandler('prev')}>
              <ArrowLeftIcon />
            </Button>
          </animated.div>
          <animated.div
            style={props}
            className="fixed z-50 top-1/2 -translate-y-1/2 right-[5vw]"
          >
            <Button role={'secondary'} rounded onClick={clickHandler('next')}>
              <ArrowRightIcon />
            </Button>
          </animated.div>
        </ReactPortal>
      )
  );
};

export default GallerySwiperButtons;
