const express = require('express');
const CatalogoService = require('../services/CatalogoConcepto.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateCatalogoConceptoSchema, createCatalogoConceptoSchema, getCatalogoConceptoSchema } = require('../schemas/CatalogoConcepto.schema');
const router = express.Router();
const service = new CatalogoService();

router.get('/', async (req, res, next) => {
  try {
    const concepto = await service.find();
    res.status(200).json(concepto)
    // res.json(ausencia);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getCatalogoConceptoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const concepto = await service.findOne(id);
      res.json(concepto);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  validatorHandler(createCatalogoConceptoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newConcepto = await service.create(body);
      res.status(201).json(newConcepto);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getCatalogoConceptoSchema, 'params'),
  validatorHandler(updateCatalogoConceptoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const concepto = await service.update(id, body);
      res.json(concepto);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getCatalogoConceptoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json(id);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;