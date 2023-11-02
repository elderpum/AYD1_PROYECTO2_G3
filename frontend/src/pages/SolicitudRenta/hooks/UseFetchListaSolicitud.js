import { getListaSolicitud } from "../helpers/getListaSolicitud"

export const UseFetchListaSolicitud = (listaSolicitud, setListaSolicitud) => {

    if (listaSolicitud.length === 0) {

        getListaSolicitud().then((data) => {  
            setListaSolicitud(data);
        });
    }

}
