import React, { useEffect, useState } from "react";
import "./Inventario.css";
import { useNavigate } from "react-router-dom";
// ui components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Autocomplete, Button, CardActionArea, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Inventario() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoria, setCategoria] = useState([
    "Sedan",
    "Bus",
    "Camioneta",
    "Pickup",
    "Panel",
    "Camion",
  ]);
  const [selecCategoria, setSelecCategoria] = useState("");
  const [marca, setMarca] = useState([]);
  const [selecMarca, setSelecMarca] = useState("");
  const [inventario, setInventario] = useState([]);

  const ip = "https://zd8mw8xl-3001.use.devtunnels.ms"//`http://localhost:3001`;

  useEffect(() => {
    const url = `${ip}/api/inventario/get`;
    const token = localStorage.getItem("auth");
    const data = { categoria: "", marca: "", page: 1};
    console.log(data)
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
          setMarca(res.data.marcas);
          setInventario(res.data.inventario);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }, [ip]);

  const nextPage = (event, value) => {
    setPage(value);
    const url = `${ip}/api/inventario/get`;
    const token = localStorage.getItem("auth");
    const data = { categoria: selecCategoria, marca: selecMarca, page: value };
    console.log(data)
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
          setInventario(res.data.inventario);
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
    console.log(data)
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
          setInventario(res.data.inventario);
          setTotalPages(res.data.totalPages);
          if (res.data.totalPages === 0) {
            alert("No se encontraron resultados con los filtros seleccionados");
          }
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  };

  return (
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
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item>
                <Autocomplete
                  id="free-solo-demo"
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
                  id="free-solo-demo"
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
                <Button className="busc" variant="text" onClick={filtrar}>
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
            {inventario.map((vehiculo) => (
              <Grid item xs={2} sm={4} md={4}>
                <Card
                  sx={{ maxWidth: 250, maxHeight: 170 }}
                  onClick={navigate("/alquiler/vehiculo.id")}
                >
                  <CardActionArea>
                    <CardMedia
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
                        Q {vehiculo.cuota} por dia.
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        { vehiculo.disponibilidad ? vehiculo.disponibilidad : "" }
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
  );
}
