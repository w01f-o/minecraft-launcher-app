import { Route } from '../types/Route.type';
import Home from '../components/pages/Home';
import Settings from '../components/pages/Settings';
import Character from '../components/pages/Character';
import ClientScreenshots from '../components/pages/ClientScreenshots';
import Debug from '../components/pages/Debug';
import Loading from '../components/pages/Loading';
import { RoutePaths } from '@renderer/enums/RoutePaths.enum';

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
