import { ip } from '../../../components/Ip';

export const getHistorialCliente = async () => {

    const url = `${ip}/api/solicitud/historial-cliente`;

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

        return 'Error: no se puede obtener el historial de alquileres del cliente.'

    }

}
