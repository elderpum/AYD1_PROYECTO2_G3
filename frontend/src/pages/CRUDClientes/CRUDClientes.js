import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import "../../components/Titulo.css";

import { Button, Stack, Dialog, DialogTitle, Pagination } from "@mui/material";
import { Titulo } from "../../components/Titulo";
import { Card } from "./components/Card";
import { FormCliente } from "./components/FormCliente";

import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function CRUDClientes() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: "Lionel",
      apellido: "Messi",
      nacimiento: "2000-01-01",
      licencia: "123456789",
      direccion: "6ta calle 10-02 zona 1",
      email: "messi@goat.com",
      telefono: "12345678",
      user: "messi10",
      password: "messi10",
    }
  ]);
  const data = {
    id: "",
    nombre: "",
    apellido: "",
    nacimiento: "",
    licencia: "",
    direccion: "",
    email: "",
    telefono: "",
    user: "",
    password: "",
  };

  const ip = "http://localhost:3001";

  const verificacionToken = useCallback(
    (res) => {
      if (res.message === "No token provided") {
        alert(res.message);
        navigate(`/`);
      } else if (res.message === "Invalid type token") {
        alert("No tienes permiso para accederer a esta página.");
        navigate(`/`);
      } else if (res.message === "Invalid token") {
        alert("Su sesión ha expirado");
        navigate(`/`);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const url = `${ip}/api/admin/clients`;
    const token = localStorage.getItem("auth");
    const dataAux = { page: page };
    console.log(dataAux);
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(dataAux),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("res: ", res);
          verificacionToken(res);
          setClientes(res.clients);
          setTotalPages(res.totalPages);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }, [navigate, page, verificacionToken]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const newClient = (e) => {
    e.preventDefault();
    setClientes([]);
    const url = `${ip}/api/admin/client/create`;
    const token = localStorage.getItem("auth");
    console.log(data);
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ client: data, page: page }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("res: ", res);
          verificacionToken(res);
          setClientes(res.clients);
          setTotalPages(res.totalPages);
          if (res.ok) {
            Swal.fire(
              "¡Cliente creado!",
              "El cliente se ha creado de forma exitosa.",
              "success"
            );
          } else {
            Swal.fire(
              "¡Error!",
              "El cliente no se ha podido crear, intente de nuevo.",
              "error"
            );
          }
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
    handleClose();
  };

  const nextPage = (event, value) => {
    setClientes([]);
    setPage(value);
    const url = `${ip}/api/admin/clients`;
    const token = localStorage.getItem("auth");
    const dataAux = { page: page };
    console.log(dataAux);
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(dataAux),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          verificacionToken(res);
          setClientes(res.data.clients);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  };

  return (
    <BodyContent>
      <Titulo titulo={"Administración de Clientes"} />
      <Button
        id="crear-cliente"
        variant="contained"
        size="small"
        onClick={handleOpen}
        sx={{ color: "#ffffff", backgroundColor: "#78D278" }}
      >
        <MdPersonAdd size={23} />
        Nuevo Cliente
      </Button>
      <Info>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {clientes.map((cliente) => (
            <Card
              obj={cliente}
              key={cliente.licencia}
              setClientes={setClientes}
              setTotalPages={setTotalPages}
              page={page}
            />
          ))}
        </Stack>
      </Info>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "5px",
            minWidth: "50%",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          <form onSubmit={newClient}>
            <FormCliente cliente={data} create={true} />
            <Button
              startIcon={<CloseIcon />}
              variant="outlined"
              color="error"
              onClick={handleClose}
              sx={{ marginTop: "2rem", marginBottom: "-2rem" }}
            >
              Cancelar
            </Button>
            <Button
              id="boton-guardar-nuevo-cliente"
              startIcon={<SaveIcon />}
              variant="outlined"
              color="primary"
              type="submit"
              sx={{
                marginTop: "2rem",
                marginLeft: "1rem",
                marginBottom: "-2rem",
              }}
            >
              Guardar Nuevo
            </Button>
          </form>
        </DialogTitle>
      </Dialog>
      <Pagination
        count={totalPages}
        page={page}
        color="success"
        onChange={nextPage}
        className="pag-inventario"
      />
    </BodyContent>
  );
}

/*
ver todos los vehiculos
crear nuevo vehiculo
*/

// const ContainerButton = styled.div`
//   display: flex;
//   color: #3df28b;
//   justify-content: start;
//   margin-top: 50px;
//   margin-bottom: 40px;
// `;

const Info = styled.div`
  display: flex;
  padding: 35px 25px;
  flex-direction: column;
  margin-top: 15px;

  border-top: 1px solid #cccccc;
`;

const BodyContent = styled.div`
  flex: 0.8;
  bottom: 0;
  padding-left: 75px;
  padding-right: 50px;
`;
