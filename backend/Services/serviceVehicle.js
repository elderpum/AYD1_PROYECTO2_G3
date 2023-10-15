const db = require('../Config/databaseConfig');
const bcrypt = require('bcrypt');

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

        const result = await db.execute(query, values);

        if(!result){
            return {err: true, message: 'Error al registrar el vehiculo'}
        }

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