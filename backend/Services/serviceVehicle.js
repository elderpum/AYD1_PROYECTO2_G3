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

        // const randomName = generarRandom(5);
        // const nameFile = randomName + '_' + data.licensePlate + '.jpg';

        // const image = data.newImages;

        // const s3Response = await controllerS3.uploadFile(nameFile, image);
        // let imageLink = s3Response.link;

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al registrar el vehiculo'}
        }

        // const query2 = 'INSERT INTO Image (Vehicle_licensePlate, link) VALUES (?, ?)';

        // const values2 = [
        //     data.licensePlate,
        //     imageLink
        // ];

        // const result2 = await db.execute(query2, values2);

        // if(!result2){
        //     return {err: true, message: 'Error al registrar la imagen'}
        // }

        return {error: false, message: "Vehiculo registrado exitosamente"};
    } catch(error){
        return {error:true, message: error.message};
    }
}

// Get all Vehicles
exports.getAllVehicles = async () => {
    try{
        const query = 'SELECT * FROM Vehicle';
        const [result] = await db.execute(query);
        return result;
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