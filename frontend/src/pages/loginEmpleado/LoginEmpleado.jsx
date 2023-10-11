import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from '../hooks/useForm'; // Custom hook.

import './loginEmpleado.css'; // Stylesheet.
import 'animate.css'; // Stylesheet animate.
import logo1 from '../../assets/logo1.png'; // Image.


export const LoginEmpleado = () => {

    // Custom hook para el formulario.
    const { form, handleChange, handleReset, setForm } = useForm({
        user: '',
        password: ''
    });


    // Hook para el checkbox.
    const [checked, setChecked] = useState(false);


    // Hook para navegar entre paginas.
    const navigate = useNavigate();


    // Metodo para el checkbox.
    const handleCheckedChange = (event) => {

        setChecked(event.target.checked);

        setForm({
            ...form,
            password: ''
        });

    };


    // Metodo para redireccionar a otra pagina.
    const handleNavigateTo = () => {
        // Navegar a la pagina de inicio.
        navigate('/', {
            replace: true,
        });

    }


    // Metodo para redireccionar a otra pagina.
    // const handleNavigateCode = () => {
    //     // Navegar a la pagina de registro.
    //     navigate('/codigoAcceso', {
    //         replace: true,
    //     });

    // }


    // Extraer los valores del formulario.
    const habdleSubmit = (e) => {

        e.preventDefault();

        handleReset();
    }

    return (
        <div className='body-login-employee'>

            <div className='content-login-employee'>

                <div className="content-logo-login-employee">

                    <img src={logo1} alt="logo" width='520vh' height="115vh" />

                </div>

                <div className="content-form-login-employee">

                    <div className="title-login-employee">
                        <h1 className="animate__animated animate__backInDown animate__delay-0.5s" > LOGIN EMPLEADO  </h1>
                    </div>


                    <div className="content-inputs-login-employee">

                        <form onSubmit={habdleSubmit}>

                            <div className='animate__animated animate__backInRight animate__delay-0.5s'>
                                <TextField
                                    required
                                    sx={{ width: 350, m: 1 }}
                                    label="usuario"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    name='user'
                                    value={form.user}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className='animate__animated animate__backInRight animate__delay-0.5s' style={{ marginTop: 5 }}>
                                <TextField
                                    required
                                    sx={{ width: 350, m: 1 }}
                                    label={checked ? "Código" : "Contraseña"}
                                    type='password'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {checked ? <VpnKeyIcon /> : <LockIcon />}
                                            </InputAdornment>
                                        ),
                                    }}

                                    variant="standard"
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className='animate__animated animate__backInRight animate__delay-0.5s' style={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                                <FormControlLabel
                                    control={<Checkbox checked={checked} onChange={handleCheckedChange} />}
                                    label='código de acceso'
                                />
                            </div>


                            <div className='animate__animated animate__backInUp animate__delay-0.5s' style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>

                                <Button variant="contained" type="submi" color="success" sx={{ m: 1, width: 155, height: 45 }}>
                                    Ingresar
                                </Button>

                                {/* <Button variant="contained" onClick={handleNavigateTo} color="error" sx={{ m: 1, width: 155, height: 45 }}>
                                    Regresar
                                </Button> */}

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}
