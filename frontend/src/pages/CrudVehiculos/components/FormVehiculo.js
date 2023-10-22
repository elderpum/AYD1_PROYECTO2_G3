import React, { useState } from 'react';
import styled from 'styled-components';

import {
    Stack, TextField, InputAdornment
} from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ImageInput } from './ImageInput';

export function FormVehiculo({ tipo, vehiculo, newImage, handleImageChange }) {

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
            <h4> Vehiculo </h4>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" sx={{marginTop: 3}}>
                <TextField
                    required
                    id="outlined-required"
                    label="Marca"
                    size="small"
                    sx={{ width: "50%" }}
                    defaultValue={tipo === 'edit' ? 'vehiculo.brand' : ''}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Placa"
                    size="small"
                    sx={{ width: "25%" }}
                    defaultValue={tipo === 'edit' ? vehiculo.licensePlate : ''}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Modelo"
                    size="small"
                    sx={{ width: "20%" }}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    defaultValue={tipo === 'edit' ? vehiculo.model : ''}
                />
                <FormControl sx={{width: "25%"}}>
                    <InputLabel size="small" id="input-label-transmission">Transmisión</InputLabel>
                    <Select
                        required
                        defaultValue={tipo === 'edit' ? vehiculo.transmission : ''}
                        label="Transmisión"
                        size="small"
                    >
                        <MenuItem value={'Manual'}>Manual</MenuItem>
                        <MenuItem value={'Automático'}>Automático</MenuItem>
                        <MenuItem value={'Hibrido'}>Hibrido</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="outlined-required"
                    label="Cantidad de asientos"
                    size="small"
                    sx={{ width: "30%" }}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    defaultValue={tipo === 'edit' ? vehiculo.seatings : ''}
                />
                <FormControl sx={{width: "25%"}}>
                    <InputLabel size="small" id="input-label-combustible">Combustible</InputLabel>
                    <Select
                        required
                        defaultValue={tipo === 'edit' ? vehiculo.fuelType : ''}
                        label="Combustible"
                        size="small"
                    >
                        <MenuItem value={'Gasolina'}>Gasolina</MenuItem>
                        <MenuItem value={'Diesel'}>Diesel</MenuItem>
                        <MenuItem value={'Eléctrico'}>Eléctrico</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{width: "30%"}}>
                    <InputLabel size="small" id="input-label-cat">Categoría</InputLabel>
                    <Select
                        required
                        defaultValue={tipo === 'edit' ? vehiculo.category : ''}
                        label="Categoría"
                        size="small"
                    >
                        <MenuItem value={'Sedan'}>Sedan</MenuItem>
                        <MenuItem value={'Bus'}>Bus</MenuItem>
                        <MenuItem value={'Camioneta'}>Camioneta</MenuItem>
                        <MenuItem value={'Pickup'}>Pickup</MenuItem>
                        <MenuItem value={'Panel'}>Panel</MenuItem>
                        <MenuItem value={'Camion'}>Camion</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="outlined-required"
                    label="Cuota"
                    size="small"
                    sx={{ width: "25%" }}
                    InputProps={{startAdornment: <InputAdornment position="start">Q</InputAdornment>}}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*.[0-9]*' }}
                    defaultValue={tipo === 'edit' ? vehiculo.rentalFee : ''}
                />
                <FormControl sx={{width: "30%"}}>
                    <InputLabel size="small" id="input-label-cat">Estado</InputLabel>
                    <Select
                        required
                        defaultValue={tipo === 'edit' ? vehiculo.state : ''}
                        label="Estado"
                        size="small"
                    >
                        <MenuItem value={'Disponible'}>Disponible</MenuItem>
                        <MenuItem value={'No Disponible'}>No Disponible</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            {/*tipo === 'edit' ? (
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
            ) */}
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