import { HomeOutlined, InfoCircleFilled } from "@ant-design/icons";
import { MenuDataItem } from "@ant-design/pro-components";
import { RouteObject } from "react-router-dom";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const routes: Array<RouteObject & MenuDataItem & { layout?: boolean }> = [
  {
    path: '/console/',
    element: <Dashboard />,
    name: 'Dashboard',
    icon: <HomeOutlined />,
    layout: true,
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

export default routes;