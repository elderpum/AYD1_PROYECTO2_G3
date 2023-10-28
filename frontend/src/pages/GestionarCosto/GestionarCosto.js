
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../components/Titulo.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Button, Input, InputLabel, FormControl, InputAdornment } from '@mui/material';
import { BsArrowLeft } from "react-icons/bs";
import { useGeneralContext } from '../../contexts/generalContext';

const Swal = require('sweetalert2')

export function GestionarCosto({ setIndex }) {
    const { vehiculo } = useGeneralContext();
    const [vehiculoGestion, setVehiculoGestion] = useState({})
    const [costo, setCosto] = useState(0.00)
    const ip = `http://localhost:3001`;

    useEffect(() => {
        const token = localStorage.getItem("auth");
        const data = { licensePlate: vehiculo.id };
        console.log(vehiculo)
        /* Peticion para obtener un vehiculo utilizando su placa */
        const fetchData = async () => {
            fetch(`${ip}/api/vehiculo/detalleVehiculo`, {
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
                    console.log(res)
                    setVehiculoGestion(res.vehicle[0])
                    setCosto(res.vehicle[0].rentalFee)
                })
                .catch((error) => console.error("Error:", error));
        };
        fetchData();
    }, [ip, vehiculo])

    const regresar = () => {
        setIndex(1);
    };

    const modificar = () => {
        console.log(costo)
        if (!(/^-?\d*\.?\d+$/.test(costo))) {
            alert("Cuota inválida para el vehículo")
            return;
        }

        const data = {
            "licensePlate": vehiculoGestion.licensePlate,
            "newRentalFee": costo
        }

        const token = localStorage.getItem("auth");
        const fetchData = async () => {
            fetch(`${ip}/api/vehiculo/actualizarTarifa`, {
                method: "PUT",
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
                    console.log(res)
                    if (res.err) {
                        Swal.fire({
                            title: 'Error!',
                            text: res.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    } else {
                        Swal.fire({
                            title: 'Aceptada!',
                            text: 'El costo se modificó correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
                .catch((error) => console.error("Error:", error));
        };
        fetchData();
    };

    let theme = createTheme({});
    theme = createTheme(theme, {
        // Custom colors created with augmentColor go here
        palette: {
            salmon: theme.palette.augmentColor({
                color: {
                    main: '#FFFFFF',
                },
                name: '#3DF28B',
            }),
        },
    });

    return (
        <BodyContent>
            <ContainerButton>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="salmon" onClick={regresar} style={{ marginRight: 20 }}>
                        <BsArrowLeft style={{ color: "#3DF28B", fontSize: "1.5em" }} />
                    </Button>
                </ThemeProvider>
                <h2> {"Gestionar Costo"} </h2>
            </ContainerButton>
            <Info>
                <TituloInfo>  Mercedez Benz - {vehiculoGestion.model} </TituloInfo>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={0.5}>
                            <Grid item xs={4}>
                                foto del vehiculo
                            </Grid>
                            <Grid item xs={4}>
                                <h6 className='align_l'> Placa: {vehiculoGestion.licensePlate} </h6>
                                <h6 className='align_l'> Transmisión: {vehiculoGestion.transmission} </h6>
                                <h6 className='align_l'> Asientos: {vehiculoGestion.seatings} </h6>
                                <h6 className='align_l'> Combustible: {vehiculoGestion.fuelType} </h6>
                                <h6 className='align_l'> Estado: {vehiculoGestion.state} </h6>
                                <h6 className='align_l'> Categoría: {vehiculoGestion.category} </h6>
                                <h6 className='align_l'> Cuota por día Actual: Q {vehiculoGestion.rentalFee} </h6>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-amount">Cuota de Alquiler</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        startAdornment={<InputAdornment position="start">Q</InputAdornment>}
                                        value={costo}
                                        onChange={(evt) => setCosto(evt.target.value)}
                                    />
                                </FormControl>
                                <p></p>
                                <Button variant="outlined" size="small" sx={{ color: '#3DF28B', borderColor: '#3DF28B' }} onClick={modificar}>
                                    Modificar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Info>
        </BodyContent>
    )
}
/*
    MOSTRAR MARCA
    MOSTRAR FOTO
*/

const TituloInfo = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@600&display=swap');

display: flex;
font-size: 22px;
justify-content: space-between;
font-family: 'Jost', sans-serif;
margin-bottom: 25px;
`

const ContainerButton = styled.div`
display: flex;
color: #3DF28B;
justify-content: start;
margin-top: 50px;
margin-bottom: 40px;
`

const Info = styled.div`
display: flex;
padding: 35px 25px;
flex-direction: column;

border-radius: 5px 5px 5px 5px;
-webkit-border-radius: 5px 5px 5px 5px;
-moz-border-radius: 5px 5px 5px 5px;
border: 1px solid #cccccc;
`

const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
`
