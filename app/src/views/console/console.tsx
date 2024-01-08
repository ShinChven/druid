import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from "react-router-dom";
import App from './App';
import { ConsoleContextProvider } from './ConsoleContext';
import './global.less';

const strict = true;

const RootComponent = strict ? React.StrictMode : React.Fragment;

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <RootComponent>
    <BrowserRouter>
      <ConsoleContextProvider>
        <App />
      </ConsoleContextProvider>
    </BrowserRouter>
  </RootComponent>
);
