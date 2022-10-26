const express = require('express');
const AusenciaService = require('../services/ausencia.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateAusenciaSchema, createAusenciaSchema, getAusenciaSchema } = require('../schemas/ausencia.schema');
const router = express.Router();
const service = new AusenciaService();

router.get('/', async (req, res, next) => {
  try {
    const ausencia = await service.find();
    res.status(200).json(ausencia)
  } catch (error) {
    next(error);
  }
});
router.get('/:id', 
  validatorHandler(getAusenciaSchema, 'params'),
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
  validatorHandler(createAusenciaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      // console.log(body);
      const newAusencia = await service.create(body);


      res.status(201).json({altas_sga: [newAusencia]});
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getAusenciaSchema, 'params'),
  validatorHandler(updateAusenciaSchema, 'body'),
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
  validatorHandler(getAusenciaSchema, 'params'),
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