import { ip } from '../../../components/Ip';
const Swal = require('sweetalert2');

export const setAdmin = async (form, handleNavigatetoHome) => {

    const newAdmin = {
        user: form.user,
        password: form.password,
        type: 'admin'
    }

    const url = `${ip}/api/usuario/login`;

    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `${token}`,
        },
        body: JSON.stringify(newAdmin)
    });

    const data = await rep.json();

    if (data.authExitoso) {

        const token = data.tokenAuth;
        localStorage.setItem("auth", token); // Guardar token en localstorage.

        handleNavigatetoHome();

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Verificar credenciales',
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }

}
