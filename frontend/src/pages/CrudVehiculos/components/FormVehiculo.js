import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
    Stack, TextField, InputAdornment,
    Box, ImageList, ImageListItem
} from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ImageInput } from './ImageInput';
import { ip } from '../../../components/Ip';

export function FormVehiculo({ tipo, vehiculo, newImage, handleImageChange, marca, setMarca }) {
    //const ip = "http://localhost:3001"; //"https://zd8mw8xl-3001.use.devtunnels.ms"
    const [marcas, setMarcas] = useState([])

    useEffect(()=>{
        const token = localStorage.getItem("auth");

        const fetchData = async () => {
            fetch(`${ip}/api/vehiculo/getMarcas`, {
                method: "GET",
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
                    setMarcas(res.marcas);
                })
                .catch((error) => console.error("Error:", error));
        };
        fetchData();
    }, [])

    const handleMarca = (e) => {
        for (let i = 0; i<marcas.length; i++) {
            if (e.target.value === marcas[i].idSeries) {
                setMarca(marcas[i].name)
            }
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
    /*
    var opciones_marcas = []
    for (let i = 0; i <marcas.length; i++) {
        opciones_marcas.push(
            <MenuItem value={marcas[i].idBrand}>{marcas[i].name}</MenuItem>
        )
    }
    */
    var opciones_series = []
    for (let i = 0; i <marcas.length; i++) {
        opciones_series.push(
            <MenuItem value={marcas[i].idSeries}>{marcas[i].serie}</MenuItem>
        )
    }

    return (
        <>
            <h4> Vehiculo </h4>
            <div sx={{width:' 10%'}}>
                Marca: {marca}
            </div>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" sx={{marginTop: 3}}>
                <FormControl sx={{width: "50%"}}>
                    <InputLabel size="small" id="input-label-combustible">Combustible</InputLabel>
                    <Select
                        required
                        defaultValue={tipo === 'edit' ? vehiculo.fuelType : ''}
                        label="Combustible"
                        size="small"
                        onChange={handleMarca}
                    >
                        {opciones_series}
                    </Select>
                </FormControl>
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
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]{4}' }}
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
                        <MenuItem value={'Automatic'}>Automático</MenuItem>
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
                        <MenuItem value={'gasoline'}>Gasolina</MenuItem>
                        <MenuItem value={'diesel'}>Diesel</MenuItem>
                        <MenuItem value={'electric'}>Eléctrico</MenuItem>
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
                        <MenuItem value={'avilable'}>Disponible</MenuItem>
                        <MenuItem value={'unavailable'}>No Disponible</MenuItem>
                    </Select>
                </FormControl>
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