const express = require('express');
const TransmisionService = require('../services/transmision.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getTransmitidoSchema, createTransmitidoSchema, updateTransmitidoSchema } = require('../schemas/transmision.schema');
// const { getPeriodoSchema } = require('../schemas/periodo.schema');
const router = express.Router();
const service = new TransmisionService();

router.get('/', async (req, res, next) => {
  try {
    const transmision = await service.find();
    res.json(transmision);
  } catch (error) {
    next(error);
  }
});

// router.get('/', 
//   validatorHandler(getPeriodoSchema, 'query'),
//   async (req, res, next) => {
//     try {
     
//       const PeriodoIncapacidad = await service.findTransmitidas(req.query);
//         (PeriodoIncapacidad === null) ? res.status(404).json({msg: 'Periodo no encontrado'}) : res.status(200).json({ PeriodoIncapacidad: PeriodoIncapacidad })
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.get('/:id', 
  validatorHandler(getTransmitidoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const transmision = await service.findAllOrders(id);
      res.json(transmision);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createTransmitidoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newtransmision = await service.create(body);
      res.status(201).json(newtransmision);
    } 
    catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getTransmitidoSchema, 'params'),
  validatorHandler(updateTransmitidoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const transmision = await service.update(id, body);
      res.json(transmision);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getTransmitidoSchema, 'params'),
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