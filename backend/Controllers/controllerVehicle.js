const service = require('../Services/serviceVehicle')

exports.createVehicle = async (req, res) => {
    const result = await service.newVehicle(req.body);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
}

exports.getAllVehicles = async (req, res) => {
    const result = await service.getAllVehicles();
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
}

exports.deleteVehicle = async (req, res) => {
    const result = await service.deleteVehicle(req.body.licensePlate);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
}

exports.updateVehicle = async (req, res) => {
    const result = await service.updateVehicle(req.body);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
}

exports.updateRentalFee = async (req, res) => {
    const result = await service.updateRentalFee(req.body);
    if(result.error){
        console.log(result.message);
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
}