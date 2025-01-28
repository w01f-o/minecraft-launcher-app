import Settings from '@renderer/components/pages/Settings';
import Character from '../components/pages/Character';
import ClientScreenshots from '../components/pages/ClientScreenshots';
import Debug from '../components/pages/Debug';
import Home from '../components/pages/Home';
import Loading from '../components/pages/Loading';
import { RoutePaths } from '@renderer/enums/RoutePaths.enum';
import { Route } from '@renderer/types/Route.type';

export const routes: Route[] = [
  {
    path: RoutePaths.HOME,
    element: <Home />,
    title: 'Главная',
    isNavBar: true,
  },
  {
    path: RoutePaths.SETTINGS,
    element: <Settings />,
    title: 'Настройки',
  },
  {
    path: RoutePaths.CHARACTER,
    element: <Character />,
    title: 'Персонаж',
    isNavBar: true,
  },
  {
    path: RoutePaths.SCREENSHOTS,
    element: <ClientScreenshots />,
    title: 'Скриншоты',
    isNavBar: true,
  },
  {
    path: RoutePaths.DEBUG,
    element: <Debug />,
    title: 'Debug',
  },
  {
    path: RoutePaths.MINECRAFT_LOADING,
    element: <Loading />,
    title: 'Загрузка',
  },
];
