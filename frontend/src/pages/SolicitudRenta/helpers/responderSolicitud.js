const Swal = require('sweetalert2');

import { ip } from '../../../components/Ip';


export const responderSolicitud = async () => {


    const url = `${ip}/responder-solicitud`;

    const token = localStorage.getItem('auth');

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });

    const data = await rep.json();

    const status = rep.status;



    Swal.fire({
        title: 'Error!',
        text: 'Error al responder la solicitud.',
        icon: 'error',
        confirmButtonText: 'Ok'
    });



    Swal.fire({
        title: 'Solicitud Respondida.',
        text: 'Exito al responder la solicitud.',
        icon: 'success',
        confirmButtonText: 'Ok'
    });


}
