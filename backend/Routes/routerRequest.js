const express = require('express');
const router = express.Router();
const controllerRequest = require('../Controllers/controllerRequest');
const controllerAccess = require('../Controllers/controllerAccess');

router.get('/historial-cliente', controllerAccess.isAClient,controllerRequest.GetRequestByUser);
router.get('/solicitudes-no-procesadas', controllerAccess.isAnEmployee, controllerRequest.GetNonProcessedRequest);
router.get('/historial-admin', controllerAccess.isAnAdmin, controllerRequest.GetRequestsToAdminView);
router.put('/responder-solicitud', controllerAccess.isAnEmployee, controllerRequest.RespondRequest);
router.get('/historial-empleado', controllerAccess.isAnEmployee, controllerRequest.GetProcessedRequests);

module.exports = router;