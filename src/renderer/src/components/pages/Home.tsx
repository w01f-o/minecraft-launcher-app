import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '../shared/Icons/SettingsIcon';
import ModPackList from '../widgets/ModpackList';
import stasBg from '../../../../../resources/stasbg.webp';
import beepSound from '../../../../../resources/beep.ogg';
import StartButton from '../features/StartButton';
import clsx from 'clsx';
import useSound from 'use-sound';

const Home: FC = () => {
  useEffect(() => {
    document.title = 'The Chocolate Thief';
  }, []);

  const [stasEasterIsActive, setStasEasterIsActive] = useState<boolean>(false);
  const [play] = useSound(beepSound, {
    volume: 0.1,
  });

  const stasEasterClickHandler = (): void => {
    setStasEasterIsActive(!stasEasterIsActive);
    if (!stasEasterIsActive) {
      play();
    }
  };

  return (
    <>
      <div className="flex h-full flex-grow justify-between items-center">
        <div
          className="z-30 relative overflow-y-auto w-1/2 max-h-[70vh] scrollbar-track-transparent scrollbar-thumb-blue pr-4 custom-scrollbar"
          id="modpacks-scroll-container"
        >
          <ModPackList />
        </div>
        <div className="flex items-center gap-4 self-end z-20">
          <StartButton />
          <NavLink
            to={'/settings'}
            className="active:scale-95 animate-spin-slow"
            title={'Настройки'}
          >
            <SettingsIcon />
          </NavLink>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 z-10 pointer-events-none select-none">
        <img src={stasBg} alt="" />
      </div>
      <div
        className={clsx('w-8 h-8 absolute right-[195px] bottom-[355px] z-10 rounded-full', {
          'bg-red-400': stasEasterIsActive,
        })}
        onDoubleClick={stasEasterClickHandler}
      ></div>
    </>
  );
};

export default Home;
