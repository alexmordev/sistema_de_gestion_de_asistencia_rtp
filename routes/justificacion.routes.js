const express = require('express');
const JustificacionService = require('../services/justificacion.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createJustificacionSchema, 
        getJustificacionSchema, 
        getJustificacionPeriodoSchema,
        deleteJustificacionSchema, 
        updateJustificacionSchema } = require('../schemas/justificacion.schema');
const router = express.Router();
const service = new JustificacionService();

// ruta por periodo: obtener ausencias y sanciones 
router.get('/periodo', 
  validatorHandler(getJustificacionPeriodoSchema, 'query'),
  async (req, res, next) => {
    try {
      const justificacion = await service.find(req.query);
      res.json(justificacion);
    } catch (error) {
      next(error);
    }
  }
);

// ruta por periodo: obtener justificaciones 
router.get('/justificacion', 
  validatorHandler(getJustificacionPeriodoSchema, 'query'),
  async (req, res, next) => {
    try {
      console.log(req.query)
      const justificacion = await service.findJustificacionPeriodo(req.query);
      res.json(justificacion);
    } catch (error) {
      next(error);
    }
  }
);

// ruta por credencial: obtener ausencias y sanciones 
router.get('/:id', 
  validatorHandler(getJustificacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const justificacion = await service.findOne(id);
      res.json(justificacion);
    } catch (error) {
      next(error);
    }
  }
);

// ruta por credencial: obtener justificaciones 
router.get('/justificacion/:id', 
  validatorHandler(getJustificacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const justificacion = await service.findJustificacion(id);
      res.json(justificacion);
    } catch (error) {
      next(error);
    }
  }
);

// ruta para crear justificacion
router.post('/',
  validatorHandler(createJustificacionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newJustificacion = await service.create(body);
      res.status(201).json(newJustificacion);
    } 
    catch (error) {
      next(error);
    }
  }
);

// router.patch('/:id',
//   validatorHandler(getJustificacionSchema, 'params'),
//   validatorHandler(updateJustificacionSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const justificacion = await service.update(id, body);
//       res.json(justificacion);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.delete('/:id',
  validatorHandler(deleteJustificacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id, unidades } = req.params;
      await service.delete(id,unidades);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;