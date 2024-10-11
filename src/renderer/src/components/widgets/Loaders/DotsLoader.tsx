import { FC } from 'react';
import { MutatingDots, MutatingDotsProps } from 'react-loader-spinner';
import { animated, useSpring } from '@react-spring/web';

interface DotsLoaderProps extends MutatingDotsProps {
  color: string;
  secondaryColor: string;
}

const DotsLoader: FC<DotsLoaderProps> = ({ color, secondaryColor, ...props }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.div style={styles}>
      <MutatingDots
        wrapperClass="justify-center"
        width={100}
        height={100}
        color={color}
        secondaryColor={secondaryColor}
        {...props}
      />
    </animated.div>
  );
};

export default animated(DotsLoader);
