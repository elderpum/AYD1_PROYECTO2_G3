import React, { useCallback, useEffect, useState } from "react";
import "./Inventario.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useGeneralContext } from "../../contexts/generalContext";
import Swal from "sweetalert2";
// ui components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Autocomplete, Button, CardActionArea, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { ip } from "../../components/Ip";

export function Inventario(props) {
  const { setVehiculo } = useGeneralContext();
  const { setIndex } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selecCategoria, setSelecCategoria] = useState("");
  const [selecMarca, setSelecMarca] = useState("");
  const categoria = ["Sedan", "Bus", "Van", "Pickup", "Panel", "Truck"];
  const [marca, setMarca] = useState(["Toyota", "Honda", "Mazda", "Nissan"]);

  
  const [inventario, setInventario] = useState([
    {
      nombre: "Toyota Corolla",
      imagen:
        "https://hips.hearstapps.com/hmg-prod/images/toyotacorollagrsport20231-6466305f0bd9f.jpg?crop=0.7498666666666667xw:1xh;center,top&resize=1200:*",
      cuota: 100,
      disponibilidad: "available",
    },
  ]);

  // const ip = `http://localhost:3001`;

  useDocumentTitle("Inventario");
  
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

  const mostrarDevolucion = useCallback(
    (res) => {
      // devolución de vehiculo
      const fechaAux = new Date();
      const fechaActual = format(fechaAux, "yyyy-MM-dd");
      console.log("fechaactual: ", fechaActual);
      if (res.fechaDevolucion !== "" && res.fechaDevolucion === fechaActual) {
        Swal.fire({
          title: `FECHA LÍMITE: ${res.fechaDevolucion}`,
          icon: "info",
          html: mensajeDevolucion(res.vehiculo),
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonText: `¡DEVOLVER Y PAGAR!`,
          confirmButtonAriaLabel: "Thumbs up, great!",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("devolviendo");
            setIndex(5);
            setVehiculo(res.vehiculo);
          }
        });
      }
    },
    [setIndex, setVehiculo]
  );

  useEffect(() => {
    console.log("ipe: ", ip)
    const url = `${ip}/api/inventario/get`;
    const token = localStorage.getItem("auth");
    const data = { categoria: "", marca: "", page: 1 };
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
          console.log(res);
          verificacionToken(res);
          setMarca(res.data.marcas);
          setInventario(res.data.inventario);
          setTotalPages(res.data.totalPages);
          setUser(res.data.user);
          // devolución de vehiculo
          mostrarDevolucion(res);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }, [navigate, mostrarDevolucion, verificacionToken]);

  const mensajeDevolucion = (vehiculo) => {
    return `<div>
        <image src= ${vehiculo.imagen} alt="vehiculo" width="200" height="80" style="border-radius: 10px;" />
        <br />
        <h2>
          ${vehiculo.modelo} - ${vehiculo.marca}
        </h2>
        <h7>
          <b>Transmisión:</b> ${vehiculo.transmision}
        </h7>
        <br />
        <h7>
          <b>Asientos:</b> ${vehiculo.asientos}
        </h7>
        <br />
        <h7>
          <b>Combustible:</b> ${vehiculo.combustible}
        </h7>
        <br />
        <h7>
          <b>Categoría:</b> ${vehiculo.categoria}
        </h7>
        <br />
        <h7>
          <b>Cuota por día:</b> Q.${vehiculo.cuota}
        </h7>
        <br />
      </div>`;
  };

  const nextPage = (event, value) => {
    setPage(value);
    const url = `${ip}/api/inventario/get`;
    const token = localStorage.getItem("auth");
    const data = { categoria: selecCategoria, marca: selecMarca, page: value };
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
          console.log(res);
          if (res.message === "Invalid token") {
            alert("Su sesión ha expirado");
            navigate(`/`);
          }
          setInventario(res.data.inventario);
          setUser(res.data.user);

          // devolución de vehiculo
          const fechaAux = new Date();
          const fechaActual = format(fechaAux, "yyyy-MM-dd");
          console.log("fechaactual: ", fechaActual);

          // devolución de vehiculo
          mostrarDevolucion(res);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  };

  const filtrar = () => {
    console.log("filtrando");
    console.log(selecCategoria);
    console.log(selecMarca);

    const url = `${ip}/api/inventario/get`;
    const token = localStorage.getItem("auth");
    const data = { categoria: selecCategoria, marca: selecMarca, page: 1 };
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
          console.log(res);
          if (res.message === "Invalid token") {
            alert("Su sesión ha expirado");
            navigate(`/`);
          }
          setInventario(res.data.inventario);
          setTotalPages(res.data.totalPages);
          setUser(res.data.user);
          if (res.data.totalPages === 0) {
            alert("No se encontraron resultados con los filtros seleccionados");
          }

          // devolución de vehiculo
          const fechaAux = new Date();
          const fechaActual = format(fechaAux, "yyyy-MM-dd");
          console.log("fechaactual: ", fechaActual);

          // devolución de vehiculo
          mostrarDevolucion(res);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  };

  const alquiler = (vehiculo) => {
    console.log("alquilando ", user);
    if (user === 0 || user === 2) {
      setIndex(7);
      setVehiculo(vehiculo);
    } else {
      alert(
        "La funcion de alquilar solo esta disponible para clientes y administradores"
      );
    }
  };

  const gestionar = (vehiculo) => {
    console.log("gestionando costo ", user);
    if (user === 0 || user === 1) {
      setVehiculo(vehiculo);
      setIndex(6);
    } else {
      alert(
        "La funcion de gestionar el costo solo esta disponible para empleados y administradores"
      );
    }
  };

  return (
    <BodyContent>
      <main className="container-inventario">
        <div className="containerContent-inventario">
          <Stack
            spacing={2}
            justifyContent="space-around"
            className="stack-inventario"
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              className="grid-inventario"
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Grid item>
                  <Autocomplete
                    id="categorias-carros"
                    size="small"
                    sx={{ width: 300 }}
                    options={categoria}
                    onChange={(event, newValue) => setSelecCategoria(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Categoria" />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Autocomplete
                    id="marcas-carros"
                    size="small"
                    sx={{ width: 300 }}
                    options={marca}
                    onChange={(event, newValue) => setSelecMarca(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Marca" />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Button
                    id="boton-filtrar"
                    className="busc"
                    variant="text"
                    onClick={filtrar}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3031/3031293.png"
                      alt=""
                      width="30"
                      height="30"
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              {inventario.map((vehiculo, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card
                    key={index}
                    sx={{ maxWidth: 250, maxHeight: 210 }}
                    className="card-inventario"
                  >
                    <CardActionArea>
                      <CardMedia
                        className="imagen-inventario"
                        id={`alquilar-${index}`}
                        onClick={() => alquiler(vehiculo)}
                        component="img"
                        height="80"
                        image={vehiculo.imagen}
                        alt="..."
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h7" component="div">
                          {vehiculo.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {vehiculo.disponibilidad !== "available" ? (
                            vehiculo.disponibilidad
                          ) : (
                            <div>Q {vehiculo.cuota} por dia.</div>
                          )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user === 2 ? (
                            <div></div>
                          ) : (
                            <Button
                              id={`gestionar-${index}`}
                              variant="contained"
                              size="small"
                              color="info"
                              onClick={() => gestionar(vehiculo)}
                            >
                              Gestionar Costo
                            </Button>
                          )}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={totalPages}
              page={page}
              color="success"
              onChange={nextPage}
              className="pag-inventario"
            />
          </Stack>
        </div>
      </main>
    </BodyContent>
  );
}

const BodyContent = styled.div`
  flex: 0.8;
  bottom: 0;
`;
