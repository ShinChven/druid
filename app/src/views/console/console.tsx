import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import {
  BrowserRouter
} from "react-router";
import App from './App';
import { ConsoleContextProvider } from './ConsoleContext';
import './global.less';

const strict = false;

const RootComponent = strict ? React.StrictMode : React.Fragment;

const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(
    rootElement,
    <RootComponent>
      <BrowserRouter>
        <ConsoleContextProvider>
          <App />
        </ConsoleContextProvider>
      </BrowserRouter>
    </RootComponent>
  );
}

