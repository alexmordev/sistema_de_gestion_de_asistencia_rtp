const express = require('express');
const IncapacidadService = require('../services/incapacidad.service');
const router = express.Router();
const service = new IncapacidadService();

// //Rutas Ausencias 49
router.get('/incapacidad', IncapacidadService);
router.post('/incapacidad', IncapacidadService);
router.put('/incapacidad', IncapacidadService);
router.delete('/incapacidad', IncapacidadService);

module.exports = router;

