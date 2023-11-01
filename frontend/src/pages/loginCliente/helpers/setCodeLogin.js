const Swal = require('sweetalert2');

import { ip } from '../../../components/Ip';

export const setCodeLogin = async (form, handleNavigatetoHome) => {

    const newCode = {
        email: form.user,
        code: parseInt(form.password),
    }

    const url = `${ip}/api/usuario/verificarCodigoAcceso`;


    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCode)
    });


    const data = await rep.json();


    if (data.authExitoso) {

        const token = data.tokenAuth;
        localStorage.setItem("auth", token); // Guardar token en localstorage.

        handleNavigatetoHome();

    } else {

        Swal.fire({
            title: 'Error!',
            text: 'Verificar codigo de acceso',
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }
}
