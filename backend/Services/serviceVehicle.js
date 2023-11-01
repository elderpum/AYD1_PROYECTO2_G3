const db = require('../Config/databaseConfig');
const bcrypt = require('bcrypt');
const controllerS3 = require("../Controllers/controllerS3");

function generarRandom(num) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < num; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }  
    return result;
}

//Create vehicle
exports.newVehicle = async (data) => {
    try{
        const query = 'INSERT INTO Vehicle (licensePlate, model, Series_idSeries, transmission, seatings, fuelType, rentalFee, state, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const values =[
            data.licensePlate, 
            data.model, 
            data.Series_idSeries, 
            data.transmission, 
            data.seatings, 
            data.fuelType, 
            data.rentalFee, 
            data.state, 
            data.category
        ];

        const randomName = generarRandom(5);
        const nameFile = randomName + '_' + data.licensePlate + '.jpg';

        const image = data.newImages;

        const s3Response = await controllerS3.uploadFile(nameFile, image);
        let imageLink = s3Response.link;

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al registrar el vehiculo'}
        }

        const query2 = 'INSERT INTO Image (Vehicle_licensePlate, link) VALUES (?, ?)';

        const values2 = [
            data.licensePlate,
            imageLink
        ];

        const result2 = await db.execute(query2, values2);

        if(!result2){
            return {err: true, message: 'Error al registrar la imagen'}
        }

        const brand = data.brand;
        const serie = data.Series_idSeries;

        // Agregamos la brand a la tabla Brand, pero si no esta repetida no se agrega
        const query3 = 'INSERT IGNORE INTO Brand (name) VALUES (?)';
        const values3 = [brand];

        const result3 = await db.execute(query3, values3);

        if(!result3){
            return {err: true, message: 'Error al registrar la marca'}
        }

        // Obtenemos el id de la brand que acabamos de agregar
        const query4 = 'SELECT idBrand FROM Brand WHERE name = ?';
        const [result4] = await db.execute(query4, [brand]);

        if(!result4){
            return {err: true, message: 'Error al obtener el id de la marca'}
        }

        // Agregamos a la tabla Series el nombre de la brand y vinculamos el id de la brand con el id de la serie
        const query5 = 'INSERT INTO Series (name, Brand_idBrand) VALUES (?, ?)';
        const values5 = [brand, result4[0].idBrand];

        const result5 = await db.execute(query5, values5);

        if(!result5){
            return {err: true, message: 'Error al registrar la serie'}
        }

        return {error: false, message: "Vehiculo registrado exitosamente"};
    } catch(error){
        console.log(error)
        return {error:true, message: error.message};
    }
}

exports.getMarcas = async () => {
    try {
        const query = `SELECT b.idBrand, b.name, s.idSeries, s.name as serie FROM Brand b
        INNER JOIN Series s ON b.idBrand = s.Brand_idBrand`;
        const [result] = await db.execute(query);
        //console.log(result)

        return {error: false, marcas: result}
    } catch (error) {
        return {error:true, message: error.message};
    }
}

// Get all Vehicles
exports.getAllVehicles = async () => {
    try{
        // Obtenemos todos los vehículos y a su vez, obtenemos las imagenes asociadas a cada vehículo
        const query = `SELECT V.licensePlate, V.model, V.Series_idSeries, V.transmission,
                    V.seatings, V.fuelType, V.rentalFee, V.state, V.category,
                    S.idSeries, S.name as serie, B.idBrand, B.name as name 
                    FROM Vehicle V
                    inner join Series S on V.Series_idSeries = S.idSeries
                    inner join Brand B on S.Brand_idBrand = B.idBrand`;
        const [result] = await db.execute(query);

        if(!result){
            return {err: true, message: 'Error al obtener los vehiculos'}
        }

        // Obtenemos en un array todas las licensePlate de los vehículos
        const licensePlates = [];
        for(let i = 0; i < result.length; i++){
            licensePlates.push(result[i].licensePlate);
        }

        // Obtenemos las imagenes de cada vehículo
        const images = [];
        for(let i = 0; i < licensePlates.length; i++){
            const query2 = 'SELECT * FROM Image WHERE Vehicle_licensePlate = ?';
            const [result2] = await db.execute(query2, [licensePlates[i]]);
            images.push(result2);
        }

        if(!images){
            return {err: true, message: 'Error al obtener las imagenes de los vehiculos'}
        }

        // Dentro del mismo json de cada vehículo, agregamos las imagenes
        for(let i = 0; i < result.length; i++){
            result[i].images = images[i];
        }

        return {error: false, message: "Vehiculos obtenidos exitosamente", vehicles: result};
    } catch(error){
        return {error: true, message: error.message};
    }
}

// Delete Vehicle by licensePlate in req.body
exports.deleteVehicle = async (licensePlate) => {
    try{
        const query = 'DELETE FROM Vehicle WHERE licensePlate = ?';
        const result = await db.execute(query, [licensePlate]);
        if(!result){
            return {err: true, message: 'Error al eliminar el vehiculo'}
        }

        // Eliminamos las imagenes del vehiculo
        const query2 = 'DELETE FROM Image WHERE Vehicle_licensePlate = ?';
        const result2 = await db.execute(query2, [licensePlate]);

        if(!result2){
            return {err: true, message: 'Error al eliminar las imagenes del vehiculo'}
        }

        return {error: false, message: "Vehiculo eliminado exitosamente"};
    } catch(error){
        return {error: true, message: error.message};
    }
}

