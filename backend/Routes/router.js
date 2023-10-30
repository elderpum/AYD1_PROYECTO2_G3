const express = require('express');
const router = express.Router();
const routerAutomovil = require('./routerInventory');
const routerUser = require('./routerUser');
const routerVehicle = require('./routerVehicle');
const routerAdmin = require('./routerAdmin');
const routerRequest = require('./routerRequest');
const routerNotification = require('./routerNotification');

//GET
router.use('/inventario', routerAutomovil);
router.use('/usuario', routerUser);
router.use('/vehiculo', routerVehicle);
router.use('/admin', routerAdmin);
router.use('/solicitud', routerRequest);
router.use('/notificacion', routerNotification);

module.exports = router;