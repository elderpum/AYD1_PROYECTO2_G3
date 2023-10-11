import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from '../hooks/useForm'; // Custom hook.
import { setCliente } from './helpers/setCliente';
import { useNavigate } from 'react-router-dom';

import './registroCliente.css'; // Stylesheet.
import logo1 from '../../assets/logo1.png'; // Image.


export const RegistroCliente = () => {

    // Custom hook para el formulario.
    const { form, handleChange, handlePhoneChange, handleLicenseChange, handleReset } = useForm({
        nombre: '',
        apellido: '',
        correo: '',
        licencia: '',
        telefono: '',
        direccion: '',
        usuario: '',
        contrasena: ''
    });


    // Hook para navegar entre paginas.
    const navigate = useNavigate();


    // Estado de la fecha de nacimiento.
    const [dateSelect, setDate] = useState(null);


    // Cambio de estado de la fecha.
    const handleDateChange = (date) => {
        setDate(date);
    }


    // Metodo para redireccionar a otra pagina.
    const handleNavigateTo = () => {
        // Navegar a la pagina de inicio.
        navigate('/', {
            replace: true,
        });

    }


    // Obtener fecha de nacimiento.
    const getBirthDate = () => {

        const mont = (parseInt(dateSelect.$M) + 1).toString();
        const fecha = dateSelect.$y + "/" + mont + "/" + dateSelect.$D;
        return fecha;

    }


    // Extraer los valores del formulario.
    const habdleSubmit = (e) => {

        e.preventDefault();

        // Validar que el campo de correo electronico.
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) === false) {
            alert('Debe de ser un correo electrónico válido.');
            return;
        }

        // Validar que el campo de licencia tenga 13 dígitos.
        if (form.licencia.length !== 13) {
            alert('El número de licencia debe tener 13 dígitos.');
            return;
        }

        // Validar que el campo de teléfono tenga 8 dígitos.
        if (form.telefono.length !== 8) {
            alert('El número de teléfono debe tener 8 dígitos.');
            return;
        }

        // Validar que el campo de fecha no esté vacío.
        if (dateSelect === null) {
            alert('Debe seleccionar una fecha de nacimiento.');
            return;
        }

        const currentYear = new Date().getFullYear(); // Obtener el año actual.

        // Validar que sea mayor de edad
        if ((currentYear - dateSelect.$y) < 18) {
            alert('Debe ser mayor de edad.');
            return;
        }


        const birthtDate = getBirthDate(); // Obtener la fecha de nacimiento.

        setCliente(form, birthtDate); // Enviar los datos al servidor.
        setDate(null); // Resetear la fecha.
        handleReset(); // Resetear el formulario.

    }


    return (
        <div className="body-register-client">

            <div className="content-register-client">

                <div className="content-logo-register-client">

                    <img src={logo1} alt="logo" width='520vh' height="115vh" />

                </div>


                <div className="content-form-register-client">

                    <div className="title-form-client">
                        <h1> Hazte cliente ahora </h1>
                    </div>


                    <div className="content-inputs-register-client">

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
                                    label="Número de licencia"
                                    name='licencia'
                                    value={form.licencia}
                                    onChange={handleLicenseChange}
                                    variant="filled"
                                    sx={{ width: 250, m: 1 }}
                                />

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

                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker
                                            label="Fecha de nacimiento"
                                            value={dateSelect}
                                            onChange={handleDateChange}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