// Update Vehicle by licensePlate in req.body
exports.updateVehicle = async (data) => {
    try {
        const query = 'UPDATE Vehicle SET model = ?, Series_idSeries = ?, transmission = ?, seatings = ?, fuelType = ?, rentalFee = ?, state = ?, category = ? WHERE licensePlate = ?';

        const values = [
            data.model,
            data.Series_idSeries,
            data.transmission,
            data.seatings,
            data.fuelType,
            data.rentalFee,
            data.state,
            data.category,
            data.licensePlate
        ]

        if (data.addImages != null) {
            const randomName = generarRandom(5);
            const nameFile = randomName + '_' + data.licensePlate + '.jpg';

            const image = data.addImages;

            const s3Response = await controllerS3.uploadFile(nameFile, image);
            let imageLink = s3Response.link;

            const query2 = 'INSERT INTO Image (Vehicle_licensePlate, link) VALUES (?, ?)';

            const values2 = [
                data.licensePlate,
                imageLink
            ];

            const result2 = await db.execute(query2, values2);

            if(!result2){
                return {err: true, message: 'Error al registrar la imagen'}
            }
            
        }

        if (data.deleteImages != null) {
            for(let i = 0; i < data.deleteImages.length; i++){
                const query3 = 'DELETE FROM Image WHERE idImage = ?';
                const result3 = await db.execute(query3, [data.deleteImages[i]]);
    
                if(!result3){
                    return {err: true, message: 'Error al eliminar la imagen'}
                }
            }
        }

        if (data.brand != null) {
            const brand = data.brand;
            const serie = data.Series_idSeries;

            // Agregamos la brand a la tabla Brand, pero si no esta repetida no se agrega
            const query4 = 'INSERT IGNORE INTO Brand (name) VALUES (?)';
            const values4 = [brand];

            const result4 = await db.execute(query4, values4);

            if(!result4){
                return {err: true, message: 'Error al registrar la marca'}
            }

            // Obtenemos el id de la brand que acabamos de agregar
            const query5 = 'SELECT idBrand FROM Brand WHERE name = ?';
            const [result5] = await db.execute(query5, [brand]);

            if(!result5){
                return {err: true, message: 'Error al obtener el id de la marca'}
            }

            // Agregamos a la tabla Series el nombre de la brand y vinculamos el id de la brand con el id de la serie
            const query6 = 'INSERT INTO Series (name, Brand_idBrand) VALUES (?, ?)';
            const values6 = [brand, result5[0].idBrand];

            const result6 = await db.execute(query6, values6);

            if(!result6){
                return {err: true, message: 'Error al registrar la serie'}
            }
            
        }

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al actualizar el vehiculo'}
        }

        return {error: false, message: "Vehiculo actualizado exitosamente"};
    } catch (error) {
        return {error: true, message: error.message};
    }
}

// Update vehicle rentalFee by licensePlate in req.body
exports.updateRentalFee = async (data) => {
    try {
        const query = 'UPDATE Vehicle SET rentalFee = ? WHERE licensePlate = ?';

        const values = [
            data.newRentalFee,
            data.licensePlate
        ]

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al actualizar el vehiculo'}
        }

        const query2 = 'UPDATE Request SET rentalFee = ? WHERE Vehicle_licensePlate = ?';

        const values2 = [
            data.newRentalFee,
            data.licensePlate
        ]

        const result2 = await db.execute(query2, values2);

        if(!result2){
            return {err: true, message: 'Error al actualizar el vehiculo'}
        }

        return {error: false, message: "Vehiculo actualizado exitosamente"};
    } catch (error) {
        return {error: true, message: error.message};
    }
}

// Details of a vehicle by licensePlate in req.params
exports.getVehicleDetails = async (licensePlate) => {
    try{
        const query = 'SELECT * FROM Vehicle WHERE licensePlate = ?';
        const [result] = await db.execute(query, [licensePlate]);
        const query2 = 'SELECT * FROM Image WHERE Vehicle_licensePlate = ?';
        const [result2] = await db.execute(query2, [licensePlate]);

        if(!result){
            return {err: true, message: 'Error al obtener el vehiculo'}
        }

        if(!result2){
            return {err: true, message: 'Error al obtener las imagenes del vehiculo'}
        }

        return {error: false, message: "Vehiculo obtenido exitosamente", vehicle: result, images: result2};
    } catch(error){
        return {error: true, message: error.message};
    }
}

// Rent a vehicle, all info in req.body
// Este endpoint sirve para rentar un vehiculo, se debe enviar la siguiente informacion en el body y es del lado del cliente:
exports.rentVehicle = async (data) => {
    try{
        var today = new Date();
        var localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
        var state = "accepted";

        const query = 'INSERT INTO Request (User_email, Vehicle_licensePlate, state, processedBy, date_, rentalStart, rentalEnd, rentalFee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            data.userEmail,
            data.licensePlate,
            state,
            null,
            localDate,
            data.rentalStart,
            data.rentalEnd,
            data.rentalFee
        ];

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al rentar el vehiculo'}
        }

        // Pasamos a unavailable el vehiculo en la tabla Vehicle
        const query2 = 'UPDATE Vehicle SET state = "unavailable" WHERE licensePlate = ?';
        const values2 = [data.licensePlate];

        const result2 = await db.execute(query2, values2);

        if(!result2){
            return {err: true, message: 'Error al actualizar el estado del vehiculo'}
        }

        return {error: false, message: "Vehiculo rentado exitosamente"};
    } catch(error){
        return {error: true, message: error.message};
    }
}