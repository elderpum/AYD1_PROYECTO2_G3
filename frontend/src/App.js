import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AlquimovilRouter } from './router/AlquimovilRouter';

import './App.css';

function App() {

  return (
    <div>
      <React.StrictMode>

        <BrowserRouter>

          <AlquimovilRouter />

        </BrowserRouter>

      </React.StrictMode>
    </div>
  );
  
}

export default App;