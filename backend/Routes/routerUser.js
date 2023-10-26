const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerUser');
const access = require('../Controllers/controllerAccess')

//New Client
router.post('/registrarCliente', controller.createClient);
router.post('/login', controller.login);

//New Employee
router.post('/registrarEmpleado', controller.createEmployee);

router.post('/generarCodigoAcceso', controller.generateAccessCode);
router.post('/verificarCodigoAcceso', controller.loginByCode);

//Get
router.get('/getInfo', access.anyRole, controller.getUserInfo);
module.exports = router;