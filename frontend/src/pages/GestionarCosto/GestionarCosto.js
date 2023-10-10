import React from 'react';
import styled from 'styled-components';
import '../../components/Titulo.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Button, Input, InputLabel, FormControl, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

export function GestionarCosto() {
    const navigate = useNavigate();

    const regresar = () => {
        //navigate('/playlists');
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
                    <Button variant="contained" color="salmon" onClick={regresar} style={{marginRight: 20}}>
                        <BsArrowLeft style={{color: "#3DF28B", fontSize: "1.5em" }}/>
                    </Button>
                </ThemeProvider>
                <h2> {"Gestionar Cuota"} </h2>
            </ContainerButton>
            <Info>
                <TituloInfo> MODELO - Mercedez Benz </TituloInfo>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={0.5}>
                            <Grid item xs={4}>
                                foto del vehiculo
                            </Grid>
                            <Grid item xs={4}>
                                <h6 className='align_l'> Transmisión: {'evento.fecha'}</h6>  
                                <h6 className='align_l'> Asientos: {'evento.duracion'} </h6>
                                <h6 className='align_l'> Combustible: {'evento.ubicacion'} </h6>
                                <h6 className='align_l'> Estado: {'evento.formato'} </h6>
                                <h6 className='align_l'> Categoría: {'evento.costo'} </h6>
                                <h6 className='align_l'> Cuota por día Actual: Q 20.00</h6>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-amount">Cuota de Alquiler</InputLabel>
                                    <Input 
                                        id="standard-adornment-amount"
                                        startAdornment={<InputAdornment position="start">Q</InputAdornment>}
                                    />
                                </FormControl>
                                <p></p>
                                <Button variant="outlined" size="small" color="success">
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
    modifcar cuota
    validar valor (numero)
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

const Container = styled.div`
display: flex;
`

const Container2 = styled.div`
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
`