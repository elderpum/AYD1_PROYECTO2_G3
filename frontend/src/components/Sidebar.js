import React, { useState } from "react";
import Logo from "../assets/logo1.png";
import styled from "styled-components";
import "./Sidebar.css";

import {
  MdHomeFilled,
  MdLogout,
  MdOutlineEventAvailable,
  MdOutlineSettingsBackupRestore,
  MdContentPasteSearch,
} from "react-icons/md";

import { FaCarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CrudVehiculos } from "../pages/CrudVehiculos/CrudVehiculos";
import { Alquilar } from "../pages/Alquilar/Alquilar";
import { GestionarCosto } from "../pages/GestionarCosto/GestionarCosto";
import { Inventario } from "../pages/Inventario/Inventario";

// ---- BARRA LATERAL IZQUIERDA. ---- //
export const Sidebar = () => {

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


            <li className={`option d-flex align-items-center`} onClick={() => setIndex(1)}>
              <MdHomeFilled />
              <span>Inicio</span>
            </li>


            <li className={`option d-flex align-items-center`} onClick={() => setIndex(2)}>
              <MdContentPasteSearch />
              <span>Solicitudes de Reserva</span>
            </li>


            <li className={`option d-flex align-items-center`} onClick={() => setIndex(3)}>
              <MdOutlineSettingsBackupRestore />
              <span>Devolución</span>
            </li>


            <li className={`option d-flex align-items-center`} onClick={() => setIndex(4)}>
              <MdOutlineEventAvailable />
              <span>Historial de Alquileres</span>
            </li>


            <li className={`option d-flex align-items-center`} onClick={() => setIndex(8)}>
              <FaCarAlt />
              <span>Administrar Vehiculos</span>
            </li>

            <li className="option d-flex align-items-center cerrar" onClick={cerrarSesion}>
              <MdLogout />
              <span>Cerrar Sesión</span>
            </li>

          </ul>

        </div>

      </Container>

      { /* Aqui van los componentes de las vistas */ }

      { index === 1 && <Inventario setIndex={ setIndex }/> }
      { /* {index === 2 && <COMPONENTE-DESEADO />} */ }
      { /* {index === 3 && <COMPONENTE-DESEADO />} */ }
      { /* {index === 4 && <COMPONENTE-DESEADO />} */ }
      { /* {index === 5 && <COMPONENTE-DESEADO />} */ }
      { index === 6 && <GestionarCosto/> }
      { index === 7 && <Alquilar/> }
      { index === 8 && <CrudVehiculos/> }

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