const express = require('express');
const TipoIncapacidadService = require('../services/tipoIncapacidad.service');
const validatorHandler = require('../middlewares/validator.handler');
const {  createTipoIncapacidadSchema, updateTipoIncapacidadSchema, getTipoIncapacidadSchema  } = require('../schemas/tipoIncapacidad.schema');
const router = express.Router();
const service = new TipoIncapacidadService();

router.get('/', async (req, res, next) => {
  try {
    const ausencia = await service.find();
    res.json(ausencia);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', 
  validatorHandler(getTipoIncapacidadSchema, 'params'),
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
  validatorHandler(createTipoIncapacidadSchema, 'body'),
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
  validatorHandler(getTipoIncapacidadSchema, 'params'),
  validatorHandler(updateTipoIncapacidadSchema, 'body'),
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
  validatorHandler(getTipoIncapacidadSchema, 'params'),
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