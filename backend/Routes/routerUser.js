const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerUser');

//New Client
router.post('/registrarCliente', controller.createClient);

module.exports = router;