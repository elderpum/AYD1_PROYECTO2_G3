const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerVehicle');

//New Vehicle
router.post('/registrarVehiculo', controller.createVehicle);

module.exports = router;