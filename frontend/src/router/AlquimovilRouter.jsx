import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { LoginCliente } from "../pages/loginCliente/LoginCliente";
import { LoginAdmin } from "../pages/loginAdmin/LoginAdmin";
import { LoginEmpleado } from "../pages/loginEmpleado/LoginEmpleado";
import { RegistroCliente } from "../pages/registroCliente/RegistroCliente";
import { RegistroEmpleado } from "../pages/registroEmpleado/RegistroEmpleado";
import { Codigo } from "../pages/codigoAcceso/Codigo";
import { Sidebar } from "../components/Sidebar";


export const AlquimovilRouter = () => {

    // Hook para el estado del regreso del la pagina codigo acceso.
    const [isAuth, setIsAuth] = useState(false);
    
    
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginCliente setIsAuth={setIsAuth} />} />
                <Route path="/loginEmpleado" element={<LoginEmpleado setIsAuth={setIsAuth} />} />
                <Route path="/loginAdmin" element={<LoginAdmin />} />
                <Route path="/registroCliente" element={<RegistroCliente />} />
                <Route path="/registroEmpleado" element={<RegistroEmpleado />} />
                <Route path="/codigoAcceso" element={<Codigo isAuth={isAuth} />} />
                <Route path="/alquimovil" element={<Sidebar />} /> {/* RUTAS HACIA NAVBAR */}
            </Routes>
        </>
    )
}