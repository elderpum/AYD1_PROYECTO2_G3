import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventario from './pages/Inventario/Inventario';
import { RegistroCliente } from './pages/registroCliente/RegistroCliente';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/registroCliente" element={<RegistroCliente />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;