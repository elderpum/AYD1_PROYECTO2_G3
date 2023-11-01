const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controllerUser');
const access = require('../Controllers/controllerAccess')

//New Client
router.post('/registrarCliente', controller.createClient);
router.post('/login', controller.login);

//New Employee
router.post('/registrarEmpleado', controller.createEmployee);

// Update Employee
router.post('/actualizarEmpleado', controller.updateEmployee);

// Delete Employee
router.post('/eliminarEmpleado', controller.deleteEmployee);

// Get All Employees
router.get('/obtenerEmpleados', controller.getAllEmployees);

router.post('/generarCodigoAcceso', controller.generateAccessCode);
router.post('/verificarCodigoAcceso', controller.loginByCode);

//Get
router.get('/getInfo', access.anyRole, controller.getUserInfo);
module.exports = router;