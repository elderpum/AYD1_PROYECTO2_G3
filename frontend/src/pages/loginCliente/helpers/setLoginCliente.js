export const setLoginCliente = async (form) => {

    const newLoginClient = {
        username: form.user,
        password: form.password,
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
        body: JSON.stringify(newLoginClient)
    });

}
