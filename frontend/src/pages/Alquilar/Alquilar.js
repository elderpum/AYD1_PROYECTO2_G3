import React from 'react';
import styled from 'styled-components';
import {Sidebar} from '../../components/Sidebar'
import { Titulo } from '../../components/Titulo';

export function Alquilar() {
    /* useEffect -> getVehiculo */
    /* useEffect -> getVehiculo */
    return (
        <Container>
            <Sidebar isOrganizador={false} tipoUsuario={""}/>
            <BodyContent>
                <Titulo titulo={"Alquilar Vehiculo"}/>
                <Info>
                    hola
                </Info>
            </BodyContent>
        </Container>
    )
}

/*
ver datos del vehiculo
rango de fecha inicio y fin
calculo de cuota de alquiler = cuota al dia * dias de alquiler
enviar la solicitud
*/

const Info = styled.div`
display: flex;
background-color: red;
`

const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
`

const Container = styled.div`
display: flex;
`