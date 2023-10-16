import React, {useState} from 'react';
import styled from 'styled-components';

import '../../../components/Titulo.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import { Grid, Button, Stack, IconButton, Dialog, DialogTitle } from '@mui/material';
import { FormVehiculo } from './FormVehiculo';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Swal = require('sweetalert2')

export function Card({ obj }) {
    const [open, setOpen] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [newImageFile, setNewImageFile] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setNewImage(null);
        setNewImageFile(null);
    };

    const handleOpen = () => {
        setOpen(true);
        setNewImage(null);
        setNewImageFile(null);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        console.log(selectedImage);
        if (selectedImage) {
            setNewImage(URL.createObjectURL(selectedImage));
            if (selectedImage) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImageFile(reader.result.split(',')[1].trim());
                };
                reader.readAsDataURL(selectedImage);
            }
        }
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
                    'El vehículo se eliminó exitosamente.',
                    'success'
                )
            }
        })
    };

    const handleSave = (e) => {
        e.preventDefault();
                
        /**
            ● Modelo
            ● Marca
            ● Transmisión
            ● Cantidad de asientos
            ● Tipo de combustible (Gasolina o diesel o eléctrico)
            ● Categoría (Sedan, Bus, Camioneta, Pickup, panel, camion)
            ● Cuota de alquiler por día.
            ● Estado, por defecto este estará como disponible.
        */
        var data = {
            marca: e.target[0].value,
            modelo: e.target[1].value,
            transmision: e.target[2].value,
            asientos: e.target[3].value,
            combustible: e.target[4].value,
            categoria: e.target[5].value,
            cuota: e.target[6].value,
            estado: e.target[7].value,
            imagenes: [newImageFile]
        };

        console.log(data)

        handleClose();
        /** petición update vehiculo */
    };
    
    var imagenes = [];
    for (let i=0;i<obj.photos.length;i++) {
        imagenes.push(
            <div>
                <img src={obj.photos[i]} alt='imagen'/>
            </div>
        );
    }
    
    return (
        <CardContainer>
            <Carousel showArrows={true} showThumbs={false} width={"290px"} infiniteLoop={true}>
                {imagenes}
            </Carousel>
            <h5> {obj.brand} </h5>
            <h6> Placa: {obj.licensePlate} </h6>
            <ContainerText>
                <div style={{marginRight: 'auto'}}>
                    <h6> Modelo: {obj.model} </h6>
                    <h6> Cuota: Q {obj.rentalFee} </h6>
                </div>
                <div>
                    <h6> Estado: {obj.state} </h6>
                    <h6> Categoria: {obj.category} </h6>
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
                        <FormVehiculo
                            tipo={'edit'} 
                            vehiculo={obj}
                            newImage={newImage}
                            handleImageChange={handleImageChange}
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