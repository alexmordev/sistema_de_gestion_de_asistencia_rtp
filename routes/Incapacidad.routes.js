const express = require('express');
const IncapacidadService = require('../services/Incapacidad.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getIncapacidadSchema, createIncapacidadSchema, updateIncapacidadSchema } = require('../schemas/Incapacidad.schema');
const { getAusenciaSchema } = require('../schemas/Ausencia.schema');
const router = express.Router();
const service = new IncapacidadService();

router.get('/', async (req, res, next) => {
  try {
    const incapacidad = await service.find();
    res.json(incapacidad);
  } catch (error) {
    next(error);
  }
});

router.get('/busquedaTransmitido', 
validatorHandler(getIncapacidadSchema,getAusenciaSchema, 'body'),
async (req, res, next) => {
  try {
    const incapacidad = await service.busquedaTransmitido();
    res.json(incapacidad);
  } catch (error) {
    next(error);
  }
});

router.get('/consultaTransmitido', 
  async (req, res, next) => {
    try {
      const consulTransmitido = await service.consulTransmitidos();
      res.json(consulTransmitido);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/consultaPorTransmitir', 
  async (req, res, next) => {
    try {
      const consulTransmitido = await service.consulPorTransmir();
      res.json(consulTransmitido);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', 
  validatorHandler(getIncapacidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const incapacidad = await service.findOne(id);
      res.status(200).json(incapacidad)
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
      res.status(201).json(newIncapacidad);
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
      res.status(201).json(incapacidad);

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

//Prueba
router.get('/prueba', 
validatorHandler(getIncapacidadSchema,getAusenciaSchema, 'body'),
async (req, res, next) => {
  try {
    const incapacidad = await service.prueba();
    res.json(incapacidad);
  } catch (error) {
    next(error);
  }
});


module.exports = router;