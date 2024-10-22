import { FC, ReactNode } from 'react';
import Background from '../widgets/Background/Background';
import TitleBar from '../widgets/TitleBar';
import NavBar from '../widgets/NavBar';
import { useLocation } from 'react-router-dom';
import Toast from '@renderer/components/features/Toast/Toast';
import { RoutePaths } from '@renderer/enums/RoutePaths.enum';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const pathnamesWithoutNavBar = [RoutePaths.SETTINGS, RoutePaths.MINECRAFT_LOADING];

  return (
    <>
      <TitleBar />
      <div className="flex flex-col flex-grow px-14 pb-12 relative">
        <h1 className="text-[40px] leading-none font-bold text-blue_dark pb-4 mt-2 desktop-height:text-5xl desktop-height:mb-2 select-none">
          The Chocolate Thief
        </h1>
        {!pathnamesWithoutNavBar.includes(pathname as RoutePaths) && <NavBar />}
        {children}
      </div>
      <Background />
      <div id="root-portal"></div>
      <Toast />
    </>
  );
};

export default Layout;
