const express = require('express');
const router = express.Router();
const routerAutomovil = require('./routerInventory');
const routerUser = require('./routerUser');

//GET
router.use('/inventario', routerAutomovil);
router.use('/usuario', routerUser);

module.exports = router;