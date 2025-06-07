import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {
  BrowserRouter
} from "react-router";
import App from './App';
import { DataProvider } from './context'; // Import DataProvider

const initialData = window.__INITIAL_DATA__;  // Access the serialized data

const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <DataProvider initialData={initialData}>  {/* Wrap RouterProvider with DataProvider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataProvider>
    </React.StrictMode>,
  );
}

