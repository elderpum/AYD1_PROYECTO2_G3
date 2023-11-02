import { getHistorialEmpleado } from '../helpers/getHistorialEmpleado';


export const UseFetchEmpleado = (listaHistorialEmpleado, setListaHistorialEmpleado) => {

    if (listaHistorialEmpleado.length === 0) {

        getHistorialEmpleado().then((data) => {
            console.log('Historial Empleado: ', data);
            setListaHistorialEmpleado(data);
        });

    }

}
