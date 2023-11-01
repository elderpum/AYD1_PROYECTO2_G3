import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from '../hooks/useForm'; // Custom hook.
import { setAdmin } from './helpers/setAdmin';


import './loginAdmin.css'; // Stylesheet.
import 'animate.css'; // Stylesheet animate.
import logo1 from '../../assets/logo1.png'; // Image.


export const LoginAdmin = ({ setTypeUser, setcredentials }) => {

    // Custom hook para el formulario.
    const { form, handleChange, handleReset } = useForm({
        user: '',
        password: ''
    });


    // Hook para navegar entre paginas.
    const navigate = useNavigate();


    // Metodo para redireccionar a otra pagina.
    const handleNavigateTo = () => {
        // Navegar a la pagina de inicio.
        navigate('/', {
            replace: true,
        });

    }


    // Metodo para ingresar al cliente.
    const handleNavigatetoHome = () => {
        // Navegar a la pagina de registro.
        navigate('/alquimovil', {
            replace: true,
        });

    }


    // Extraer los valores del formulario.
    const habdleSubmit = (e) => {

        e.preventDefault();

        setTypeUser(3); // Tipo de usuario 1 = Empleado, 2 = Cliente, 3 = Admin.

        setcredentials({ // Credenciales del usuario.
            email: form.user,
            password: form.password
        });

        setAdmin(form, handleNavigatetoHome)

        handleReset();
    }


    return (

        <div className='body-login-admin'>

            <div className='content-login-admin'>

                <div className="content-logo-login-admin">

                    <img src={logo1} alt="logo" width='520vh' height="115vh" />

                </div>

                <div className="content-form-login-admin">

                    <div className="title-login-admin">
                        <h1 className="animate__animated animate__backInDown animate__delay-0.5s" > LOGIN ADMINISTRADOR  </h1>
                    </div>


                    <div className="content-inputs-login-admin">

                        <form onSubmit={habdleSubmit}>

                            <div className='animate__animated animate__backInRight animate__delay-0.5s'>
                                <TextField
                                    required
                                    sx={{ width: 350, m: 1 }}
                                    label="usuario admin"
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
                                    label="Contraseña"
                                    type='password'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                    variant="standard"
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className='animate__animated animate__backInUp animate__delay-0.5s' style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>

                                <Button variant="contained" type="submi" color="success" sx={{ m: 1, width: 155, height: 45 }}>
                                    Ingresar
                                </Button>

                                <Button variant="contained" onClick={handleNavigateTo} color="error" sx={{ m: 1, width: 155, height: 45 }}>
                                    Regresar
                                </Button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );
}
