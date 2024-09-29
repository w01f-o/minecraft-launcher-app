import { FC, useState } from 'react';
import clsx from 'clsx';
import beepSound from '../../../../../../resources/beep.ogg';
import stasImage from '../../../../../../resources/stasbg.webp';
import useSound from 'use-sound';

const StasBackground: FC = () => {
  const [stasEasterIsActive, setStasEasterIsActive] = useState<boolean>(false);
  const [play] = useSound(beepSound, {
    volume: 0.1,
  });

  const stasEasterClickHandler = (): void => {
    setStasEasterIsActive(!stasEasterIsActive);
    if (!stasEasterIsActive) {
      play();

      setTimeout(() => {
        setStasEasterIsActive(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="flex absolute right-0 bottom-0 z-10 pointer-events-none select-none w-auto h-[70vh]">
        <img src={stasImage} alt="" className="size-full" />
        <div
          className={clsx(
            'w-8 h-8 absolute right-[36%] opacity-70 bottom-[47vh] z-10 rounded-full pointer-events-auto transition cursor-pointer',
            {
              'bg-red-400': stasEasterIsActive,
            },
          )}
          onDoubleClick={stasEasterClickHandler}
        ></div>
      </div>
    </>
  );
};

export default StasBackground;
