import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistroCliente } from './pages/registroCliente/RegistroCliente';
import { RegistroEmpleado } from './pages/registroEmpleado/RegistroEmpleado';
import { AlquimovilRouter } from './router/AlquimovilRouter';
import { LoginCliente } from './pages/loginCliente/LoginCliente';
import { LoginAdmin } from './pages/loginAdmin/LoginAdmin';
import { LoginEmpleado } from './pages/loginEmpleado/LoginEmpleado';
import { Codigo } from './pages/codigoAcceso/Codigo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LoginCliente />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/loginEmpleado" element={<LoginEmpleado />} />
          <Route path="/registroCliente" element={<RegistroCliente />} />
          <Route path="/registroEmpleado" element={<RegistroEmpleado />} />
          <Route path="/codigoAcceso" element={<Codigo />} />
          <Route path="/alquimovil" element={<AlquimovilRouter />} /> {/* RUTAS HACIA NAVBAR */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;