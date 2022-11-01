const express = require('express');
const Perido = require('../services/Periodo.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createPeriodoSchema,
        updatePeriodoSchema,
        getPeriodoSchema,
        deletePeriodoSchema } = require('./../schemas/Periodo.schema');
const router = express.Router();
const service = new Perido();

router.get('/', async (req, res, next) => {
    validatorHandler(getPeriodoSchema, 'query')
    try {
      const periodos = await service.find(req.query);
      res.json(periodos);
    } catch (error) {
      next(error);
    }
});
router.get('/get-one', 
    validatorHandler(getPeriodoSchema,'query'),
    
    async (req, res, next) => {
    try {
      const periodo = await service.findOne(req.query);
      res.json(periodo);
    } catch (error) {
      next(error);
    }
  }
);
/** Habilitar para completar el CRUD
router.post('/',
  validatorHandler(createPeriodoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPeriodo = await service.create(body);
      res.status(201).json(newPeriodo);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getPeriodoSchema, 'params'),
  validatorHandler(updatePeriodoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const periodo = await service.update(id, body);
      res.json(periodo);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getPeriodoSchema, 'params'),
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
*/
module.exports = router;