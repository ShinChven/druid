import { HomeOutlined, InfoCircleFilled, SettingFilled } from "@ant-design/icons";
import { MenuDataItem } from "@ant-design/pro-components";
import { RouteObject } from "react-router-dom";
import Forbidden from "./components/Forbidden";
import About from "./pages/About";
import Admins from "./pages/AdminArea/Admins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export const menuRoutes: Array<MenuDataItem> = [
  {
    path: '/console/',
    element: <Dashboard />,
    name: 'Dashboard',
    icon: <HomeOutlined />,
    layout: true,
  },
  {
    path: '/console/admin-area',
    name: 'Admin Area',
    icon: <SettingFilled />,
    layout: true,
    access: 'console:admins',
    children: [
      {
        path: '/console/admin-area/admins',
        name: 'Admins',
        layout: true,
        element: <Admins />,
        access: 'console:admins',
        children: [
          {
            path: '/console/admin-area/admins/:id',
            name: 'Admins',
            layout: true,
            element: <Admins />,
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  {
    // about
    path: '/console/about',
    name: 'About',
    element: <About />,
    icon: <InfoCircleFilled />,
    layout: true,
  },
  {
    path: '/console/login',
    name: 'Login',
    element: <Login />,
    hideInMenu: true,
  },

];

export function getAccessibleMenu(routes: Array<MenuDataItem>, adminAccess: Array<string> = []) {
  return routes.filter((route) => {
    if (typeof route.access === 'string') {
      if (!adminAccess?.includes(route.access)) {
        return false;
      }
    }
    if (route.children) {
      route.children = getAccessibleMenu(route.children, adminAccess);
    }
    return true;
  });
}


type AppRoute = RouteObject & MenuDataItem & { layout?: boolean }

const routes: Array<AppRoute> = (() => {
  const _routes: Array<AppRoute> = [];


  const loadRoute = (item: MenuDataItem) => {
    if (item.element) {
      _routes.push(item);
    }
    if (Array.isArray(item.children)) {
      item.children.forEach((child) => {
        loadRoute(child);
      });
    }
  };

  menuRoutes.forEach((item) => {
    loadRoute(item);
  });

  return _routes;
})()

export default routes;