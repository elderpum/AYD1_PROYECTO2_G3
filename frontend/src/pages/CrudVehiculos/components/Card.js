import React, {useState} from 'react';
import styled from 'styled-components';

import '../../../components/Titulo.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import { Grid, Button, Stack, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function Card({ obj }) {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    var imagenes = [];
    for (let i=0;i<obj.fotos.length;i++) {
        imagenes.push(
            <div>
                <img src={obj.fotos[i]} alt='imagen'/>
            </div>
        );
    }
    
    return (
        <CardContainer>
            <Carousel showArrows={true} showThumbs={false} width={"290px"} infiniteLoop={true}>
                {imagenes}
            </Carousel>
            <h5> {obj.marca} </h5>
            <h6> Modelo: {obj.modelo} </h6>
            <h6> Transmisión: {obj.transmision} </h6>
            <h6> Cuota: Q {obj.cuota} </h6>
            <h6> Estado: {obj.estado} </h6>
            <h6> Categoria: {obj.categoria} </h6>
            <ButtonsContainer>
                <IconButton aria-label="delete" color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="error">
                    <DeleteIcon />
                </IconButton>
            </ButtonsContainer>
        </CardContainer>
    );
}

/*
Utilizar Dialog para los formularios de edicion y eliminación
*/

const ButtonsContainer = styled.div`
display: flex;
`


const CardContainer = styled.div`
display: flex;
padding: 35px 25px;
flex-direction: column;
margin-top: 15px;
min-width: 300px;

border-radius: 5px 5px 5px 5px;
-webkit-border-radius: 5px 5px 5px 5px;
-moz-border-radius: 5px 5px 5px 5px;
border: 1px solid #cccccc;

& img {
    max-width: 290px;
}

`