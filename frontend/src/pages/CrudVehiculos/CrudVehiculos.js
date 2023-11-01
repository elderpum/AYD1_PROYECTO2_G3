import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../components/Titulo.css';

import { Button, Stack, Dialog, DialogTitle } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
import { Titulo } from "../../components/Titulo";
import { Card } from './components/Card';
import { FormVehiculo } from './components/FormVehiculo';
import { ip } from '../../components/Ip'
//import { useGeneralContext } from '../../contexts/generalContext';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const Swal = require('sweetalert2')

export function CrudVehiculos() {
    //const { setVehiculo } = useGeneralContext();
    //const navigate = useNavigate();
    //const ip = "http://localhost:3001"; //"https://zd8mw8xl-3001.use.devtunnels.ms"
    const [open, setOpen] = useState(false);
    const [vehiculos, setVehiculos] = useState([]);
    const [marca, setMarca] = useState('');
    /*
    const [nuevoVehiculo, setNuevoVehiculo] = useState({
        "licensePlate": "",
        "brand": "",
        "model": "",
        "Series_idSeries": "",
        "transmission": "",
        "seatings": "",
        "fuelType": "",
        "rentalFee": "",
        "state": "",
        "category": "",
        "images": []
    });
    */
    const [newVehiculoImage, setNewVehiculoImage] = useState(null);
    const [newVehiculoImageFile, setNewVehiculoImageFile] = useState(null);

    useEffect(() => {
        
        async function getInfo() {
            fetch(`${ip}/api/vehiculo/obtenerVehiculos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((res) => {
                    console.log(res);
                    setVehiculos(res.vehicles);
                });
        }
        getInfo();
    }, []);

    const handleClose = () => {
        setOpen(false);
        setNewVehiculoImage(null);
        setNewVehiculoImageFile(null);

        /*setNuevoVehiculo({
            "licensePlate": "",
            "brand": "",
            "model": "",
            "Series_idSeries": "",
            "transmission": "",
            "seatings": "",
            "fuelType": "",
            "rentalFee": "",
            "state": "",
            "category": "",
            "images": []
        });*/
    };

    const handleOpen = () => {
        setOpen(true);
        setNewVehiculoImage(null);
        setNewVehiculoImageFile(null);

        /*setNuevoVehiculo({
            "licensePlate": "",
            "brand": "",
            "model": "",
            "Series_idSeries": "",
            "transmission": "",
            "seatings": "",
            "fuelType": "",
            "rentalFee": "",
            "state": "",
            "category": "",
            "images": []
        });*/
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        console.log(selectedImage);
        if (selectedImage) {
            setNewVehiculoImage(URL.createObjectURL(selectedImage));
            if (selectedImage) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewVehiculoImageFile(reader.result.trim());
                };
                reader.readAsDataURL(selectedImage);
            }
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        var data = {
            Series_idSeries: e.target[0].value, // validar en backend
            brand: marca, // validar en backend
            licensePlate: e.target[2].value,
            model: e.target[4].value,
            transmission: e.target[6].value,
            seatings: e.target[8].value,
            fuelType: e.target[10].value,
            category: e.target[12].value,
            rentalFee: e.target[14].value,
            state: e.target[16].value,
            newImages: [newVehiculoImageFile]
        };
        console.log(data)
        //console.log(newVehiculoImageFile)
        if (!newVehiculoImageFile) {
            setOpen(false);
            Swal.fire({
                title: 'Error!',
                text: 'Debe ingresar una imagen para el vehiculo',
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then((result) => {
                setOpen(true);
            });
            return;
        }

        if (!(/^(P|C|M)-?\d{3}[A-Z]{3}$/.test(data.licensePlate))) {
            setOpen(false);
            Swal.fire({
                title: 'Error!',
                text: 'Placa inválida. Formato: P-123ABC o P123ABC',
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then((result) => {
                setOpen(true);
            });
            return;
        }

        if (!(/^[0-9]{0,4}$/.test(data.model) && data.model <= 2024 && data.model >= 1960)) {
            setOpen(false);
            Swal.fire({
                title: 'Error!',
                text: "Modelo inválido para el vehículo, debe ser un numero de año .",
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then((result) => {
                setOpen(true);
            });
            return;
        }

        if (!(/^(?!0\d)(\d+(\.\d{1,2})?)$/.test(data.rentalFee))) {
            setOpen(false);
            Swal.fire({
                title: 'Error!',
                text: "Cuota inválida para el vehículo",
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then((result) => {
                setOpen(true);
            });
            return;
        }

        if (data.rentalFee <= 0) {
            setOpen(false);
            Swal.fire({
                title: 'Error!',
                text: "Cuota inválida para el vehículo",
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then((result) => {
                setOpen(true);
            });
            return;
        }

        /** petición update vehiculo */
        
        async function getInfo() {
            fetch(`${ip}/api/vehiculo/registrarVehiculo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((res) => {
                    if (res.err) {
                        Swal.fire({
                            title: 'Error!',
                            text: res.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    } else {
                        Swal.fire({
                            title: 'Exito!',
                            text: "Vehiculo registrado exitosamente!",
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                });
        }
        getInfo();
        handleClose();
        
    };

    return (
        <BodyContent>
            <Titulo titulo={"Administración De Vehículos"} />
            <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                sx={{ color: '#ffffff', backgroundColor: '#3DF28B' }}
            >
                Nuevo Vehículo
            </Button>
            <Info>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {vehiculos.map((v) =>
                        <Card
                            obj={v}
                            key={v.licensePlate}
                        />
                    )}
                </Stack>
            </Info>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{ style: { backgroundColor: 'white', padding: '40px', borderRadius: '5px', minWidth: '50%' } }}
            >
                <DialogTitle style={{ textAlign: 'center' }}>
                    <form onSubmit={handleSave}>
                        <FormVehiculo
                            tipo={'create'}
                            vehiculo={null}
                            newImage={newVehiculoImage}
                            handleImageChange={handleImageChange}
                            marca={marca}
                            setMarca={setMarca}
                        />
                        <Button
                            startIcon={<CloseIcon />}
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                            sx={{ marginTop: '2rem', marginBottom: '-2rem' }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            color="primary"
                            type='submit'
                            sx={{ marginTop: '2rem', marginLeft: '1rem', marginBottom: '-2rem' }}
                        >
                            Guardar Nuevo
                        </Button>
                    </form>
                </DialogTitle>
            </Dialog>
        </BodyContent>
    )
}

/*
ver todos los vehiculos
crear nuevo vehiculo
*/


const Info = styled.div`
display: flex;
padding: 35px 25px;
flex-direction: column;
margin-top: 15px;

border-top: 1px solid #cccccc;
`

const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
`
/*
const vehiculo = {
    "licensePlate": "P-098HIJ",
    "brand": "BMW",
    "model": 2015,
    "Series_idSeries": 11,
    "transmission": "Automatic",
    "seatings": 5,
    "fuelType": "gasoline",
    "rentalFee": "55.00",
    "state": "available",
    "category": "Sedan",
    "images": [
        { "id": 1, "img": "https://loscoches.com/wp-content/uploads/2021/04/carros-deportivos-potencia.jpg"},
        { "id": 2, "img": "https://i.ytimg.com/vi/zRlEDI01RFU/maxresdefault.jpg"},
        { "id": 3, "img": "https://st1.uvnimg.com/d4/4a/006304a74db4902c0b4d8d8026c8/chevrolet-corvette-c8-stingray-2020-1280-08.jpg"},
        { "id": 4, "img": "https://static.vecteezy.com/system/resources/thumbnails/008/585/294/small/3d-rendering-sport-blue-car-on-white-bakcground-jpg-free-photo.jpg"},
        { "id": 5, "img": "https://www.eltiempo.com/files/article_multimedia/uploads/2019/10/15/5da64f9a11291.jpeg"}
    ]
}
*/