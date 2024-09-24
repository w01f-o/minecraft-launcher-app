import { ReactNode } from 'react';

export interface Route {
  path: string;
  title: string;
  isNavBar: boolean;
  element: ReactNode;
}
