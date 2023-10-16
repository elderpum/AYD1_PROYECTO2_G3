import React, {useState} from 'react';
import styled from 'styled-components';

import { 
    Stack, TextField
} from '@mui/material';
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
            "photos": []
        }
    }

    /* generación de imagenes para la edición */
    var imagenes = [];
    if (tipo === 'edit') {
        for (let i = 0; i < vehiculo.photos.length; i++) {
            imagenes.push(
                <ImageInput image={vehiculo.photos[i]} handleImageChange={handleImageChange} key={i}/>
            );
        }
    }

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
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                <ContainerImages>
                    {/*imagenes*/}
                </ContainerImages>
            ) :(
                <ContainerImage>
                    <ImageInput image={newImage} handleImageChange={handleImageChange}/>
                </ContainerImage>
            ) }
        </>
    );
}

const ContainerImages = styled.div`
display: flex;
margin-top: 25px;
overflow: auto;
white-space: nowrap;
`

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