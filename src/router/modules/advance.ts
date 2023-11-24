import { RouterINTF } from '@/entity/RouterINTF';
import { lazy } from 'react';

const advanceMenus: RouterINTF[] = [
  {
    path: 'mesh',
    key: 'mesh',
    title: 'mesh',
    meta: {
      authentication: false
    },
    component: lazy(() => import('@/views/pages/Advance'))
  }
];

export default advanceMenus;
