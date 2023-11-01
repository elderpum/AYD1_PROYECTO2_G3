
export const getListaSolicitud = async () => {

    const url = 'http://localhost:3001/api/solicitud/solicitudes-no-procesadas';

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

    if (status === 401) {

        console.log('Error al obtener la lista de solicitud.');
        return [];
    }

    return data.data;


}
