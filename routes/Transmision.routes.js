const express = require('express');
const TransmisionService = require('../services/Transmision.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getTransmitidoSchema, registraTransmision } = require('../schemas/Transmision.schema');
// const { getPeriodoSchema } = require('../schemas/periodo.schema');
const router = express.Router();
const service = new TransmisionService();

// router.get('/', async (req, res, next) => {
//   try {
//     const transmision = await service.find();
//     res.json(transmision);
//   } catch (error) {
//     next(error);
//   }
// });

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
  validatorHandler(getTransmitidoSchema, 'body'), // verificar la data y el concepto
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

// router.patch('/:id',
//   validatorHandler(getTransmitidoSchema, 'params'),
//   validatorHandler(updateTransmitidoSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const transmision = await service.update(id, body);
//       res.json(transmision);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// router.delete('/:id',
//   validatorHandler(getTransmitidoSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({id});
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;