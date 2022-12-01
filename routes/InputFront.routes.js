const express = require('express');
const InputService = require('../services/InputsFront.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getTrabajadorPeridoSchema } = require('../schemas/InputFront.schema');
const router = express.Router();
const service = new InputService();

router.get('/trabajador-periodo/:id', 
  validatorHandler(getTrabajadorPeridoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await service.trabajadorPerido(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/trabajador/:id', 
  validatorHandler(getTrabajadorPeridoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await service.getTrabajador(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;