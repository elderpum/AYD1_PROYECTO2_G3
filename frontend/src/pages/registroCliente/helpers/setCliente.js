const Swal = require('sweetalert2');


export const setCliente = async (form, birthtDate) => {

    const newClient = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.correo,
        licencia: form.licencia,
        telefono: form.telefono,
        direccion: form.direccion,
        usuario: form.usuario,
        contrasena: form.contrasena,
        fecha_nacimiento: birthtDate,
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
        body: JSON.stringify(newClient)
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
