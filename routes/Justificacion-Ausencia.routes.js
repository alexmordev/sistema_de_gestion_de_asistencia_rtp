const express = require('express');
const JustificacionService = require('./../services/justificacion.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getJustificacionSchema, createJustificacionSchema, updateJustificacionSchema } = require('../schemas/justificacion');
const router = express.Router();
const service = new JustificacionService();

router.get('/', async (req, res, next) => {
  try {
    const justificacion = await service.findAll();
    res.json(justificacion);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getJustificacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const justificacion = await service.findAllOrders(id);
      res.json(justificacion);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  validatorHandler(createJustificacionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newJustificacion = await service.create(body);
      res.status(201).json(newJustificacion);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getJustificacionSchema, 'params'),
  validatorHandler(updateJustificacionSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const justificacion = await service.update(id, body);
      res.json(justificacion);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getJustificacionSchema, 'params'),
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