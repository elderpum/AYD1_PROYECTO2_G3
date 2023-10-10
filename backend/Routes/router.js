const express = require('express');
const router = express.Router();
const routerAutomovil = require('./routerInventory');

//GET
router.use('/inventario', routerAutomovil);

module.exports = router;