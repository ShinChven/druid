import ProLayout from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from "react-router";
import { useConsoleData } from './ConsoleContext';
import Forbidden from './components/Forbidden';
import FullscreenSpinner from './components/FullscreenSpinner';
import NotFound from './components/NotFound';
import { appLocales } from './config/locales';
import routes, { getAccessibleMenu, menuRoutes } from "./routes";
import { reAuthenticate } from './services/authentication';
import { authStorageKey } from './services/client';
import enUS from 'antd/locale/en_US';

const loginExcludedPaths = ['/console/login', '/console/register'];

const App = () => {
  const [action, setAction] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, setAdmin } = useConsoleData();

  useEffect(() => {
    (async () => {
      if (!admin && !loginExcludedPaths.includes(location.pathname)) {
        try {
          const token = localStorage.getItem(authStorageKey);
          if (token) {
            const result = await reAuthenticate();
            if (result.admin) {
              setAdmin(result.admin);
              setAction(action + 1);
              return;
            }
          }
        } catch (err) {
          console.error(err);
        }
        navigate('/console/login');
      }
    })();
  }, [location.pathname]);

  if (!admin && !loginExcludedPaths.includes(location.pathname)) {
    // If this condition is met, the useEffect will navigate away before rendering anything else
    return <FullscreenSpinner />;
  }


  const accessibleMenuRoutes = getAccessibleMenu(menuRoutes, admin?.access);

  return (
    // https://ant.design/docs/react/customize-theme
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
      locale={enUS}
    >
      <Routes>
        {routes.map((route) => {
          const { path, element, layout, access } = route;

          let isForbidden = false;
          if (access && admin) {
            isForbidden = !admin.access.includes(access);
          }
          const outlet = isForbidden ? <Forbidden /> : element;
          const renderedElement = layout ? (
            <ProLayout
              token={{
                bgLayout: '#f5f5f5',
              }}
              title={appLocales.title}
              logo='/vite.svg'
              menuDataRender={() => accessibleMenuRoutes}
              menuItemRender={(item, dom) => {
                if (!item.element) {
                  return dom;
                }
                return (
                  <Link to={item.path as string}>{dom}</Link>
                )
              }}
              breadcrumbRender={false}
              menuFooterRender={(props) => {
                if (props?.collapsed) return undefined;
                return (
                  <p
                    style={{
                      textAlign: 'center',
                      paddingBlockStart: 12,
                    }}
                  >
                    Powered by Druid
                  </p>
                );
              }}
            >
              {outlet}
            </ProLayout>
          ) : outlet;
          return <Route key={path} path={path} element={renderedElement} />;
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
