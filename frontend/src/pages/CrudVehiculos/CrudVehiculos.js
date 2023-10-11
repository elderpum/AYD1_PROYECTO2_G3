import React, {useState} from 'react';
import styled from 'styled-components';
import '../../components/Titulo.css';

import { Grid, Button, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Titulo } from "../../components/Titulo";
import { Card } from './components/Card';

export function CrudVehiculos() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const vehiculo = {
        modelo: 2018,
        marca: "BMW",
        transmision: "Manual",
        combustible: "Super",
        cuota: 100.00,
        fotos: [
            "https://loscoches.com/wp-content/uploads/2021/04/carros-deportivos-potencia.jpg", 
            "https://i.ytimg.com/vi/zRlEDI01RFU/maxresdefault.jpg", 
            "https://www.eltiempo.com/files/article_multimedia/uploads/2019/10/15/5da64f9a11291.jpeg"
        ],
        estado: 0,
        categoria: "Sedan"
    };
    const navigate = useNavigate();

    /* useEffect -> getVehiculo */
    
    const regresar = () => {
        //navigate('/playlists');
    };

    const configFechaInicio = (fecha) => {
        try {
            const mont = (parseInt(fecha.$M) + 1).toString();
            var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
            setFechaInicio(fecha_);
        } catch (error) {
            setFechaInicio('');
        }
    };
    
    const configFechaFinal = (fecha) => {
        try {
            const mont = (parseInt(fecha.$M) + 1).toString();
            var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
            setFechaFinal(fecha_);
        } catch (error) {
            setFechaFinal('');
        }
    };


    return (
        <BodyContent>
            <Titulo titulo={"Administración De Vehículos"}/>
            <Button variant="contained" size="small" sx={{ color: '#ffffff', backgroundColor: '#3DF28B' }}>
                Nuevo Vehículo
            </Button>
            <Info>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Card obj={vehiculo}/>
                <Card obj={vehiculo}/>
                <Card obj={vehiculo}/>
                <Card obj={vehiculo}/>
            </Stack>
            </Info>
        </BodyContent>
    )
}

/*
ver todos los vehiculos
crear nuevo vehiculo
*/

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
margin-top: 15px;

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
