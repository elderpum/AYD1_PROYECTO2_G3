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