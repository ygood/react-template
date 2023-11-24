import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { getLoginStatus } from '@/utils/sessionStorageUtil';
import { RouterINTF } from '@/entity/RouterINTF';
import React from 'react';

// 拦截
const RouterBeforeEach = (props: { route: RouterINTF; children: any }) => {
  const isLogin = getLoginStatus() === 'true';
  if (props?.route?.meta?.authentication) {
    if (!isLogin) {
      return <Navigate to={'/login'} replace />;
    }
  }
  // eslint-disable-next-line
  const location = useLocation();
  const routerKey = location.pathname;
  if (isLogin && ['/login'].includes(routerKey)) {
    return <Navigate to={'/'} replace />;
  }
  return <React.Suspense>{props.children}</React.Suspense>;
};

// 渲染路由
const renderRoutes = (cuoutes: RouterINTF[]) => {
  return cuoutes.map((item: RouterINTF) => {
    const route: any = { meta: item.meta, path: item.path };
    if (item.component) {
      // element 要接收react.element类型 item.component 是对象要转一下
      route.element = (
        <RouterBeforeEach route={item}>
          <item.component />
        </RouterBeforeEach>
      );
    }
    if (item.children) {
      route.children = renderRoutes(item.children);
    }
    if (item.redirect) {
      route.element = <Navigate to={item.redirect} />;
    }
    return route;
  });
};

export default function Router() {
  // useRoutes API 把路由数组整合为 <Router> <Route path="xx" element="xxx"></Route>等 </Router>的路由组件  直接用于BrowserRouter中
  return useRoutes(renderRoutes(routes));
}
