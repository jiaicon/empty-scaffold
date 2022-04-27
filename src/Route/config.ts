import { lazy } from 'react';
import Layout from './../Layouts';

const RouteConfig = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/home",
        component: lazy(() => import('../pages/Home')),
      },
      { path: "/", redirect: "/home" },
    ],
  },
  {
    path: "/",
    redirect: "/home",
  },
];

export default RouteConfig;