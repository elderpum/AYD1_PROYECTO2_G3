const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerVehicle');

//New Vehicle
router.post('/registrarVehiculo', controller.createVehicle);

//Get all Vehicles
router.get('/obtenerVehiculos', controller.getAllVehicles);

module.exports = router;