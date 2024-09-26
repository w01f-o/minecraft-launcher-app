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
      <div className="absolute right-0 bottom-0 z-10 pointer-events-none select-none">
        <img src={stasImage} alt="" />
      </div>
      <div
        className={clsx(
          'w-8 h-8 absolute right-[195px] bottom-[355px] z-10 rounded-full transition cursor-pointer',
          {
            'bg-red-400': stasEasterIsActive,
          },
        )}
        onDoubleClick={stasEasterClickHandler}
      ></div>
    </>
  );
};

export default StasBackground;
