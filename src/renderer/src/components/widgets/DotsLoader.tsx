import { FC } from 'react';
import { MutatingDots, MutatingDotsProps } from 'react-loader-spinner';
import { animated, useSpring } from '@react-spring/web';

interface DotsLoaderProps extends MutatingDotsProps {}

const DotsLoader: FC<DotsLoaderProps> = ({ ...props }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.div style={styles}>
      <MutatingDots {...props} />
    </animated.div>
  );
};

export default animated(DotsLoader);
