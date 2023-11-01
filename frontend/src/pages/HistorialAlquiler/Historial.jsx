import React from 'react';
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

export const Historial = () => {
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
                                maxHeight: 700,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >

                            <ListItem alignItems="flex-start">

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

        </BodyContent>
    )
}


const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
`