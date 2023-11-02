import { createContext, useContext, useState } from "react";

export const GeneralContext = createContext();

export function GeneralContextProvider(props) {

    const [vehiculo, setVehiculo] = useState({});

    const valor = {
        vehiculo, setVehiculo,
    };

    return (
        <GeneralContext.Provider value={valor}>
            {props.children}
        </GeneralContext.Provider>
    )
}

export function useGeneralContext() {
    const context = useContext(GeneralContext);

    if (!context) {
        throw new Error('bad context use');
    }
    return context;
}