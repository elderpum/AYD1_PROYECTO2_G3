import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistroCliente } from './pages/registroCliente/RegistroCliente';
import { RegistroEmpleado } from './pages/registroEmpleado/RegistroEmpleado';
import { AlquimovilRouter } from './router/AlquimovilRouter';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<RegistroCliente />} />
          {/* <Route path="/registroCliente" element={<RegistroCliente />} /> */}
          <Route path="/registroEmpleado" element={<RegistroEmpleado />} />
          <Route path="/*" element={<AlquimovilRouter />} /> {/* RUTAS HACIA NAVBAR */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;