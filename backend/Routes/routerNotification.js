const express = require('express');
const router = express.Router();
const controllerNotification = require('../Controllers/controllerNotification');
const controllerAccess = require('../Controllers/controllerAccess');

router.get('/ver-por-usuario', controllerAccess.isAClient,controllerNotification.GetNotificationByUser)
router.put('/actualizar-notificacion', controllerAccess.isAClient, controllerNotification.UpdateNotification)

module.exports = router;