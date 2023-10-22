import React, { useState, useEffect } from "react";
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
  const [clientes, setClientes] = useState([]);
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
  };

  const ip = "http://localhost:3001";
  const cliente = {
    nombre: "Lionel",
    apellido: "Messi",
    nacimiento: "1987-06-24",
    licencia: 1111111111111,
    direccion: "Maimi, Florida, USA",
    email: "lionelmessi@goat.com",
    telefono: 12345678,
    user: "messi10",
  };

  useEffect(() => {
    const url = `${ip}/api/admin/clients/get`;
    const token = localStorage.getItem("auth");
    const fetchData = async () => {
      fetch(url, {
        method: "GET",
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
          if (res.message === "Invalid token") {
            alert("Su sesión ha expirado");
            navigate(`/`);
          }
          setClientes(res.data.clients);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }, [navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const newClient = (e) => {
    e.preventDefault();
    const url = `${ip}/api/admin/clients/create`;
    const token = localStorage.getItem("auth");
    console.log(data);
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("res: ",res);
          if (res.message === 'Invalid token') {
            alert("Su sesión ha expirado");
            navigate(`/`);
          }
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
    /** petición update vehiculo */
  };

  // const nextPage = (event, value) => {
  //   setPage(value);
  //   const url = `${ip}/api/inventario/get`;
  //   const token = localStorage.getItem("auth");
  //   const data = { categoria: selecCategoria, marca: selecMarca, page: value };
  //   console.log(data);
  //   const fetchData = async () => {
  //     fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `${token}`,
  //       },
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         if (res.message === "Invalid token") {
  //           console.log("entre");
  //           navigate(`/`);
  //         }
  //         setInventario(res.data.inventario);
  //         setUser(res.data.user);
  //       })
  //       .catch((error) => console.error("Error:", error));
  //   };
  //   fetchData();
  // };

  return (
    <BodyContent>
      <Titulo titulo={"Administración de Clientes"} />
      <Button
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
          {/*vehiculos.map((vehiculo) => { return (
                    <Card obj={vehiculo} key={vehiculo.licensePlate}/>
                )})*/}
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
          <Card obj={cliente} key={cliente.licencia} />
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
            <FormCliente cliente={data} />
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
        // onChange={nextPage}
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
