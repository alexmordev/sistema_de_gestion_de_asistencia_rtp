const express = require('express');
const ReporteGeneralService = require('../services/ReporteGeneral.service');
const validatorHandler = require('../middlewares/validator.handler');
const { params } = require('../schemas/Ausencia.schema');
const { getIncapacidadSchema } = require('../schemas/Incapacidad.schema');
const router = express.Router();
const service = new ReporteGeneralService();

router.get('/busquedaCredenFech', 
  validatorHandler(params,getIncapacidadSchema, 'query'),
  async (req, res, next) => {
  try {
      const reporte = await service.credencialRangofecha(req.query);
      res.json( reporte );
  } catch (error) {
    next(error);
  }
});

router.get('/busquedaMes', 
  validatorHandler(getIncapacidadSchema, 'query'),
  async (req, res, next) => {
  try {
      const reporteMes = await service.busquedaMes(req.query);
      res.json( reporteMes );
  } catch (error) {
    next(error);
  }
});

router.get('/busquedaFechas', 
  validatorHandler(params,getIncapacidadSchema, 'query'),
  async (req, res, next) => {
  try {
      const reporteMes = await service.busquedaFechas(req.query);
      res.json( reporteMes );
  } catch (error) {
    next(error);
  }
});

router.get('/busquedaCredencial', 
  validatorHandler(params,getIncapacidadSchema, 'query'),
  async (req, res, next) => {
  try {
      const reporteMes = await service.busquedaCredencial(req.query);
      res.json( reporteMes );
  } catch (error) {
    next(error);
  }
});






module.exports = router;
