const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const ReporteTransmitidosService = require('../services/reporteTransmitidos.service');
const { getReporteTransmitidosSchema } = require('../schemas/reporteTransmitidos.schema');
const router = express.Router();
const service = new ReporteTransmitidosService();

router.get('/form',
  async (req, res, next) => {
    try {
      const form = await service.getForm();
      res.json(form);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', 
  validatorHandler(getReporteTransmitidosSchema, 'query'),
  async (req, res, next) => {
    try {
      const reporte = await service.getReporte(req.query);
      res.json(reporte);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;