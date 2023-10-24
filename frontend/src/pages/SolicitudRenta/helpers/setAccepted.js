const Swal = require('sweetalert2');

export const setAccepted = async () => {

    const newMessage = {
        message: "La solicitud de renta ha sido aceptada.",
        email: 'ferchoserrano0@gmail.com',
    }

    const url = 'http://localhost:3001/api/usuario/registrarEmpleado';

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `${token}`,
        },
        body: JSON.stringify(newMessage)
    });

    const data = await rep.json();

    if (!data.error) {

        Swal.fire({
            title: 'Mensaje enviado.',
            text: 'Se ha enviado el mensaje.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });


    } else {

        Swal.fire({
            title: 'Error!',
            text: 'Error al enviar mensaje.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }

}
