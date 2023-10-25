const express = require('express');
const router = express.Router();

//CONTROLLERS

const controllerAccess = require('../Controllers/controllerAccess');
const controllerAdmin = require('../Controllers/controllerAdmin');


//GET
router.get("/clients", controllerAdmin.getClients);

//POST
router.post("/client", controllerAdmin.createClient);

//PUT
router.put("/client",  controllerAdmin.updateClient);

//DELETE
router.delete("/client", controllerAdmin.deleteClient);

module.exports = router;