const db = require("../Config/databaseConfig");

function ejemploAutomovil() {
  console.log("Ejemplo de un automovil");
  return "Automovil";
}

async function getInventory(data,id,type) {
  try {
    let client = ''
    let response = [];
    let query = ''
    if(type == 'admin' || type == 'employee'){
      query = `
            SELECT V.licensePlate, CONCAT(B.name,' ',S.name,' ',V.model) as name, V.rentalFee, V.state, R.User_email from Vehicle V
            inner join Series S on V.Series_idSeries = S.idSeries
            inner join Brand B on S.Brand_idBrand = B.idBrand
            left join Request R on V.licensePlate = R.Vehicle_licensePlate
            left join User U on R.User_email = U.email
      `
    }else if (type == 'client'){
      query = `
            SELECT V.licensePlate, CONCAT(B.name,' ',S.name,' ',V.model) as name, V.rentalFee, V.state from Vehicle V
            inner join Series S on V.Series_idSeries = S.idSeries
            inner join Brand B on S.Brand_idBrand = B.idBrand
      `
    }
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

    query += " ORDER BY V.licensePlate";

    [response] = await db.query(query, params);

    const vehiclesArr = [];

    query = `SELECT * from Image;`
    const [images] = await db.query(query);

    for (const vehicle of response) {

      const image = images.find((image) => image.Vehicle_licensePlate === vehicle.licensePlate);

      if(type == 'admin' || type == 'employee'){

        const vehicleObj = {
          id: vehicle.licensePlate,
          nombre: vehicle.name,
          imagen: image.link,
          cuota: vehicle.rentalFee,
          disponibilidad: vehicle.state + ' '+(vehicle.User_email ? vehicle.User_email : ' '),
        };
        vehiclesArr.push(vehicleObj);

      }else if (type == 'client'){

        const vehicleObj = {
          id: vehicle.licensePlate,
          nombre: vehicle.name,
          imagen: image.link,
          cuota: vehicle.rentalFee,
          disponibilidad: vehicle.state,
        };
        vehiclesArr.push(vehicleObj);

      }
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

    const tipos = {
      admin: 0,
      employee: 1,
      client: 2,
    };

    let fechaDev = ""
    let vehiculo = {}

    if(type == 'client'){
      query = `SELECT V.model, CONCAT(B.name,' ',S.name) as Brand, V.transmission, V.seatings, V.fuelType, V.category, R.rentalFee, V.licensePlate, R.rentalEnd  FROM Request R
                inner join ayd1p2.Vehicle V on R.Vehicle_licensePlate = V.licensePlate
              inner join ayd1p2.Series S on V.Series_idSeries = S.idSeries
              inner join ayd1p2.Brand B on S.Brand_idBrand = B.idBrand
                WHERE User_email = ?;`

      const [result] = await db.query(query, [id]);

      query = `SELECT link from Image
                WHERE Vehicle_licensePlate = ;`

      const [image] = await db.query(query, [result[0].licensePlate]);
      

      fechaDev = result[0].rentalEnd
      vehiculo = {
        imagen: image[0].link,
        modelo: result[0].model,
        marca: result[0].Brand,
        transmision: result[0].transmission,
        asientos: result[0].seatings,
        combustible: result[0].fuelType,
        categoria: result[0].category,
        cuota: result[0].rentalFee
      }
    }


    const numero = parseInt(tipos[type]);

    if (numero === NaN) {
      return {
        err: false,
        message: "Tipo de Usuario no Valido",
        data: {
          user: numero,
          marcas: marcasSend,
          inventario: [],
          totalPages: 0,
        },
      }
    }

    if(arregloBidimensional.length == 0){
      return {
        err: false,
        message: "No hay vehiculos disponibles",
        data: {
          user: numero,
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
        user: numero,
        marcas: marcasSend,
        inventario: arregloBidimensional[data.page - 1],
        totalPages: arregloBidimensional.length,
        client: ''
      },
    };
  } catch (error) {
    return {
      err: true,
      message: "Error getInventory",
      error: error.message,
    };
  }
}

module.exports = {
  ejemploAutomovil,
  getInventory,
};
