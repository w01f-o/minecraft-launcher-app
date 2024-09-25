import { FC } from 'react';
import { useTransition, animated } from '@react-spring/web';

interface CircleLoaderProps {
  progress: number | null;
}

const CircleLoader: FC<CircleLoaderProps> = ({ progress }) => {
  const isLoading = progress !== null;

  const transition = useTransition(isLoading, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition(
    (props, item) =>
      item && (
        <animated.div className="relative size-10" style={props}>
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-blue"
              strokeWidth="3"
            ></circle>
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-blue_light transition-all duration-700"
              strokeWidth={progress !== 100 ? '3' : '0'}
              strokeDasharray="100"
              strokeDashoffset={progress!}
              strokeLinecap="round"
            ></circle>
          </svg>
        </animated.div>
      ),
  );
};

export default CircleLoader;
