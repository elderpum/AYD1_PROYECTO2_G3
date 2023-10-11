import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from '../hooks/useForm'; // Custom hook.
import { setCodigo } from './helpers/setCodigo';

import './codigo.css';
import logo1_black from '../../assets/logo1_black.png'; // Image.

export const Codigo = () => {

    // Custom hook para el formulario.
    const { form, handleChange, handleReset } = useForm({
        email: '',
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


    // Extraer los valores del formulario.
    const habdleSubmit = (e) => {

        e.preventDefault();

        // Validar que el campo de correo electronico.
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) === false) {
            alert('Debe de ser un correo electrónico válido.');
            return;
        }

        setCodigo(form);

        handleReset();
    }


    return (
        <div className='body-code-access'>

            <div className='content-code-access'>

                <div className="content-form-code-access">

                    <div className='content-logo-code-access'>

                        <img src={logo1_black} alt="logo" width='520vh' height="115vh" />

                    </div>


                    <div className='content-inputs-code-access'>

                        <form onSubmit={habdleSubmit}>

                            <div>
                                <TextField
                                    required
                                    sx={{ width: 350, m: 1 }}
                                    label="Correo electronico"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AlternateEmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>

                                <Button variant="contained" type="submi" color="success" sx={{ m: 1, width: 155, height: 45 }}>
                                    Enviar Código
                                </Button>

                                <Button variant="contained" onClick={handleNavigateTo} color="error" sx={{ m: 1, width: 155, height: 45 }}>
                                    Atras
                                </Button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}
