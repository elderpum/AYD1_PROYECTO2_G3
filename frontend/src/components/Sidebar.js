import React from "react";
import Logo from "../assets/logo1.png";
import styled from "styled-components";

import {
  MdHomeFilled,
  MdLogout,
  MdOutlineEventAvailable,
  MdOutlineSettingsBackupRestore,
  MdContentPasteSearch,
} from "react-icons/md";

//import { HiDocumentDuplicate } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };
  
  return (
    <Container>
      <div className="menu_options">
        <div className="logo">
          <img src={Logo} alt="soundstream" />
        </div>
            <ul className='ul_sidebar'>
            <Link to="/inicio" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center`}>
                <MdHomeFilled />
                <span>Inicio</span>
                </li>
            </Link>
            <Link to="/inicio"  style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center`}>
                    <MdContentPasteSearch />
                    <span>Solicitudes de Reserva</span>
                </li>
            </Link>
            <Link to="/inicio"  style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center`}>
                    <MdOutlineSettingsBackupRestore />
                    <span>Devolución</span>
                </li>
            </Link>
            <li className={`option d-flex align-items-center`}>
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
  );
}

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