import { ReactNode } from 'react';
import { RoutePaths } from './RoutePaths.enum';

export interface Route {
  path: RoutePaths;
  title: string;
  isNavBar?: true;
  element: ReactNode;
}
