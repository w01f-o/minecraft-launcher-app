import { Image } from '@heroui/react';
import clsx from 'clsx';
import { FC, useState } from 'react';

type ClientScreenshotProps =
  | {
      isPreview?: true;
      screenshot: string;
      index: number;
      clickHandler: (index: number) => () => void;
    }
  | {
      isPreview?: false | undefined;
      screenshot: string;
    };

export const ClientScreenshot: FC<ClientScreenshotProps> = props => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const clickHandler = (): void => {
    if (props.isPreview && isLoaded) {
      props.clickHandler(props.index)();
    }
  };

  const loadHandler = (): void => {
    setIsLoaded(true);
  };

  if (props.isPreview) {
    return (
      <div className="xl:w-1/5 w-1/3 p-3 h-56">
        <button
          className={clsx(
            'peer select-none flex before:z-40 overflow-hidden h-full cursor-progress w-full relative before:pointer-events-none rounded-xl active:scale-[.99] transition-all before:absolute before:inset-0 before:opacity-25 before:rounded-xl before:transition',
            {
              'hover:scale-105 hover:before:bg-black !cursor-pointer': isLoaded,
            }
          )}
          onClick={clickHandler}
        >
          <Image
            src={`client-screenshots://${props.screenshot}`}
            alt={''}
            width={'100%'}
            height={'100%'}
            classNames={{ wrapper: 'w-full h-full object-cover' }}
            onLoad={loadHandler}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="aspect-video relative overflow-hidden rounded-3xl flex justify-start items-center">
      <img
        src={`client-screenshots://${props.screenshot}`}
        alt=""
        className="size-full object-cover"
      />
    </div>
  );
};
