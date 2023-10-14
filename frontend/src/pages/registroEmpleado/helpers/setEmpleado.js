const Swal = require('sweetalert2');

export const setEmpleado = async (form) => {

    const newEmployee = {
        name: form.nombre,
        lastName: form.apellido,
        email: form.correo,
        passw: form.contrasena,
        address: form.direccion,
        phone: form.telefono,
        userName: form.usuario,
    }

    // console.log(newEmployee);

    const url = 'http://localhost:3001/api/usuario/registrarEmpleado';
    // const token = localStorage.getItem("auth");

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `${token}`,
        },
        body: JSON.stringify(newEmployee)
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
