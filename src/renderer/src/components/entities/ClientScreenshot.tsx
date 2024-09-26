import { FC, useState } from 'react';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';

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

const ClientScreenshot: FC<ClientScreenshotProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadHandler = (): void => {
    //TODO: Remove delay

    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  const clickHandler = (): void => {
    if (props.isPreview && isLoaded) {
      props.clickHandler(props.index)();
    }
  };

  if (props.isPreview) {
    return (
      <div className="xl:w-1/5 w-1/3 p-3 h-56">
        <button
          className={clsx(
            'peer select-none flex overflow-hidden h-full w-full relative cursor-progress before:pointer-events-none rounded-xl active:scale-[.99] transition-all before:absolute before:inset-0 before:opacity-25 before:rounded-xl before:transition',
            {
              'hover:scale-[1.03] hover:before:bg-black !cursor-pointer': isLoaded,
            },
          )}
          onClick={clickHandler}
        >
          <img
            src={`client-screenshots://${props.screenshot}`}
            alt=""
            className={clsx('w-full h-full object-cover', {
              hidden: !isLoaded,
            })}
            onLoad={loadHandler}
          />
          <Skeleton
            className="block size-full"
            containerClassName={clsx(
              'flex opacity-1 transition-all duration-700 absolute inset-0',
              {
                'opacity-0': isLoaded,
              },
            )}
            baseColor="#CFDAF5"
            highlightColor="#F4F8FE"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="h-full relative w-full overflow-hidden rounded-3xl flex justify-start items-center">
      <img
        src={`client-screenshots://${props.screenshot}`}
        alt=""
        className="w-full h-full aspect-video object-cover"
      />
    </div>
  );
};

export default ClientScreenshot;
