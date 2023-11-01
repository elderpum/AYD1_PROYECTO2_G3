import React from 'react'

export const getListaSolicitud = async () => {


    const url = 'http://localhost:3001/api/solicitud/solicitudes-no-procesadas';

    const token = localStorage.getItem('token');


    console.log('Token: ', token);

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });


    const data = await rep.json();

    return data;

}
