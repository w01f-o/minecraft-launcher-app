import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { NavBar } from '@/renderer/widgets/navbar';
import { TitleBar } from '@/renderer/widgets/titlebar';
import { VpnDetect } from '@/renderer/widgets/vpn-detect';
import Snowfall from 'react-snowfall';
import { Toaster } from 'sonner';
import { RoutePaths } from '../../router';
import Background from './Background';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const pathnamesWithoutNavBar = [
    RoutePaths.SETTINGS,
    RoutePaths.MINECRAFT_LOADING,
  ];

  return (
    <>
      <TitleBar />
      <div className="flex flex-col flex-grow px-14 pb-12 relative">
        <div className="flex desktop-height:mb-2 pb-4 gap-4 items-end">
          <h1 className="text-[40px] leading-none font-bold text-blue_dark  mt-2 desktop-height:text-5xl select-none">
            The Chocolate Thief
          </h1>
          <VpnDetect />
        </div>
        {!pathnamesWithoutNavBar.includes(pathname as RoutePaths) && <NavBar />}
        {children}
      </div>
      <Background />
      <div id="root-portal" className="z-[60]"></div>
      <Snowfall snowflakeCount={60} />
      <Toaster
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: 'min-w-[400px] min-h-[60px] text-lg',
          },
        }}
        offset={{
          right: '70px',
        }}
      />
    </>
  );
};
