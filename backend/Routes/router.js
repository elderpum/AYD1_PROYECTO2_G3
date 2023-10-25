const express = require('express');
const router = express.Router();
const routerAutomovil = require('./routerInventory');
const routerUser = require('./routerUser');
const routerVehicle = require('./routerVehicle');
const routerAdmin = require('./routerAdmin');

//GET
router.use('/inventario', routerAutomovil);
router.use('/usuario', routerUser);
router.use('/vehiculo', routerVehicle);
router.use('/admin', routerAdmin);

module.exports = router;