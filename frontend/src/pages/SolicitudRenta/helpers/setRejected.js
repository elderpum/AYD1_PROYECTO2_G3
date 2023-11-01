import { ip } from '../../../components/Ip';
const Swal = require('sweetalert2');


export const setRejected = async (form, solicitud, setListaSolicitud) => {

    const newMessage = {
        idRequest: solicitud.idRequest,
        state: 'declined',
        message: form.reason,
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
            title: 'Solicitud Denegada.',
            text: 'Se ha denegado la solicitud de renta.',
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
