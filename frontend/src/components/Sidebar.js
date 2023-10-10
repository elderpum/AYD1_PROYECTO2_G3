import React, { useState } from "react";
import Logo from "../assets/logo1.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


import {
  MdHomeFilled,
  MdLogout,
  MdOutlineEventAvailable,
  MdOutlineSettingsBackupRestore,
  MdContentPasteSearch,
} from "react-icons/md";

import "./Sidebar.css";



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


            <li className="option d-flex align-items-center cerrar" onClick={cerrarSesion}>
              <MdLogout />
              <span>Cerrar Sesión</span>
            </li>

          </ul>

        </div>

      </Container>

      {/* Aqui van los componentes de las vistas */}

      {/* {index === 1 && <COMPONENTE-DESEADO />} */}
      {/* {index === 2 && <COMPONENTE-DESEADO />} */}
      {/* {index === 3 && <COMPONENTE-DESEADO />} */}
      {/* {index === 4 && <COMPONENTE-DESEADO />} */}

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