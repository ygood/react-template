import { Layout, Menu } from 'antd';
import { routes } from '@/router/routes';
import { useContext, useEffect, useMemo, useState } from 'react';
import { MenuINF } from '@/entity/MenuINF';
import { useLocation, useNavigate } from 'react-router-dom';
import { languageContext } from '@/context';

const { Sider } = Layout;

const McaLayoutSide = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { langs } = useContext(languageContext);
  const location = useLocation();
  const [curActiveMenu, setCurActiveMenu] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  // 菜单
  const menus = useMemo(() => {
    if (!routes[0].children) {
      return [];
    }
    const menuArr: MenuINF[] = [];
    for (const el of routes[0].children) {
      if (!el.path && !el.title) {
        continue;
      }
      const menu: MenuINF = {
        key: `/${el.path}`,
        icon: el?.icon,
        label: langs[el.title || ''] ? langs[el.title || ''] : el.title
      };
      if (el.children && el.children.length > 0) {
        const children: MenuINF[] = [];
        el.children.forEach((child) => {
          if (child.path) {
            children.push({
              key: `/${el.path}/${child.path}`,
              icon: child.icon,
              label: langs[child.title || '']
                ? langs[child.title || '']
                : child.title
            });
          }
        });
        menu.children = children;
      }
      menuArr.push(menu);
    }
    return menuArr;
  }, [langs]);

  useEffect(() => {
    let path = location.pathname;
    if (path === curActiveMenu[0]) {
      return;
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
      path = '/home';
    }
    setCurActiveMenu([path]);
  }, [curActiveMenu, location.pathname, menus]);

  const menuClick = (item: any) => {
    navigate(item.key, { replace: true });
    setCurActiveMenu([item.key]);
  };

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
        selectedKeys={curActiveMenu}
        onClick={menuClick}
      />
    </Sider>
  );
};

export default McaLayoutSide;
