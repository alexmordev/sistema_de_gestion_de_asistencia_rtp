const express = require('express');
const justificacion = require('../services/justificacion.service');
const router = express.Router();
const service = new JustificacionAusencia();

// //Rutas Ausencias 49
router.get('/justificacion', justificacion);
router.post('/justificacion', justificacion);
router.put('/justificacion', justificacion);
router.delete('/justificacion', justificacion);

module.exports = router;

