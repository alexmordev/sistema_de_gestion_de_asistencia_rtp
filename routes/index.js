const express = require('express');
// const ausenciaRouter = require('./Ausencia.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./TipoIncapacidad.routes');
const ausenciaRouter = require('./Ausencia.routes');
const incapacidadRouter = require('./Incapacidad.routes');
const justificacionRouter = require('./Justificacion-Ausencia.routes');
const periodoRouter = require('./Periodo.routes');


function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);
    // router.use('/ausencia', ausenciaRouter);
    router.use('/ramo-seguro', ramoSeguroRouter);
    router.use('/tipo-incapacidad', tipoIncapacidadRouter);
    router.use('/ausencia', ausenciaRouter);
    router.use('/incapacidad', incapacidadRouter);
    router.use('/justificacion', justificacionRouter);
    router.use('/periodo', periodoRouter);
}
module.exports = routerApi;
  