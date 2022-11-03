const express = require('express');
const router = express.Router();
const SancionService = require('../services/Sancion.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createSancionSchema, updateSancionSchema, getSancionSchema } = require('../schemas/Sancion.schema'); 
const service = new SancionService();

router.get('/', async (req, res, next) => {
  try {
    const sancion = await service.find();
    res.json(sancion);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getSancionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sancion = await service.findOne(id);
      res.json(sancion);
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
      const newSancion = await service.create(body);
      res.status(201).json(newSancion);
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
      const sancion = await service.update(id, body);
      res.json(sancion);
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
