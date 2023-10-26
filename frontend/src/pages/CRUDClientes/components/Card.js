import React, { useState } from "react";
import styled from "styled-components";

import "../../../components/Titulo.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Button, IconButton, Dialog, DialogTitle } from "@mui/material";
import { FormCliente } from "./FormCliente";

import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Swal = require("sweetalert2");

export function Card({ obj, key, setClientes, setTotalPages, page }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ip = "http://localhost:3001";

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const verificacionToken = (res) => {
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
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Eliminar, ¿Está seguro?",
      text: "¡Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setClientes([]);
        const data = { email: obj.email, page: page };
        const url = `${ip}/api/admin/client/delete`;
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
              console.log("res: ", res);
              verificacionToken(res);
              setClientes(res.clients);
              setTotalPages(res.totalPages);
              if (res.ok) {
                Swal.fire(
                  "¡Eliminado!",
                  "El cliente se ha eliminado exitosamente.",
                  "success"
                );
              } else {
                Swal.fire(
                  "¡Error!",
                  "No se ha podido eliminar el cliente, intente luego.",
                  "error"
                );
              }
            })
            .catch((error) => console.error("Error:", error));
        };
        fetchData();
      }
    });
  };

  const updateClient = (e) => {
    e.preventDefault();
    setClientes([]);
    const data = obj;
    const url = `${ip}/api/admin/client/update`;
    const token = localStorage.getItem("auth");
    console.log(data);
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({client: data, page: page}),
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
              "¡Cliente actualizado!",
              "La información del cliente se ha actualizado de forma exitosa.",
              "success"
            );
          } else {
            Swal.fire(
              "¡Error!",
              "La información del cliente no se ha podido actualizar, intente de nuevo.",
              "error"
            );
          }
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
    handleClose();
  };

  return (
    <CardContainer>
      <h5>
        <b>
          {obj.nombre} {obj.apellido}
        </b>
      </h5>
      <h7>
        {" "}
        <b>Usuario:</b> {obj.user}{" "}
      </h7>
      <h7>
        {" "}
        <b>Nacimiento:</b> {obj.nacimiento}{" "}
      </h7>
      <h7>
        {" "}
        <b>Licencia:</b> {obj.licencia}{" "}
      </h7>
      <h7>
        {" "}
        <b>Dirección:</b> {obj.direccion}{" "}
      </h7>
      <h7>
        {" "}
        <b>Correo:</b> {obj.email}{" "}
      </h7>
      <h7>
        {" "}
        <b>Telefono:</b> {obj.telefono}{" "}
      </h7>
      <ButtonsContainer>
        <IconButton aria-label="edit" color="primary" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ButtonsContainer>
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
          <form onSubmit={updateClient}>
            <FormCliente cliente={obj} create={false} />
            <Button
              startIcon={<CloseIcon />}
              variant="outlined"
              color="error"
              onClick={handleClose}
              sx={{
                marginTop: "2rem",
                marginLeft: "1rem",
                marginBottom: "-2rem",
              }}
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
              Editar
            </Button>
          </form>
        </DialogTitle>
      </Dialog>
    </CardContainer>
  );
}

/*
Utilizar Dialog para los formularios de edicion y eliminación
*/

// const ContainerText = styled.div`
//   display: flex;
// `;

const ButtonsContainer = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  display: flex;
  padding: 30px 15px 20px 20px;
  flex-direction: column;
  margin-top: 15px;
  min-width: 300px;

  border-radius: 5px 5px 5px 5px;
  -webkit-border-radius: 5px 5px 5px 5px;
  -moz-border-radius: 5px 5px 5px 5px;
  border: 1px solid #cccccc;

  & img {
    width: 290px;
    max-width: 290px;
  }
`;
