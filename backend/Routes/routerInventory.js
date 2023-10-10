const express = require('express');
const router = express.Router();

//CONTROLLERS
const controllerAutomovil = require('../Controllers/controllerInventory');


//GET
router.get("/ejemplo", controllerAutomovil.ejemplo);



//POST
router.post("/get", controllerAutomovil.getInventory);

module.exports = router;