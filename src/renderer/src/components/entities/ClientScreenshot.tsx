import { FC } from 'react';
import clsx from 'clsx';
import Image from '@renderer/components/features/Image';

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
  const clickHandler = (): void => {
    if (props.isPreview) {
      props.clickHandler(props.index)();
    }
  };

  if (props.isPreview) {
    return (
      <div className="xl:w-1/5 w-1/3 p-3 h-56">
        <button
          className={clsx(
            'peer select-none flex overflow-hidden h-full w-full relative hover:scale-[1.03] before:bg-black before:pointer-events-none rounded-xl active:scale-[.99] transition-all before:absolute before:inset-0 before:opacity-25 before:rounded-xl before:transition',
          )}
          onClick={clickHandler}
        >
          <Image
            src={`client-screenshots://${props.screenshot}`}
            alt={''}
            width={'100%'}
            height={'100%'}
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
