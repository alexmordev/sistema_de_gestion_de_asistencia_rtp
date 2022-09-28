const express = require('express');
const SancionService = require('../services/sancion.service');
const router = express.Router();
const service = new SancionService();

// //Rutas Ausencias 49
router.get('/sancion', SancionService);
router.post('/sancion', SancionService);
router.put('/sancion', SancionService);
router.delete('/sancion', SancionService);

module.exports = router;
