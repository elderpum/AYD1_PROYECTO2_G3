import { ip } from '../../../components/Ip';
const Swal = require('sweetalert2');


export const setAccepted = async (solicitud, setListaSolicitud) => {

    const newMessage = {
        idRequest: solicitud.idRequest,
        state: 'accepted',
        message: 'Se ha aceptado la solicitud de renta.',
        userEmail: solicitud.User_email,
    }

    const url = `${ip}/api/solicitud/responder-solicitud`;

    const token = localStorage.getItem('auth');

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(newMessage)
    });


    const data = await rep.json();

    const status = rep.status;

    if (status === 200) {

        setListaSolicitud([]);

        Swal.fire({
            title: 'Solicitud Aceptado.',
            text: 'Se ha aceptado la solicitud de renta.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });


    } else {

        Swal.fire({
            title: 'Error!',
            text: `${data.message}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }

}
