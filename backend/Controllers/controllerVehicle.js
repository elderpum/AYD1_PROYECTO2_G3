const service = require('../Services/serviceVehicle')

exports.createVehicle = async (req, res) => {
    const result = await service.newVehicle(req.body);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
}