import ProLayout from '@ant-design/pro-layout';
import { Link, Route, Routes } from "react-router-dom";
import { appLocales } from './config/locales';
import routes from "./routes";



const App = () => {
  return (
    <Routes>
      {routes.map(({ path, element, layout }) => {
        const renderedElement = layout ? (
          <ProLayout
            title={appLocales.title}
            logo='/vite.svg'
            menuDataRender={() => routes}
            menuItemRender={(item, dom) => {
              return (
                <Link to={item.path as string}>
                  {dom}
                </Link>
              );
            }}
          >
            {element}
          </ProLayout>
        ) : element;
        return <Route key={path} path={path} element={renderedElement} />
      })}
    </Routes>
  );
};

export default App;
