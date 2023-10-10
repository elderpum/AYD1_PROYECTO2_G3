import React from "react";
import Logo from "../assets/logo1.png";
import styled from "styled-components";

import {
  MdHomeFilled,
  MdLogout,
  MdOutlineEventAvailable,
  MdForum,
  MdContentPasteSearch,
} from "react-icons/md";

import { HiDocumentDuplicate } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar({ isOrganizador, opcionActiva }) {
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
            <Link to="/main" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center ${opcionActiva === "inicio" ? "activo" : " "}`}>
                <MdHomeFilled />
                <span>Inicio</span>
                </li>
            </Link>
            <Link to={`${isOrganizador ? "/org/buscarEvento" : "/buscarEvento"}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center ${opcionActiva === "buscar" ? "activo" : " "}`}>
                <MdContentPasteSearch />
                <span>Buscar Eventos</span>
                </li>
            </Link>
            {isOrganizador ? (
                <Link to="/agregarMaterial" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center ${opcionActiva === "agregarmaterial" ? "activo" : " "}`}>
                    <HiDocumentDuplicate />
                    <span>Crear Material Educativo</span>
                </li>
                </Link>
            ) : (
                <Link
                to={`/ver-material`}
                style={{ color: "inherit", textDecoration: "none" }}
                >
                <li
                    className={`option d-flex align-items-center ${opcionActiva === "vermaterial" ? "activo" : " "
                    }`}
                >
                    <HiDocumentDuplicate />
                    <span>Ver Material Educativo</span>
                </li>
                </Link>
            )}
            <Link to={`${isOrganizador ? "/org/foro" : "/foro"}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center ${opcionActiva === "foro" ? "activo" : " "}`}>
                <MdForum />
                <span>Foros de Discusión</span>
                </li>
            </Link>
            {isOrganizador && (
                <Link to="/misEventos" style={{ color: 'inherit', textDecoration: 'none' }}>
                <li className={`option d-flex align-items-center ${opcionActiva === "miseventos" ? "activo" : " "}`}>
                    <MdOutlineEventAvailable />
                    <span>Mis Eventos</span>
                </li>
                </Link>
            )}
            {isOrganizador && (
                <Link
                to="/crear-evento"
                style={{ color: "inherit", textDecoration: "none" }}
                >
                <li
                    className={`option d-flex align-items-center ${opcionActiva === "crear-evento" ? "activo" : " "
                    }`}
                >
                    <MdOutlineEventAvailable />
                    <span>Crear evento</span>
                </li>
                </Link>
            )}
            <Link
                to="/historial-eventos"
                style={{ color: "inherit", textDecoration: "none" }}
            >
                <li
                className={`option d-flex align-items-center ${opcionActiva === "historial" ? "activo" : " "
                    }`}
                >
                <MdOutlineEventAvailable />
                <span>Historial de Eventos</span>
                </li>
            </Link>
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