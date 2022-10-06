const express = require('express');
const TrabajadorService = require('../services/trabajador.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createTrabajadorSchema, getTrabajadorSchema, updateTrabajadorSchema } = require('../schemas/trabajador.schema');
const router = express.Router();
const service = new TrabajadorService();

router.get('/', async (req, res, next) => {
  try {
    const trabajador = await service.find();
      (trabajador != trabajador) ? res.status(404) : res.status(200).json({seccess:trabajador})
  } catch (error) {
    next(error);
  }
});
router.get('/:id', 
  validatorHandler(getTrabajadorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ausencia = await service.findOne(id);
      res.json(ausencia);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  validatorHandler(createTrabajadorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAusencia = await service.create(body);
      res.status(201).json(newAusencia);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getTrabajadorSchema, 'params'),
  validatorHandler(updateTrabajadorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const ausencia = await service.update(id, body);
      res.json(ausencia);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getTrabajadorSchema, 'params'),
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