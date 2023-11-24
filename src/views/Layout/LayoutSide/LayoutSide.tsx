import { Layout, Menu } from 'antd';
import { routes } from '@/router/routes';
import { useEffect, useMemo, useState } from 'react';
import { MenuINF } from '@/entity/MenuINF';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const McaLayoutSide = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  const menus = useMemo(() => {
    return routes[0].children?.map((el) => {
      const menu: MenuINF = {
        key: `${el.key}`,
        icon: null,
        label: el.children ? (
          el.title
        ) : (
          <Link to={`${el.path}`}>{el.title}</Link>
        )
      };
      if (el.children && el.children.length > 0) {
        const children: MenuINF[] = [];
        el.children.forEach((child) => {
          if (child.key) {
            children.push({
              key: child.key,
              icon: null,
              label: <Link to={`${el.path}/${child.path}`}>{child.title}</Link>
            });
          }
        });
        menu.children = children;
      }
      return menu;
    });
  }, []);

  return (
    <Sider
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={menus}
      />
    </Sider>
  );
};

export default McaLayoutSide;
