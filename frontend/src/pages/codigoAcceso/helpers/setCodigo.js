const Swal = require('sweetalert2');

export const setCodigo = async (form) => {

    const newCode = {
        correo: form.email,
    }

    const url = 'http://localhost:3001/api/materiales/addMaterial';
    const token = localStorage.getItem("auth");

    // Peticion al backend.
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(newCode)
    });


    Swal.fire({
        title: 'Existo.',
        text: `Se ha enviado el código de acceso al correo: ${form.email}.`,
        icon: 'success',
        confirmButtonText: 'Ok'
    });


    Swal.fire({
        title: 'Error!',
        text: 'Error al crear en el registro.',
        icon: 'error',
        confirmButtonText: 'Ok'
    });

}
