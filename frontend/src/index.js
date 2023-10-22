import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { GeneralContextProvider } from './contexts/generalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GeneralContextProvider>
      <App />
    </GeneralContextProvider>
  </React.StrictMode>
);