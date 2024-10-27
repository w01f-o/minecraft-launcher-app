import { FC, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '../shared/Icons/SettingsIcon';
import ModPackList from '../widgets/Modpacks/ModpackList';
import StartButton from '../features/StartButton';
import StasBackground from '../widgets/Background/StasBackground';
import { RoutePaths } from '@renderer/enums/RoutePaths.enum';
import { useMinecraft } from '@renderer/hooks/useMinecraft';

const Home: FC = () => {
  const { currentModPack } = useMinecraft();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [currentModPack]);

  return (
    <>
      <div className="flex h-full flex-grow justify-between items-center mt-[10px]">
        <div
          className="z-0 relative overflow-y-auto w-1/2 max-h-[65vh] scrollbar-track-transparent scroll-smooth scrollbar-thumb-blue pr-4 custom-scrollbar"
          id="modpacks-scroll-container"
          ref={scrollContainerRef}
        >
          <ModPackList />
        </div>
        <div className="flex items-center gap-4 self-end z-20">
          <StartButton />
          <NavLink
            to={RoutePaths.SETTINGS}
            className="active:scale-95 animate-spin-slow"
            title={'Настройки'}
            draggable={false}
          >
            <SettingsIcon />
          </NavLink>
        </div>
      </div>
      <StasBackground />
    </>
  );
};

export default Home;
