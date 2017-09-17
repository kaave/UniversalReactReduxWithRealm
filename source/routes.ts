import { ComponentClass, SFC } from 'react';

import Dashboard from './components/Dashboard';

export interface Route {
  path: string;
  component: ComponentClass | SFC<any>;
  exact: boolean;
  params?: {};
}

export interface Context {
  status?: number;
  action?: string;
  url?: string;
  location?: string;
}

export interface Redirect {
  from: string;
  to: string;
  status: number;
}

export const routes: Route[] = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
  },
];

export const redirects: Redirect[] = [
  // {
  //   from: '/people',
  //   to: '/user',
  //   status: 301,
  // },
];
