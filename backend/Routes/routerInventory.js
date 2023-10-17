const express = require('express');
const router = express.Router();

//CONTROLLERS
const controllerAutomovil = require('../Controllers/controllerInventory');
const controllerAccess = require('../Controllers/controllerAccess');


//GET
router.get("/ejemplo", controllerAutomovil.ejemplo);



//POST
router.post("/get", controllerAccess.isAClient ,controllerAutomovil.getInventory);

module.exports = router;