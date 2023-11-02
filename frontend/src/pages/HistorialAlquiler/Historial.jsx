import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Titulo } from "../../components/Titulo";
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import { UseFetchCliente } from './hooks/UseFetchCliente';
import { UseFetchEmpleado } from './hooks/UseFetchEmpleado';
import { UseFetchAdmin } from './hooks/UseFetchAdmin';


export const Historial = ({ typeUser }) => {


    //Lista hitortial cliente.
    const [listaHistorialCliente, setListaHistorialCliente] = useState([]);

    //lista historial empleado.
    const [listaHistorialEmpleado, setListaHistorialEmpleado] = useState([]);

    //lista hiusotrial admin.
    const [listaHistorialAdmin, setListaHistorialAdmin] = useState([]);


    //lista historial cliente.
    useEffect(() => {

        if (typeUser === 2) {

            UseFetchCliente(listaHistorialCliente, setListaHistorialCliente);
        }

    }, [listaHistorialCliente, typeUser]);


    //lista historial empleado.
    useEffect(() => {

        if (typeUser === 1) {

            UseFetchEmpleado(listaHistorialEmpleado, setListaHistorialEmpleado);
        }


    }, [listaHistorialEmpleado, typeUser]);



    useEffect(() => {

        if (typeUser === 3) {

            UseFetchAdmin(listaHistorialAdmin, setListaHistorialAdmin);
        }

    }, [listaHistorialAdmin, typeUser]);



    return (

        <BodyContent>

            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 3,
                }}
            >

                <Stack spacing={2}>

                    <Titulo titulo="Historial de alquiler" />

                    <Box
                        border="1px solid grey"
                        borderRadius="8px"
                        width='100%'
                        height={650}
                        p={2}
                    >

                        <List
                            sx={{
                                width: 800,
                                maxWidth: 800,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 600,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >

                            {
                                typeUser === 2
                                    ?
                                    listaHistorialCliente.map((cliente) => (

                                        <>
                                            <ListItem alignItems="flex-start">

                                                <ListItemAvatar>

                                                    <Avatar variant='square'>
                                                        <DirectionsCarIcon />
                                                    </Avatar>

                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={cliente.brandName + ' ' + cliente.seriesName + ' ' + cliente.model}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {'estado: ' + cliente.state}
                                                            </Typography>

                                                            <ListItemText
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: 'inline' }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {'fecha inicio: ' + cliente.rentalStart.split('T')[0] + ' -- fecha finalización: ' + cliente.rentalEnd.split('T')[0]}
                                                                        </Typography>
                                                                    </React.Fragment>
                                                                }
                                                            />

                                                        </React.Fragment>
                                                    }
                                                />

                                            </ListItem>

                                            <Divider variant="inset" component="li" />

                                        </>
                                    ))

                                    : null
                            }



                            {
                                typeUser === 1
                                    ?
                                    listaHistorialEmpleado.map((empleado) => (

                                        <>
                                            <ListItem alignItems="flex-start">

                                                <ListItemAvatar>

                                                    <Avatar variant='square'>
                                                        <DirectionsCarIcon />
                                                    </Avatar>

                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={empleado.brandName + ' ' + empleado.seriesName + ' ' + empleado.model}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {empleado.name + ' ' + empleado.lastName + ' -- estado: ' + empleado.empleado}
                                                            </Typography>

                                                            <ListItemText
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: 'inline' }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {'Fecha inicio: ' + empleado.rentalStart.split('T')[0] + ' -- fecha finalización: ' + empleado.rentalEnd.split('T')[0]}
                                                                        </Typography>
                                                                    </React.Fragment>
                                                                }
                                                            />

                                                        </React.Fragment>
                                                    }
                                                />

                                            </ListItem>

                                            <Divider variant="inset" component="li" />

                                        </>
                                    ))

                                    : null
                            }



                            {
                                typeUser === 3
                                    ?
                                    listaHistorialAdmin.map((admin) => (

                                        <>
                                            <ListItem alignItems="flex-start">

                                                <ListItemAvatar>

                                                    <Avatar variant='square'>
                                                        <DirectionsCarIcon />
                                                    </Avatar>

                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={admin.brandName + ' ' + admin.seriesName + ' ' + admin.model}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {'Empleado: ' + admin.employeeEmail}
                                                            </Typography>

                                                            <ListItemText
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: 'inline' }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {'Cliente: ' + admin.clientEmail}
                                                                        </Typography>
                                                                    </React.Fragment>
                                                                }
                                                            />


                                                            <ListItemText
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: 'inline' }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {'Notificación: ' + admin.notificationMessage}
                                                                        </Typography>
                                                                    </React.Fragment>
                                                                }
                                                            />

                                                            <ListItemText
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: 'inline' }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {'Fecha inicio: ' + admin.rentalStart.split('T')[0] + ' -- fecha finalización: ' + admin.rentalEnd.split('T')[0]}
                                                                        </Typography>
                                                                    </React.Fragment>
                                                                }
                                                            />

                                                        </React.Fragment>
                                                    }
                                                />

                                            </ListItem>

                                            <Divider variant="inset" component="li" />

                                        </>
                                    ))

                                    : null
                            }



                        </List>

                    </Box>



                </Stack>



            </Box>

        </BodyContent>
    )
}


const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
`