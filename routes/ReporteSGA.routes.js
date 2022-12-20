const express = require('express');
const ReporteSGAService= require('../services/ReporteSGA.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getReproteSGASchema } = require('../schemas/ReporteSGA.schema');
const router = express.Router();
const service = new (ReporteSGAService);

router.get('/', async (req, res, next) => {
    validatorHandler(getReproteSGASchema, 'query')
    try {
        const data = await service.reporteSGA(req.query);
        res.json( data );
    } catch (error) {
        next(error);
    }
});
module.exports = router;