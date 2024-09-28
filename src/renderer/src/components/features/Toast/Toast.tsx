import { FC, useEffect, useMemo, useState } from 'react';
import { useToast } from '@renderer/hooks/useToast';
import { animated, SpringValue, useTransition } from '@react-spring/web';
import ReactPortal from '@renderer/components/features/ReactPortal';
import { ToastItem } from '@renderer/types/ToastItem.type';
import clsx from 'clsx';
import CloseIcon from '@renderer/components/shared/Icons/CloseIcon';
import ToastIcon from '@renderer/components/shared/Icons/ToastIcon';
import { SpringConfig } from '@react-spring/core';

const Toast: FC = () => {
  const { items, remove } = useToast();
  const [localItems, setLocalItems] = useState<ToastItem[]>(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);

  const transitions = useTransition(localItems, {
    from: { opacity: 0, height: 0, life: '100%' },
    keys: (item) => item.id,
    enter:
      (item) =>
      async (next, cancel): Promise<void> => {
        cancelMap.set(item, cancel);
        await next({ opacity: 1, height: refMap.get(item).offsetHeight + 8 });
        await next({ life: '0%' });
      },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (_result, _ctrl, item) => {
      setLocalItems((state) =>
        state.filter((i) => {
          return i.id !== item.id;
        }),
      );
      remove(item.id);
    },
    config:
      (_item, _index, phase) =>
      (key): SpringConfig =>
        phase === 'enter' && key === 'life'
          ? { duration: 3000 }
          : { tension: 125, friction: 20, precision: 0.1 },
  });

  const closeButtonClickHandler = (item: ToastItem, life: SpringValue<string>) => (): void => {
    if (cancelMap.has(item) && life.get() !== '0%') cancelMap.get(item)();
  };

  return (
    <ReactPortal>
      <div className="flex flex-col fixed bottom-0 right-2 z-40">
        {transitions(({ life, ...style }, item) => (
          <animated.div style={style}>
            <div
              ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
              className={clsx(
                'relative shadow-md py-4 px-6 rounded-2xl w-[400px] overflow-hidden mb-2',
                {
                  'bg-red-400': item.type === 'error',
                  'bg-green-400': item.type === 'success',
                  'bg-yellow-400': item.type === 'warning',
                  'bg-blue': item.type === 'info',
                },
              )}
            >
              <div className="flex h-full items-center gap-4">
                <ToastIcon type={item.type} />
                <div className="text-xl w-[80%]">{item.message}</div>
              </div>
              <animated.div
                style={{ right: life }}
                className={clsx('left-0 h-1 absolute bottom-0', {
                  'bg-red-600': item.type === 'error',
                  'bg-green-600': item.type === 'success',
                  'bg-yellow-600': item.type === 'warning',
                  'bg-blue_dark': item.type === 'info',
                })}
              />
              <button
                onClick={closeButtonClickHandler(item, life)}
                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
              >
                <CloseIcon color={'#000'} />
              </button>
            </div>
          </animated.div>
        ))}
      </div>
    </ReactPortal>
  );
};

export default Toast;
