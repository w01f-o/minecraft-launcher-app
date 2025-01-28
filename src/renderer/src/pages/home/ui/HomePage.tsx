import { StartButton } from '@/renderer/features/start-game';
import { useMinecraft } from '@/renderer/shared/lib';
import { RoutePaths } from '@/renderer/shared/router';
import { SettingsIcon } from '@/renderer/shared/ui';
import { ModPackList } from '@/renderer/widgets/modpacks';
import { FC, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { StasBackground } from './StasBackground';

export const HomePage: FC = () => {
  const {
    modpacks: { current },
  } = useMinecraft();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [current]);

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
