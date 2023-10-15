const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerVehicle');

//New Vehicle
router.post('/registrarVehiculo', controller.createVehicle);

//Get all Vehicles
router.get('/obtenerVehiculos', controller.getAllVehicles);

//Delete Vehicle
router.delete('/eliminarVehiculo', controller.deleteVehicle);

module.exports = router;