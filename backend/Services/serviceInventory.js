const fs = require("fs");
const db = require("../Config/databaseConfig");

function ejemploAutomovil() {
  console.log("Ejemplo de un automovil");
  return "Automovil";
}

async function getInventory(data) {
  try {
    //TODO: implementar segun tipo de usuario
    
    let response = [];
    let query =
    "SELECT V.licensePlate, CONCAT(B.name,' ',S.name,' ',V.model) as name, V.rentalFee, V.state from Vehicle V inner join Series S on V.Series_idSeries = S.idSeries inner join Brand B on S.Brand_idBrand = B.idBrand;";

    const params = [];

    if (data.categoria && data.marca) {
      query += " WHERE B.name = ? AND V.category = ?";
      params.push(data.marca, data.categoria);
    } else if (data.categoria) {
      query += " WHERE V.category = ?";
      params.push(data.categoria);
    } else if (data.marca) {
      query += " WHERE B.name = ?";
      params.push(data.marca);
    }

    query += " ORDER BY V.id_vehicle";

    [response] = await db.query(query, params);

    const vehiclesArr = [];

    for (const vehicle of response) {
      const vehicleObj = {
        id: vehicle.id_vehicle,
        nombre: vehicle.name,
        imagen: "https://cdn.motor1.com/images/mgl/4JyZA/s1/lamborghini-aventador-lp-780-4-ultimae.jpg",
        cuota: vehicle.rentalFee,
        disponibilidad: vehicle.state,
      };
      vehiclesArr.push(vehicleObj);

    }

    const arregloBidimensional = [];

    for (let i = 0; i < vehiclesArr.length; i += 9) {
      const subarreglo = vehiclesArr.slice(i, i + 9);
      arregloBidimensional.push(subarreglo);
    }
    query = "SELECT * from Brand";

    const [marcas] = await db.query(query);

    const marcasSend = []
    for(const marca of marcas){
      marcasSend.push(marca.name)
    }

    if(arregloBidimensional.length == 0){
      return {
        err: false,
        message: "No hay vehiculos disponibles",
        data: {
          marcas: marcasSend,
          inventario: [],
          totalPages: 0,
        },
      }
    }

    return {
      err: false,
      message: "Vehiculos encontrados",
      data: {
        marcas: marcasSend,
        inventario: arregloBidimensional[data.page - 1],
        totalPages: arregloBidimensional.length,
      },
    };
  } catch (error) {
    return {
      err: true,
      message: "Error getInventory",
      error: error,
    };
  }
}

module.exports = {
  ejemploAutomovil,
  getInventory,
};
