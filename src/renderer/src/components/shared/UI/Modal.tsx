import { Dispatch, FC, ReactNode, SetStateAction, MouseEvent } from 'react';
import { animated, useTransition } from '@react-spring/web';
import ReactPortal from '../../features/ReactPortal';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contentClassName?: string;
}

const Modal: FC<ModalProps> = ({ isOpen, children, contentClassName, setIsOpen }) => {
  const wrapperMouseDownHandler = (): void => {
    setIsOpen(!isOpen);
  };

  const contentMouseDownHandler = (e: MouseEvent): void => {
    e.stopPropagation();
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
            className="fixed inset-0 z-50 before:absolute before:pointer-events-none before:inset-0 before:bg-black before:opacity-70"
            onMouseDown={wrapperMouseDownHandler}
          >
            <div
              className={clsx(
                'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] z-50  overflow-y-auto custom-scrollbar px-2',
                contentClassName,
              )}
              onMouseDown={contentMouseDownHandler}
            >
              {children}
            </div>
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default Modal;