import React, {useState} from 'react';
import styled from 'styled-components';

import '../../../components/Titulo.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import { Button, IconButton, Dialog, DialogTitle } from '@mui/material';
import { FormVehiculo } from './FormVehiculo';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Chip from '@mui/material/Chip';

const Swal = require('sweetalert2')

export function Card({ obj }) {
    const ip = "http://localhost:3001"; //"https://zd8mw8xl-3001.use.devtunnels.ms"

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
                /* peticion para eliminar */
                const url = `${ip}/api/vehiculo/eliminarVehiculo`;
                async function getInfo() {
                    fetch(`${url}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            licensePlate: obj.licensePlate 
                        })
                    })
                    .then((res) => res.json())
                    .catch((error) => console.error("Error:", error))
                    .then((res) => {
                        console.log(res);
                        if (res.error) {
                            Swal.fire(
                                'Error!',
                                'Hubo un error eliminando el vehiculo.',
                                'error'
                            )
                        } else {
                            Swal.fire(
                                'Elimiando!',
                                'El vehículo se eliminó exitosamente.',
                                'success'
                            )
                        }
                    });
                }
                getInfo();
            }
        })
    };

    const handleAddImage = async () => {
        setOpen(false);
        const { value: file } = await Swal.fire({
            title: 'Selecciona un Imagen',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })
          
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: 'Your uploaded picture',
                    imageUrl: e.target.result,
                    imageAlt: 'The uploaded picture'
                })
            }
            reader.readAsDataURL(file);
        }
        setOpen(true);
    };

    const handleDeleteImage = () => { 
    };

    const handleSave = (e) => {
        e.preventDefault();

        var data = {
            brand: e.target[0].value,
            licensePlate: e.target[2].value,
            model: e.target[4].value,
            transmission: e.target[6].value,
            seatings: e.target[8].value,
            fuelType: e.target[10].value,
            category: e.target[12].value,
            rentalFee: e.target[14].value,
            state: e.target[16].value,
            addImages: [],
            deleteImages: []
        };
        console.log(data)
        
        if (!(/^[0-9]{0,4}$/.test(data.model) && data.model <= 2023)) {
            alert("Modelo inválido para el vehículo")
            return;
        }

        if (!(/^-?\d*\.?\d+$/.test(data.rentalFee))) {
            alert("Cuota inválida para el vehículo")
            return;
        }
        
        handleClose();
        /** petición update vehiculo */
    };

    
    var imagenes = [];
    for (let i=0;i<obj.images.length;i++) {
        imagenes.push(
            <div>
                <img src={obj.images[i].link} alt='imagen' key={obj.images[i].idImage}/>
            </div>
        );
    }
    

    return (
        <CardContainer>
            <Carousel showArrows={true} showThumbs={false} width={"290px"} infiniteLoop={true}>
                {imagenes}
            </Carousel>
            <h5 style={{marginTop: '20px'}}> {obj.name} {obj.serie} </h5>
            <h6> Placa: {obj.licensePlate} </h6>
            <ContainerText>
                <div style={{marginRight: 'auto'}}>
                    <h6> Modelo: <Chip label={obj.model} color="primary"  size="small" /> </h6>
                    <h6> Cuota: <Chip label={"Q " + obj.rentalFee} color="success" size="small" /> </h6>
                    <h6> Estado: <Chip label={obj.state} color="primary"  size="small" /> </h6>
                    <h6> Categoria: <Chip label={obj.category} color="primary"  size="small" /> </h6>
                    <h6> Transmisión: <Chip label={obj.transmission} color="primary"  size="small" /> </h6>
                    <h6> Asientos: <Chip label={obj.seatings} color="primary"  size="small" /> </h6>
                    <h6> Combustible: <Chip label={obj.fuelType} color="primary"  size="small" /> </h6>
                    <h6> Categoria: <Chip label={obj.category} color="primary"  size="small" /> </h6>
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
                            startIcon={<AddPhotoAlternateIcon />}
                            variant="outlined"
                            color="success"
                            onClick={handleAddImage}
                            sx={{ marginTop: '2rem', marginBottom: '-2rem' }}
                        >
                            Agregar Imagen
                        </Button>
                        <Button
                            startIcon={<ImageNotSupportedIcon />}
                            variant="outlined"
                            color="secondary"
                            onClick={handleDeleteImage}
                            sx={{ marginTop: '2rem', marginLeft: '1rem', marginBottom: '-2rem' }}
                        >
                            Eliminar Imagenes
                        </Button>
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
margin-bottom: 0;
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