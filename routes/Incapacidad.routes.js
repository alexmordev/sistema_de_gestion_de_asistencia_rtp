const express = require('express');
const IncapacidadService = require('./../services/incapacidad.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getIncapacidadSchema, createIncapacidadSchema, updateIncapacidadSchema } = require('../schemas/incapacidad.schema');
const router = express.Router();
const service = new IncapacidadService();

router.get('/', async (req, res, next) => {
  try {
    const incapacidad = await service.find();
    res.status(200).json({ success: incapacidad });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getIncapacidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ausencia = await service.findAllOrders(id);
      res.json(ausencia);
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