import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from "react-router-dom";
import App from './App';
import { ConsoleContextProvider } from './ConsoleContext';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConsoleContextProvider>
        <App />
      </ConsoleContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

