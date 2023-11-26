import { Layout, Menu } from 'antd';
import { routes } from '@/router/routes';
import { useContext, useMemo, useRef, useState } from 'react';
import { MenuINF } from '@/entity/MenuINF';
import { Link, useLocation } from 'react-router-dom';
import { languageContext } from '@/context';

const { Sider } = Layout;

const McaLayoutSide = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { langs } = useContext(languageContext);
  const location = useLocation();
  const curActiveMenu = useRef('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 菜单
  const menus = useMemo(() => {
    if (!routes[0].children) {
      return [];
    }
    const menuArr: MenuINF[] = [];
    for (const el of routes[0].children) {
      if (!el.key && !el.title) {
        continue;
      }
      const menu: MenuINF = {
        key: `${el.key}`,
        icon: null,
        label: el.children ? (
          langs[el.title || ''] ? (
            langs[el.title || '']
          ) : (
            el.title
          )
        ) : (
          <Link to={`${el.path}`}>
            {langs[el.title || ''] ? langs[el.title || ''] : el.title}
          </Link>
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
      menuArr.push(menu);
    }
    return menuArr;
  }, [langs]);

  const currentMenu = useMemo(() => {
    let path = location.pathname.split('/').pop() || 'home';
    if (path === curActiveMenu.current) {
      return path;
    }
    setOpenKeys([]);
    const flag = menus.some((el) => {
      const childrenHasKey = el.children?.some((child) => child.key === path);
      if (childrenHasKey) {
        setOpenKeys([el.key]);
      }
      if (el.key === path || childrenHasKey) {
        return true;
      }
    });
    if (!flag) {
      path = 'home';
    }
    curActiveMenu.current = path;
    return path;
  }, [location, menus]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

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
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[currentMenu]}
      />
    </Sider>
  );
};

export default McaLayoutSide;
