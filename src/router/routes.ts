import { RouterINTF } from '@/entity/RouterINTF';
import { lazy } from 'react';
import { networkMenus, advanceMenus } from './modules';

export const routes: RouterINTF[] = [
  {
    path: '/',
    meta: {
      authentication: false
    },
    component: lazy(() => import('@/views/Layout')),
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        key: 'home',
        title: '_home',
        meta: {
          authentication: false
        },
        component: lazy(() => import('@/views/pages/Home'))
      },
      {
        path: 'network',
        key: 'network',
        title: '_network',
        meta: {
          authentication: false
        },
        children: [...networkMenus]
      },
      {
        path: 'advance',
        key: 'advance',
        title: '_advance',
        meta: {
          authentication: false
        },
        children: [...advanceMenus]
      }
    ]
  },
  {
    path: '/login',
    meta: {},
    component: lazy(() => import('@/views/pages/Login'))
  },
  {
    path: '*',
    meta: {},
    redirect: '/'
  }
];
