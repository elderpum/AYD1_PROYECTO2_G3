const Swal = require('sweetalert2');

export const setEmpleado = async (form) => {

    const newEmployee = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.correo,
        telefono: form.telefono,
        direccion: form.direccion,
        usuario: form.usuario,
        contrasena: form.contrasena,
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
        body: JSON.stringify(newEmployee)
    });


    Swal.fire({
        title: 'Registro Cliente.',
        text: 'Cuenta creada exitosamente.',
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
