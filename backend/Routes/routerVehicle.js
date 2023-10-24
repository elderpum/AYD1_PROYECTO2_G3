const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerVehicle');
const access = require('../Controllers/controllerAccess')

//New Vehicle
router.post('/registrarVehiculo', controller.createVehicle);

//Get all Vehicles
router.get('/obtenerVehiculos', controller.getAllVehicles);

//Delete Vehicle
router.delete('/eliminarVehiculo', controller.deleteVehicle);

//Update Vehicle
router.put('/actualizarVehiculo', controller.updateVehicle);

//Update Rental Fee
router.put('/actualizarTarifa',access.isAnEmployee, controller.updateRentalFee);

module.exports = router;