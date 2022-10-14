const express = require('express');
const IncapacidadService = require('../services/incapacidad.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getIncapacidadSchema, createIncapacidadSchema, updateIncapacidadSchema, gePeriodoSchema, altas_sga } = require('../schemas/incapacidad.schema');
const router = express.Router();
const service = new IncapacidadService();

router.get('/', async (req, res, next) => {
  try {
    const incapacidad = await service.find();
    res.json({ success:'Datos Incapacidad',msg: incapacidad });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getIncapacidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const incapacidad = await service.findOne(id);
      (incapacidad === null) ? res.status(404).json({msg: 'Incapacidad no encontrada'}) : res.status(200).json({seccess:'Datos incapacidad', incapacidad})
    } catch (error) {
      next(error);
    }
  }
);
//periodo
router.get('/periodo/:id', 
  validatorHandler(getIncapacidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const FechasPeriodo = await service.findOnePeriodo(id);
      (FechasPeriodo === null) ? res.status(404).json({msg: 'Periodo no encontrado'}) : res.status(200).json({ Periodo: {id}, FechasPeriodo: FechasPeriodo})
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createIncapacidadSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newIncapacidad = await service.create(body);
      res.status(201).json({ Incapacidad_Registrada: [newIncapacidad] });
    } 
    catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getIncapacidadSchema, 'params'),
  validatorHandler(updateIncapacidadSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const incapacidad = await service.update(id, body);
      res.json(incapacidad);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getIncapacidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;