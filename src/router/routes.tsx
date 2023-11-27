import { RouterINTF } from '@/entity/RouterINTF';
import { lazy } from 'react';
import { networkMenus, advanceMenus } from './modules';
import { GlobalOutlined, GoldOutlined, HomeOutlined } from '@ant-design/icons';

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
        icon: <HomeOutlined />,
        meta: {
          authentication: true
        },
        component: lazy(() => import('@/views/pages/Home'))
      },
      {
        path: 'network',
        key: 'network',
        title: '_network',
        icon: <GlobalOutlined />,
        meta: {
          authentication: true
        },
        children: [...networkMenus]
      },
      {
        path: 'advance',
        key: 'advance',
        title: '_advance',
        icon: <GoldOutlined />,
        meta: {
          authentication: true
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
