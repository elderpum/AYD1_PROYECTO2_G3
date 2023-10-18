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
import styled from 'styled-components';

export function Inventario(props) {
  const { setIndex } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const categoria = ["Sedan", "Bus", "Van", "Pickup", "Panel", "Truck"];
  const [selecCategoria, setSelecCategoria] = useState("");
  const [marca, setMarca] = useState([]);
  const [selecMarca, setSelecMarca] = useState("");
  const [inventario, setInventario] = useState([]);

  const ip = `http://localhost:3001`;

  useEffect(() => {
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
          if (res.message === 'Invalid token') {
            console.log("entre")
            navigate(`/`);
          }
          setMarca(res.data.marcas);
          setInventario(res.data.inventario);
          setTotalPages(res.data.totalPages);
          setUser(res.data.user);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }, [ip, navigate]);

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
          if (res.message === 'Invalid token') {
            console.log("entre")
            navigate(`/`);
          }
          setInventario(res.data.inventario);
          setUser(res.data.user);
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
          if (res.message === 'Invalid token') {
            console.log("entre")
            navigate(`/`);
          }
          setInventario(res.data.inventario);
          setTotalPages(res.data.totalPages);
          setUser(res.data.user);
          if (res.data.totalPages === 0) {
            alert("No se encontraron resultados con los filtros seleccionados");
          }
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  };

  const alquiler = () => {
    console.log("alquilando ", user);
    if (user === 0 || user === 2) {
      setIndex(7);
    } else {
      alert(
        "La funcion de alquilar solo esta disponible para clientes y administradores"
      );
    }
  };

  const gestionar = () => {
    console.log("gestionando costo ", user);
    if (user === 0 || user === 1) {
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
                <Card sx={{ maxWidth: 250, maxHeight: 210 }} className="card-inventario">
                  <CardActionArea>
                    <CardMedia
                      onClick={alquiler}
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
                            variant="contained"
                            size="small"
                            color="info"
                            onClick={gestionar}
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

            {/* <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ maxWidth: 250, maxHeight: 180 }}>
                <CardActionArea sx={{ padding: 0 }}>
                  <CardMedia
                    onClick={alquiler}
                    component="img"
                    height="80"
                    image="https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/Blog/2020/muscle-cars/dodge-charger-rt-1970-el-favorito-de-toretto/desktop/dodge-noticias-dodge-charger-1970-el-auto-favorito-de-toretto-cuerpo-1-dk.jpg.img.1440.jpg"
                    alt="..."
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      Carro de Toretto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ocupado - Gerson Quiroa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user === 2 ? (
                        <div></div>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={gestionar}
                        >
                          Gestionar Costo
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid> */}
            
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
`
