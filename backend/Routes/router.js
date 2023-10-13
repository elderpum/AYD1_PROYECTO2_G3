const express = require('express');
const router = express.Router();
const routerAutomovil = require('./routerInventory');
const routerUser = require('./routerUser');
const routerVehicle = require('./routerVehicle');

//GET
router.use('/inventario', routerAutomovil);
router.use('/usuario', routerUser);
router.use('/vehiculo', routerVehicle);

module.exports = router;