import { getHistorialAdmin } from '../helpers/getHistorialAdmin'

export const UseFetchAdmin = (listaHistorialAdmin, setListaHistorialAdmin) => {

  if (listaHistorialAdmin.length === 0) {

    getHistorialAdmin().then((data) => {
      console.log('Historial admin', data);
      setListaHistorialAdmin(data);
    });

  }
}
