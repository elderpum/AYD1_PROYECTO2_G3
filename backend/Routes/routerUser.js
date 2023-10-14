const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerUser');

//New Client
router.post('/registrarCliente', controller.createClient);
router.post('/login', controller.login);

//New Employee
router.post('/registrarEmpleado', controller.createEmployee);

module.exports = router;