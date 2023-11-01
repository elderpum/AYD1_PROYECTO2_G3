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


    // Tipo de usuario 1 = Empleado, 2 = Cliente, 3 = Admin.
    const [typeUser, setTypeUser] = useState(0);


    // Credenciales del usuario.
    const [credentials, setcredentials] = useState({
        email: '',
        password: ''
    })


    return (
        <>
            <Routes>
                <Route path="/" element={<LoginCliente setIsAuth={setIsAuth} setTypeUser={setTypeUser} setcredentials={setcredentials} />} />
                <Route path="/loginEmpleado" element={<LoginEmpleado setIsAuth={setIsAuth} setTypeUser={setTypeUser} setcredentials={setcredentials} />} />
                <Route path="/loginAdmin" element={<LoginAdmin setTypeUser={setTypeUser} setcredentials={setcredentials} />} />
                <Route path="/registroCliente" element={<RegistroCliente />} />
                <Route path="/registroEmpleado" element={<RegistroEmpleado />} />
                <Route path="/codigoAcceso" element={<Codigo isAuth={isAuth} />} />
                <Route path="/alquimovil" element={<Sidebar typeUser={typeUser} credentials={credentials} />} /> {/* RUTAS HACIA NAVBAR */}
            </Routes>
        </>
    )
}