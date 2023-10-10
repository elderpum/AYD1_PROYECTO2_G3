import React from 'react';
import styled from 'styled-components';
import {Sidebar} from '../../components/Sidebar'

export function GestionarCosto() {
    return (
        <Container>
            <Sidebar isOrganizador={false} tipoUsuario={""}/>
            <BodyContent>
                Gestionar Costo
            </BodyContent>
        </Container>
    )
}

const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
`

const Container = styled.div`
display: flex;
`