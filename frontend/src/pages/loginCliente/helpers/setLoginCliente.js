const Swal = require('sweetalert2');

export const setLoginCliente = async (form, handleNavigatetoHome) => {

    const newLoginClient = {
        user: form.user,
        password: form.password,
        type: 'client'
    }

    const url = 'http://localhost:3001/api/usuario/login';
    // const token = localStorage.getItem("auth");

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `${token}`,
        },
        body: JSON.stringify(newLoginClient)
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
