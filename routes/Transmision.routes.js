const express = require('express');
const TransmisionService = require('../services/Transmision.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getTransmitidoSchema, registraTransmision, createTransmitidoSchema } = require('../schemas/Transmision.schema');
const router = express.Router();
const service = new TransmisionService();

router.get('/', async (req, res, next) => {
  try {
    const conceptos = await service.obtenerConceptos();
    res.json(conceptos);
  } catch (error) {
    next(error);
  }
});

router.get('/:concepto', 
  validatorHandler(getTransmitidoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { concepto } = req.params;
      const transmision = await service.getNoTransmitidos(concepto);
      res.json(transmision);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createTransmitidoSchema, 'body'), // verificar la data y el concepto
  async (req, res, next) => {
    try {
      const body = req.body;
      const newtransmision = await service.registraTransmision(body);
      res.status(201).json(newtransmision);
    } 
    catch (error) {
      next(error);
    }
  }
);

module.exports = router;