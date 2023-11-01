import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../components/Titulo.css';

import { Button, Stack, Dialog, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Titulo } from "../../components/Titulo";
import { Card } from './components/Card';
import { FormEmpleado } from './components/FormEmpleados';
import { validateEmail } from './utils/validations';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

export function CrudEmpleados() {
    const navigate = useNavigate();
    const ip = "http://localhost:3001"; //"https://zd8mw8xl-3001.use.devtunnels.ms"
    const [open, setOpen] = useState(false);
    const [empleados, setEmpleados] = useState([]);

    const empleado = {
        email: "oiram@gmail.com",
        name: "Oiram",
        lastName: "Narom",
        address: "mi ksa",
        phone: "39660266",
        userName: "oiramxd",
        passw: "1234"
    }

    useEffect(() => {
        /*
        const url = `${ip}/api/vehiculo/obtenerVehiculos`;
        async function getInfo() {
            fetch(`${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((res) => {
                console.log(res);
                setVehiculos(res);
            });
        }
        getInfo();
        */
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();

        var data = {
            email: e.target[0].value,
            name: e.target[1].value,
            lastName: e.target[2].value,
            address: e.target[3].value,
            phone: e.target[4].value,
            userName: e.target[5].value,
            passw: e.target[6].value
        };

        console.log(data)

        /* validaciones de datos */
        if (!validateEmail(data.email)) {
            /* ALERTA ERROR */
            alert("corre invalido")
            return;
        }

        handleClose();
        /** petición update vehiculo */
    };

    /* reder de vehiculos */
    /*var lista_vehiculos = [];
    console.log(vehiculos.length)
    for (let i=0; i<vehiculos.length; i++) {
        lista_vehiculos.push(

        );
    }*/

    return (
        <BodyContent>
            <Titulo titulo={"Administración De Empleados"} />
            <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                sx={{ color: '#ffffff', backgroundColor: '#3DF28B' }}
            >
                Nuevo Empleado
            </Button>
            <Info>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {/*vehiculos.map((vehiculo) => { return (
                        <Card obj={vehiculo} key={vehiculo.licensePlate}/>
                    )})*/}
                    <Card empleado={empleado}/>
                </Stack>
            </Info>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{ style: { backgroundColor: 'white', padding: '40px', borderRadius: '5px', minWidth: '50%' } }}
            >
                <DialogTitle style={{ textAlign: 'center' }}>
                    <form onSubmit={handleSave}>
                        <FormEmpleado
                            tipo={'create'}
                            empleado={null}
                        />
                        <Button
                            startIcon={<CloseIcon />}
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                            sx={{ marginTop: '2rem', marginBottom: '-2rem' }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            color="primary"
                            type='submit'
                            sx={{ marginTop: '2rem', marginLeft: '1rem', marginBottom: '-2rem' }}
                        >
                            Guardar Nuevo
                        </Button>
                    </form>
                </DialogTitle>
            </Dialog>
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

border-top: 1px solid #cccccc;
`

const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
`
