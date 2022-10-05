const express = require('express');
const CatalogoService = require('../services/catalogoConcepto.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateCatalogoConceptoSchema, createCatalogoConceptoSchema, getCatalogoConceptoSchema } = require('../schemas/catalogoConcepto.schema');
const router = express.Router();
const service = new CatalogoService();

router.get('/', async (req, res, next) => {
  try {
    const concepto = await service.find();
    res.status(200).json({ success:'Datos Catalogo Concepto',msg: concepto})
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
      const ausencia = await service.findOne(id);
      res.json(ausencia);
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


      res.status(201).json({msg: newConcepto});
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
      const ausencia = await service.update(id, body);
      res.json(ausencia);
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
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;