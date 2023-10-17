import React from 'react';
import styled from 'styled-components';

import { 
    Stack, TextField
} from '@mui/material';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { ImageInput } from './ImageInput';

export function FormVehiculo({ tipo, vehiculo, newImage, handleImageChange }) {
    
    /* validación tipo de operacion */
    if (vehiculo == null) {
        vehiculo = {
            "licensePlate": "",
            "brand": "",
            "model": "",
            "Series_idSeries": "",
            "transmission": "",
            "seatings": "",
            "fuelType": "",
            "rentalFee": "",
            "state": "",
            "category": "",
            "images": []
        }
    }

    /* generación de imagenes para la edición */
    /*
    var imagenes = [];
    if (tipo === 'edit') {
        for (let i = 0; i < vehiculo.images.length; i++) {
            imagenes.push(
                <ImageInput image={vehiculo.images[i].img} handleImageChange={handleImageChange} key={vehiculo.images[i].id}/>
            );
        }
    }*/

    return (
        <>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <TextField
                    required
                    id="outlined-required"
                    label="Marca"
                    size="small"
                    sx={{ width: "50%"}}
                    defaultValue={vehiculo.brand}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Placa"
                    size="small"
                    sx={{ width: "15%"}}
                    defaultValue={vehiculo.licensePlate}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Modelo"
                    size="small"
                    sx={{ width: "15%"}}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    defaultValue={vehiculo.model}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Transmisión"
                    size="small"
                    sx={{ width: "25%"}}
                    defaultValue={vehiculo.transmission}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Cantidad de asientos"
                    size="small"
                    sx={{ width: "25%"}}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    defaultValue={vehiculo.seatings}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Combustible"
                    size="small"
                    sx={{ width: "25%"}}
                    defaultValue={vehiculo.fuelType}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Categoría"
                    size="small"
                    sx={{ width: "25%"}}
                    defaultValue={vehiculo.category}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Cuota"
                    size="small"
                    sx={{ width: "15%"}}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*.[0-9]*' }}
                    defaultValue={vehiculo.rentalFee}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Estado"
                    size="small"
                    sx={{ width: "25%"}}
                    defaultValue={vehiculo.state}
                />
            </Stack>
            {tipo === 'edit' ? (
                <>
                    <Box sx={{ width: '100%', height: 300, overflowY: 'scroll', marginTop: 2 }}>
                        <ImageList variant="masonry" cols={2} gap={0}>
                            {vehiculo.images.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                        src={`${item.img}?w=161&fit=crop&auto=format`}
                                        alt={'img'}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                </>
            ) : (
                <ContainerImage>
                    <ImageInput image={newImage} handleImageChange={handleImageChange}/>
                </ContainerImage>
            ) }
        </>
    );
}
/*
const ContainerImages = styled.div`
display: flex;
margin-top: 25px;
overflow: auto;
white-space: nowrap;
`
*/
const ContainerImage = styled.div`
display: flex;
margin-top: 25px;
justify-content: center;
`
/**
 * SELECT
● Tipo de combustible (Gasolina o diesel o eléctrico)
● Categoría (Sedan, Bus, Camioneta, Pickup, panel, camion)
● Estado, por defecto este estará como disponible.

● Listado de fotos del vehículo (al menos una foto por vehículo)

 */