import { CharacterPage } from '@/renderer/pages/character';
import { DebugPage } from '@/renderer/pages/debug';
import { HomePage } from '@/renderer/pages/home';
import { LoadingPage } from '@/renderer/pages/loading';
import { ScreenshotsPage } from '@/renderer/pages/screenshots';
import { SettingsPage } from '@/renderer/pages/settings';
import { Route, RoutePaths } from '../model';

export const appRoutes: Route[] = [
  {
    path: RoutePaths.HOME,
    element: <HomePage />,
    title: 'Главная',
    isNavBar: true,
  },
  {
    path: RoutePaths.SETTINGS,
    element: <SettingsPage />,
    title: 'Настройки',
  },
  {
    path: RoutePaths.CHARACTER,
    element: <CharacterPage />,
    title: 'Персонаж',
    isNavBar: true,
  },
  {
    path: RoutePaths.SCREENSHOTS,
    element: <ScreenshotsPage />,
    title: 'Скриншоты',
    isNavBar: true,
  },
  {
    path: RoutePaths.DEBUG,
    element: <DebugPage />,
    title: 'Debug',
  },
  {
    path: RoutePaths.MINECRAFT_LOADING,
    element: <LoadingPage />,
    title: 'Загрузка',
  },
];
