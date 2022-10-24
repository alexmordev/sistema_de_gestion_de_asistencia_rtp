const express = require('express');
const ReportesService= require('../services/reportes.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getAusenciaSchema } = require('../schemas/reportes.schema');
const router = express.Router();
const service = new ReportesService();

router.get('/sga', async (req, res, next) => {
    validatorHandler(getAusenciaSchema, 'query')
    try {
        const data = await service.reporteSGA( req.query );
        res.json( data );
    } catch (error) {
        next(error);
    }
});
module.exports = router;