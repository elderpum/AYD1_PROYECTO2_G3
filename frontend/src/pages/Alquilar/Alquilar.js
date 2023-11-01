import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useDocumentTitle from '../hooks/useDocumentTitle';
import '../../components/Titulo.css';

import { Grid, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BsArrowLeft } from "react-icons/bs";
import { useGeneralContext } from '../../contexts/generalContext';

const dayjs = require('dayjs');
const Swal = require('sweetalert2')

export function Alquilar({ setIndex }) {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [vehiculoAlquilar, setVehiculoAlquilar] = useState({})
    const [total, setTotal] = useState(0)
    const { vehiculo } = useGeneralContext();
    const ip = `http://localhost:3001`;

    useDocumentTitle("Alquilar")

    useEffect(() => {
        console.log(vehiculo)
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
                    setVehiculoAlquilar(res.vehicle[0])
                })
                .catch((error) => console.error("Error:", error));
        };
        fetchData();
        /* Setear fecha inicial dia actual */
        setFechaInicio(new Date().toDateString());
    }, [ip, vehiculo])

    const Regresar = () => {
        setIndex(1);
    };

    const handleTotal = () => {
        const fechaInicioJS = dayjs(fechaInicio);
        const fechaFinalJS = dayjs(fechaFinal);
        const diferenciaEnDias = fechaFinalJS.diff(fechaInicioJS, 'day');
        if (diferenciaEnDias > 0) {
            setTotal(vehiculoAlquilar.rentalFee * diferenciaEnDias);
        } else if (diferenciaEnDias === 0) {
            setTotal(vehiculoAlquilar.rentalFee);
        } else {
            setTotal(0);
        }
    }

    const configFechaInicio = (fecha) => {
        try {
            handleTotal();
            const mont = (parseInt(fecha.$M) + 1).toString();
            var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
            setFechaInicio(fecha_);
        } catch (error) {
            setFechaInicio('');
        }

    };

    const configFechaFinal = (fecha) => {
        try {
            setFechaFinal('');
            console.log(fechaFinal)
            const mont = (parseInt(fecha.$M) + 1).toString();
            var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
            setFechaFinal(fecha_);
            handleTotal();
        } catch (error) {
            setFechaFinal('');
        }
    };

    const solicitar = () => {
        handleTotal();
        const fechaActual = dayjs();
        const fechaInicioJS = dayjs(fechaInicio);
        const fechaFinalJS = dayjs(fechaFinal);

        if (fechaInicioJS < fechaActual) {
            Swal.fire({
                title: 'Error!',
                text: 'Fecha incial inválida',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

        if (fechaFinalJS < fechaInicioJS) {
            Swal.fire({
                title: 'Error!',
                text: 'Fecha final inválida',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }


        const usr_email = localStorage.getItem("email");
        const data = {
            "userEmail": usr_email,
            "licensePlate": vehiculoAlquilar.licensePlate,
            "rentalStart": fechaInicio,
            "rentalEnd": fechaFinal,
            "rentalFee": total
        }
        console.log(data)

        const token = localStorage.getItem("auth");
        const fetchData = async () => {
            Swal.fire({
                title: 'Está seguro?',
                text: `Desea alquilar este vehiculo por: Q ${total}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${ip}/api/vehiculo/rentarVehiculo`, {
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
                            if (res.err) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Hubo un error rentando el carro',
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                })
                            } else {
                                Swal.fire({
                                    title: 'Aceptada!',
                                    text: 'La solicitud fue enviada correctamente.',
                                    icon: 'success',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        })
                        .catch((error) => console.error("Error:", error));
                }
            })
        };
        fetchData();
        setIndex(1);
    }

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
                    <Button id='btnAtras' variant="contained" color="salmon" onClick={Regresar} style={{ marginRight: 20 }}>
                        <BsArrowLeft style={{ color: "#3DF28B", fontSize: "1.5em" }} />
                    </Button>
                </ThemeProvider>
                <h2 className='heads'> {"Alquilar Vehiculo"} </h2>
            </ContainerButton>
            <Info>
                <TituloInfo id='tituloInfo'>{vehiculo.nombre}</TituloInfo>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={0.5}>
                            <Grid item xs={4}>
                                foto del vehiculo
                            </Grid>
                            <Grid item xs={4}>
                                <h6 className='align_l'> Placa: {vehiculoAlquilar.licensePlate} </h6>
                                <h6 className='align_l'> Transmisión: {vehiculoAlquilar.transmission} </h6>
                                <h6 className='align_l'> Asientos: {vehiculoAlquilar.seatings} </h6>
                                <h6 className='align_l'> Combustible: {vehiculoAlquilar.fuelType} </h6>
                                <h6 className='align_l'> Estado: {vehiculoAlquilar.state} </h6>
                                <h6 className='align_l'> Categoría: {vehiculoAlquilar.category} </h6>
                                <h6 className='align_l'> Cuota por día Actual: Q {vehiculoAlquilar.rentalFee} </h6>
                            </Grid>
                            <Grid item xs={4}>
                                <p className='align_l'>  Cuota de Alquiler: <h4 className='align_l'> Q {total}</h4> </p>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Inicio"
                                        onChange={(newValue) => configFechaInicio(newValue)}
                                        views={["year", "month", "day"]}
                                        format="YYYY-MM-DD"
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                                <p></p>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Final"
                                        onChange={(newValue) => configFechaFinal(newValue)}
                                        views={["year", "month", "day"]}
                                        format="YYYY-MM-DD"
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                                <p></p>
                                <Button id='btnAlquilar' variant="outlined" size="small" sx={{ color: '#3DF28B', borderColor: '#3DF28B' }} onClick={solicitar}>
                                    Alquilar
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
    MOSTRAR IMAGEN
*/

const ContainerButton = styled.div`
display: flex;
color: #3DF28B;
justify-content: start;
margin-top: 50px;
margin-bottom: 40px;
`

const TituloInfo = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@600&display=swap');

display: flex;
font-size: 22px;
justify-content: space-between;
font-family: 'Jost', sans-serif;
margin-bottom: 25px;
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
