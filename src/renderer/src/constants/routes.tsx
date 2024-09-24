import { Route } from '../types/Route.type';
import Home from '../components/pages/Home';
import Settings from '../components/pages/Settings';
import Skins from '../components/pages/Skins';
import Screenshots from '../components/pages/Screenshots';
import Debug from '../components/pages/Debug';
import Loading from '../components/pages/Loading';

export const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
    title: 'Главная',
    isNavBar: true,
  },
  {
    path: '/settings',
    element: <Settings />,
    title: 'Настройки',
    isNavBar: false,
  },
  {
    path: '/skins',
    element: <Skins />,
    title: 'Скины',
    isNavBar: true,
  },
  {
    path: '/screenshots',
    element: <Screenshots />,
    title: 'Скриншоты',
    isNavBar: true,
  },
  {
    path: '/debug',
    element: <Debug />,
    title: 'Debug',
    isNavBar: false,
  },
  {
    path: '/loading',
    element: <Loading />,
    title: 'Debug',
    isNavBar: false,
  },
];
