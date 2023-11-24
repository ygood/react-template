import { RouterINTF } from '@/entity/RouterINTF';
import { lazy } from 'react';

const networkMenus: RouterINTF[] = [
  {
    path: 'lan',
    key: 'lan',
    title: 'lan',
    meta: {
      authentication: true
    },
    component: lazy(() => import('@/views/pages/Network'))
  }
];

export default networkMenus;
