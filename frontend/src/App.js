import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventario from './pages/Inventario/Inventario';
import { RegistroCliente } from './pages/registroCliente/RegistroCliente';
import { RegistroEmpleado } from './pages/registroEmpleado/RegistroEmpleado';
import { Alquilar } from './pages/Alquilar/Alquilar';
import { GestionarCosto } from './pages/GestionarCosto/GestionarCosto';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/registroCliente" element={<RegistroCliente />} />
          <Route path="/registroEmpleado" element={<RegistroEmpleado />} />

          <Route path="/inicio" element={<Inventario />} /> {/** VISUALIZACION DE VEHICULOS */}
          <Route path="/alquilar/:id" element={<Alquilar />} /> {/** ALQUILAR UN VEHICULO */}
          <Route path="/gestionarCosto/:id" element={<GestionarCosto />} /> {/** GestionarCosto UN VEHICULO */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;