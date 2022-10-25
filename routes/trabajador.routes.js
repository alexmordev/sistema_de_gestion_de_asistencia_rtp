const express = require('express');
const TrabajadorService = require('../services/trabajador.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createTrabajadorSchema, getTrabajadorSchema, updateTrabajadorSchema } = require('../schemas/trabajador.schema');
const router = express.Router();
const service = new TrabajadorService();

router.get('/', async (req, res, next) => {
  try {
    const trabajador = await service.find();
      res.status(200).json({ msg: 'Todos los trabajadores', seccess:trabajador })
  } catch (error) {
    next(error);
  }
});
router.get('/:id', 
  validatorHandler(getTrabajadorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const trabajador = await service.findOne(id);
      res.status(200).json(trabajador)
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
      const newTrabajador = await service.create(body);
      res.status(201).json(newTrabajador);
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