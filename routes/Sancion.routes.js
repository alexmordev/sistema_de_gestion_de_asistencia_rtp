const express = require('express');
const router = express.Router();
const SansionService = require('./../services/justificacion.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSancionSchema, getSancionSchema, updateSancionSchema } = require('../schemas/sancion.schema'); 
const service = new SansionService();

router.get('/', async (req, res, next) => {
  try {
    const justificacion = await service.findAll();
    res.json(justificacion);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getSancionSchema, 'params'),
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
  validatorHandler(createSancionSchema, 'body'),
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
  validatorHandler(getSancionSchema, 'params'),
  validatorHandler(updateSancionSchema, 'body'),
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
  validatorHandler(getSancionSchema, 'params'),
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
