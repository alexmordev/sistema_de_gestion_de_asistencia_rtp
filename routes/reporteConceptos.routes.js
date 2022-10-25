const express = require('express');
const ReporteService = require('../services/reporteConceptos.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getReporteSchema } = require('../schemas/reporteConceptos.schema');
const router = express.Router();
const service = new ReporteService();


router.get('/', 
  validatorHandler(getReporteSchema, 'query'),
  async (req, res, next) => {
    try {
      const reporte = await service.getReporte(req.query);
      res.json(reporte);
    } catch (error) {
      next(error);
    }
  }
);

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

module.exports = router;