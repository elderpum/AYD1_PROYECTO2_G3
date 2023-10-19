const Swal = require('sweetalert2');


export const setCliente = async (form, birthtDate) => {

    const newClient = {
        name: form.nombre,
        lastName: form.apellido,
        email: form.correo,
        passw: form.contrasena,
        birthday: birthtDate,
        license: form.licencia,
        address: form.direccion,
        phone: form.telefono,
        userName: form.usuario,
    }

    // console.log(newClient);

    const url = 'http://localhost:3001/api/usuario/registrarCliente';
    // const token = localStorage.getItem("auth");

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `${token}`,
        },
        body: JSON.stringify(newClient)
    });

    const data = await rep.json();

    if (!data.error) {

        Swal.fire({
            title: 'Registro Cliente.',
            text: 'Cuenta creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });


    } else {

        Swal.fire({
            title: 'Error!',
            text: 'Error al crear en el registro.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });


    }

}
