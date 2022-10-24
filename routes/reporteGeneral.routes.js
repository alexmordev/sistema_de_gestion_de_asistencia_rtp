const express = require('express');
const ReporteGeneralService = require('../services/reporteGeneral.service');
const { createTrabajadorSchema, getTrabajadorSchema, updateTrabajadorSchema } = require('../schemas/trabajador.schema');
const validatorHandler = require('../middlewares/validator.handler');
const { getAusenciaSchema, params } = require('../schemas/ausencia.schema');
const { getIncapacidadSchema } = require('../schemas/incapacidad.schema');
const router = express.Router();
const service = new ReporteGeneralService();

router.get('/', 
  validatorHandler(getTrabajadorSchema,getIncapacidadSchema, 'query'),
  async (req, res, next) => {
  try {
      const reporte = await service.find(req.query);
      res.json( reporte );
  } catch (error) {
    next(error);
  }
});

router.get('/Mes', 
  validatorHandler(getIncapacidadSchema, 'query'),
  async (req, res, next) => {
  try {
      const reporteMes = await service.findThow(req.query);
      res.json( reporteMes );
  } catch (error) {
    next(error);
  }
});


module.exports = router;