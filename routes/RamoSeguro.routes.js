const express = require('express');
const RamoSeguroService = require('../services/RamoSeguro.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createRamoSeguroSchema, updateRamoSeguroSchema, getRamoSeguroSchema } = require('../schemas/RamoSeguro.schema');
const router = express.Router();
const service = new RamoSeguroService();

router.get('/', async (req, res, next) => {
  try {
    const ramoSeguroData = await service.find();
    const data = ramoSeguroData.map( el => {
      return{"id": el.id, "name":el.nombre}
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', 
  validatorHandler(getRamoSeguroSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ramoSeguro = await service.findOne(id);
      res.json(ramoSeguro);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  validatorHandler(createRamoSeguroSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      body.nombre = req.body.name;
      delete body.name;
      const newRamoSeguro = await service.create(body);
      res.status(201).json(newRamoSeguro);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getRamoSeguroSchema, 'params'),
  validatorHandler(updateRamoSeguroSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      body.nombre = req.body.name;
      delete body.name;
      const ramoSeguro = await service.update(id, body);
      res.json(ramoSeguro);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getRamoSeguroSchema, 'params'),
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