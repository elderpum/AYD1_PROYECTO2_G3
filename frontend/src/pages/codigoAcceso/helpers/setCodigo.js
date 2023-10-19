const Swal = require('sweetalert2');

export const setCodigo = async (form) => {

    const newCode = {
        email: form.email,
    }

    const url = 'http://localhost:3001/api/usuario/generarCodigoAcceso';

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCode)
    });

    const data = await rep.json();

    if (!data.error) {

        Swal.fire({
            title: 'Exito.',
            text: `${data.message}`,
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
