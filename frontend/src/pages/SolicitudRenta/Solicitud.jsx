import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import { Titulo } from "../../components/Titulo";
import { DialogCancel } from './DialogCancel';
import { setAccepted } from './helpers/setAccepted';



export const Solicitud = () => {

    // Estado para abrir y cerrar el modal.
    const [open, setOpen] = useState(false);


    // Funciones para abrir el modal.
    const handleClickOpen = () => {
        setOpen(true);
    };


    // Funciones para cerrar el modal.
    const handleClose = () => {
        setOpen(false);
    };


    // Funciones para aceptar solicitud.
    const handleAccept = () => {

        setAccepted(); // Funcion para aceptar la solicitud.
    };


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

                    <Titulo titulo="Solicitudes de Renta" />

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
                                maxHeight: 700,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >

                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <React.Fragment>
                                        <IconButton onClick={handleAccept} aria-label="comment">
                                            <CheckIcon />
                                        </IconButton>

                                        <IconButton onClick={handleClickOpen} aria-label="comment">
                                            <ClearIcon />
                                        </IconButton>
                                    </React.Fragment>
                                }
                            >

                                <ListItemAvatar>

                                    <Avatar variant='square'>
                                        <DirectionsCarIcon />
                                    </Avatar>

                                </ListItemAvatar>

                                <ListItemText
                                    primary={'Mazda 3 - año: 2019'}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Reservado por: Fernando Perez
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />

                            </ListItem>

                            <Divider variant="inset" component="li" />

                        </List>

                    </Box>

                </Stack>

            </Box>

            <DialogCancel open={open} handleClose={handleClose} />

        </BodyContent>
    )
}


const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
`