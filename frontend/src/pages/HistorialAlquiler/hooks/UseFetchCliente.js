import { getHistorialCliente } from '../helpers/getHistorialCliente'


export const UseFetchCliente = (listaHistorialCliente, setListaHistorialCliente) => {

    if (listaHistorialCliente.length === 0) {

        getHistorialCliente().then((data) => {
            // console.log('Historial Cliente: ', data);
            setListaHistorialCliente(data);
        });

    }

}

