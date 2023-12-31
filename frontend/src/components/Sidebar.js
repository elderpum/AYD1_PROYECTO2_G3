import React, { useState } from "react";
import Logo from "../assets/logo1.png";
import styled from "styled-components";
import "./Sidebar.css";

import {
  MdHomeFilled,
  MdLogout,
  MdOutlineEventAvailable,
  MdCarRental,
  MdPeopleAlt,
} from "react-icons/md";
import { FaCarAlt, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { CrudVehiculos } from "../pages/CrudVehiculos/CrudVehiculos";
import { Alquilar } from "../pages/Alquilar/Alquilar";
import { GestionarCosto } from "../pages/GestionarCosto/GestionarCosto";
import { Inventario } from "../pages/Inventario/Inventario";
import { Pago } from "../pages/Pago/Pago";
import { CrudEmpleados } from "../pages/CrudEmpleados/CrudEmpleados";
import { Solicitud } from '../pages/SolicitudRenta/Solicitud'
import { Historial } from "../pages/HistorialAlquiler/Historial";
import { CRUDClientes } from "../pages/CRUDClientes/CRUDClientes";

// ---- BARRA LATERAL IZQUIERDA. ---- //
export const Sidebar = ({ typeUser, credentials }) => {

  // hook para saber que opcion esta seleccionada.
  const [index, setIndex] = useState(1);


  // hook para redireccionar a otra pagina.
  const navigate = useNavigate();


  // Metodo para cerrar sesion.
  const cerrarSesion = () => {

    localStorage.removeItem("auth");

    navigate('/', {
      replace: true, //No dejar que la persona regrese a la pagina anterior.
    });

  };


  return (

    <ContainerVista>

      <Container>

        <div className="menu_options">

          <div className="logo">

            <img src={Logo} alt="soundstream" />

          </div>

          <ul className='ul_sidebar'>


            <li id="inventario" className={`option d-flex align-items-center`} onClick={() => setIndex(1)}>
              <MdHomeFilled />
              <span>Inicio</span>
            </li>


            {
              typeUser === 1 // Es empleado
                ?
                <li className={`option d-flex align-items-center`} onClick={() => setIndex(20)}>
                  <MdCarRental />
                  <span>Aceptación de reservas</span>
                </li>
                :
                null
            }


            <li className={`option d-flex align-items-center`} onClick={() => setIndex(4)}>
              <MdOutlineEventAvailable />
              <span>Historial de Alquileres</span>
            </li>


            {
              typeUser === 3 // Es administrador.
                ?
                <React.Fragment>
                  <li className={`option d-flex align-items-center`} onClick={() => setIndex(8)}>
                    <FaCarAlt />
                    <span>Administrar Vehiculos</span>
                  </li>


                  <li className={`option d-flex align-items-center`} onClick={() => setIndex(10)}>
                    <FaUserCog />
                    <span>Administrar Empleados</span>
                  </li>


                  <li id="crud-clientes" className={`option d-flex align-items-center`} onClick={() => setIndex(9)}>
                    <MdPeopleAlt />
                    <span>Administrar Clientes</span>
                  </li>

                </React.Fragment>
                :
                null
            }

            <li className="option d-flex align-items-center cerrar" onClick={cerrarSesion}>
              <MdLogout />
              <span>Cerrar Sesión</span>
            </li>

          </ul>

        </div>

      </Container>

      {index === 1 && <Inventario setIndex={setIndex} />}
      {index === 4 && <Historial typeUser={typeUser} />}
      {index === 10 && <CrudEmpleados />}
      {index === 20 && <Solicitud credentials={credentials} />}

      {index === 5 && <Pago setIndex={setIndex} />}
      {index === 6 && <GestionarCosto setIndex={setIndex} />}
      {index === 7 && <Alquilar setIndex={setIndex} />}
      {index === 8 && <CrudVehiculos />}
      {index === 9 && <CRUDClientes />}

    </ContainerVista>

  );
}


// Estilos Sidebar Container
const Container = styled.div`
  position: sticky;
  top: 0;
  flex: 0.2;
  height: 100%;
  min-height: 100vh;
  background-color: #181818;
  color: #b3b3b3;
  min-width: 240px;
  -webkit-box-shadow: 4px 5px 20px -7px rgba(0, 0, 0, 0.65);
  -moz-box-shadow: 4px 5px 20px -7px rgba(0, 0, 0, 0.65);
  box-shadow: 4px 5px 20px -7px rgba(0, 0, 0, 0.65);
  text-size-adjust: none;
  text-size-adjust: none;
`;


// Estilo Container Vista
const ContainerVista = styled.div`
display: flex;
`