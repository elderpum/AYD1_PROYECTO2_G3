
export const getHistorialEmpleado = async () => {

    const url = 'http://localhost:3001/api/solicitud/historial-empleado';

    const token = localStorage.getItem('auth');

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });


    const data = await rep.json();

    const status = rep.status;

    if (status === 200) {

        return data.data;

    } else {

        return 'Error: no se puede obtener el historial de alquileres del empleado.'

    }

}
