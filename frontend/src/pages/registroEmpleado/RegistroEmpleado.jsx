import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from '../hooks/useForm'; // Custom hook.
import { setEmpleado } from './helpers/setEmpleado';
import { useNavigate } from 'react-router-dom';

import './registroEmpleado.css'; // Stylesheet.
import logo1 from '../../assets/logo1.png'; // Image.

export const RegistroEmpleado = () => {

    // Custom hook para el formulario.
    const { form, handleChange, handlePhoneChange, handleReset } = useForm({
        nombre: '',
        apellido: '',
        direccion: '',
        correo: '',
        telefono: '',
        usuario: '',
        contrasena: ''
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
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) === false) {
            alert('Debe de ser un correo electrónico válido.');
            return;
        }


        // Validar que el campo de teléfono tenga 8 dígitos.
        if (form.telefono.length !== 8) {
            alert('El número de teléfono debe tener 8 dígitos.');
            return;
        }


        setEmpleado(form) // Enviar los datos del formulario.
        handleReset(); // Resetear el formulario.

    }


    return (
        <div className="body-register-employee">

            <div className="content-register-employee">

                <div className="content-logo-register-employee">

                    <img src={logo1} alt="logo" width='520vh' height="115vh" />

                </div>


                <div className="content-form-register-employee">

                    <div className="title-form-employee">

                        <h1> REGISTRO EMPLEADO </h1>

                    </div>


                    <div className="content-inputs-register-employee">

                        <form onSubmit={habdleSubmit}>

                            <div>
                                <TextField
                                    required
                                    label="Nombre"
                                    variant="filled"
                                    name='nombre'
                                    value={form.nombre}
                                    onChange={handleChange}
                                    sx={{ width: 250, m: 1 }}
                                />

                                <TextField
                                    required
                                    label="Apellido"
                                    name='apellido'
                                    value={form.apellido}
                                    onChange={handleChange}
                                    variant="filled"
                                    sx={{ width: 250, m: 1 }}
                                />
                            </div>

                            <div>
                                <TextField
                                    required
                                    label="Correo electrónico"
                                    name='correo'
                                    value={form.correo}
                                    onChange={handleChange}
                                    variant="filled"
                                    sx={{ width: 520, m: 1 }}
                                />
                            </div>

                            <div>
                                <TextField
                                    required
                                    label="Número de teléfono"
                                    name='telefono'
                                    value={form.telefono}
                                    onChange={handlePhoneChange}
                                    variant="filled"
                                    sx={{ width: 250, m: 1 }}
                                />
                            </div>

                            <div>
                                <TextField
                                    required
                                    label="Dirección"
                                    name='direccion'
                                    value={form.direccion}
                                    onChange={handleChange}
                                    variant="filled"
                                    sx={{ width: 520, m: 1 }}
                                />
                            </div>

                            <div>
                                <TextField
                                    required
                                    label="Usuario"
                                    name='usuario'
                                    value={form.usuario}
                                    onChange={handleChange}
                                    variant="filled"
                                    sx={{ width: 250, m: 1 }}
                                />

                                <TextField
                                    required
                                    label="Contraseña"
                                    name='contrasena'
                                    value={form.contrasena}
                                    onChange={handleChange}
                                    type="password"
                                    variant="filled"
                                    sx={{ width: 250, m: 1 }}
                                />
                            </div>



                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>

                                <Button variant="contained" type="submi" color="success" sx={{ m: 1, width: 155, height: 45 }}>
                                    Registrarse
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
    )
}
