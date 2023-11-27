import { RouterINTF } from '@/entity/RouterINTF';
import { ForkOutlined } from '@ant-design/icons';
import { lazy } from 'react';

const networkMenus: RouterINTF[] = [
  {
    path: 'lan',
    key: 'lan',
    title: 'lan',
    icon: <ForkOutlined />,
    meta: {
      authentication: true
    },
    component: lazy(() => import('@/views/pages/Network'))
  }
];

export default networkMenus;
