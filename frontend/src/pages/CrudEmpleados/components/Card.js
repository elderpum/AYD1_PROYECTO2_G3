import React, {useState} from 'react';
import styled from 'styled-components';

import '../../../components/Titulo.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Button, IconButton, Dialog, DialogTitle } from '@mui/material';
import { FormEmpleado } from './FormEmpleados';
import { validateEmail } from '../utils/validations';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Swal = require('sweetalert2');

export function Card({ empleado }) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Eliminar, Está seguro?',
            text: "Esta acción es irreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Elimiando!',
                    'El empleado se eliminó exitosamente.',
                    'success'
                )
            }
        })
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
        if (!validateEmail(data.email)) {
            /* ALERTA ERROR */
            alert("corre invalido")
            return;
        }

        handleClose();
        /** petición update vehiculo */
    };
    
    return (
        <CardContainer>
            <h5> {empleado.email} </h5>
            <h6> Usuario: {empleado.userName} </h6>
            <ContainerText>
                <div style={{marginRight: 'auto'}}>
                    <h6> Nombre: {empleado.name} </h6>
                </div>
                <div>
                    <h6> Apellido: {empleado.lastName} </h6>
                </div>
            </ContainerText>
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
                PaperProps={{ style: { backgroundColor: 'white', padding: '40px', borderRadius: '5px', minWidth: '50%' } }}
            >
                <DialogTitle style={{ textAlign: 'center' }}>
                    <form onSubmit={handleSave}>
                        <FormEmpleado
                            tipo={'edit'} 
                            empleado={empleado}
                        />
                        <Button
                            startIcon={<CloseIcon />}
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                            sx={{ marginTop: '2rem', marginLeft: '1rem', marginBottom: '-2rem' }}
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

const ContainerText = styled.div`
display: flex;
`

const ButtonsContainer = styled.div`
display: flex;
`

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

`