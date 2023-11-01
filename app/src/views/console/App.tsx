import ProLayout from '@ant-design/pro-layout';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useConsoleData } from './ConsoleContext';
import { appLocales } from './config/locales';
import routes from "./routes";
import { reAuthenticate } from './services/authentication';
import { authStorageKey } from './services/client';

const loginExcludedPaths = ['/console/login', '/console/register'];

const FullScreenSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Spin size='large' />
    </div>
  );
};

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
    return <FullScreenSpinner />;
  }

  return (
    <Routes>
      {routes.map(({ path, element, layout }) => {
        const renderedElement = layout ? (
          <ProLayout
            title={appLocales.title}
            logo='/vite.svg'
            menuDataRender={() => routes}
            menuItemRender={(item, dom) => (
              <Link to={item.path as string}>{dom}</Link>
            )}
          >
            {element}
          </ProLayout>
        ) : element;
        return <Route key={path} path={path} element={renderedElement} />;
      })}
    </Routes>
  );
};

export default App;
