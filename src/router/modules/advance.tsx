import { RouterINTF } from '@/entity/RouterINTF';
import { FormatPainterOutlined } from '@ant-design/icons';
import { lazy } from 'react';

const advanceMenus: RouterINTF[] = [
  {
    path: 'mesh',
    key: 'mesh',
    title: 'mesh',
    icon: <FormatPainterOutlined />,
    meta: {
      authentication: true
    },
    component: lazy(() => import('@/views/pages/Advance'))
  }
];

export default advanceMenus;
