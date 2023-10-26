const express = require('express');
const router = express.Router();

//CONTROLLERS

const controllerAccess = require('../Controllers/controllerAccess');
const controllerAdmin = require('../Controllers/controllerAdmin');

//POST
router.post("/client/create",controllerAccess.isAnAdmin ,controllerAdmin.createClient);
router.post("/clients",controllerAccess.isAnAdmin ,controllerAdmin.getClients);

//PUT
router.post("/client/update", controllerAccess.isAnAdmin ,controllerAdmin.updateClient);

//DELETE
router.post("/client/delete", controllerAccess.isAnAdmin ,controllerAdmin.deleteClient);

module.exports = router;