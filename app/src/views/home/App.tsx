import { Route, Routes } from "react-router";
import './global.module.less';
import routes from "./routes";

const App = () => {
  return <div>
    <Routes>
      {routes.map(({ path, element }) => {
        return <Route key={path} path={path} element={element}></Route>
      })}
    </Routes>
  </div>
};

export default App;