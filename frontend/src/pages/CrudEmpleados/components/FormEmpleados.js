import React from 'react';
//import styled from 'styled-components';

import {
    Stack, TextField
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function FormEmpleado({ tipo, empleado }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    /* validación tipo de operacion */
    if (empleado == null) {
        empleado = {
            email: "",
            name: "",
            lastName: "",
            address: "",
            phone: "",
            userName: "",
            passw: ""
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
            <h4> Empleado </h4>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" sx={{marginTop: 3}}>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    size="small"
                    sx={{ width: "80%" }}
                    defaultValue={empleado.email}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Nombre"
                    size="small"
                    sx={{ width: "30%" }}
                    defaultValue={empleado.name}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Apellido"
                    size="small"
                    sx={{ width: "30%" }}
                    defaultValue={empleado.lastName}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Telefono"
                    size="small"
                    sx={{ width: "30%" }}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    defaultValue={empleado.phone}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Dirección"
                    size="small"
                    sx={{ width: "80%" }}
                    defaultValue={empleado.address}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Usuario"
                    size="small"
                    sx={{ width: "25%" }}
                    defaultValue={empleado.userName}
                />
                <FormControl sx={{ width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" size='small'>Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        size="small"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        defaultValue={empleado.passw}
                    />
                </FormControl>
            </Stack>
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
