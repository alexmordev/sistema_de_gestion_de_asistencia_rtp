const express = require('express');

const periodoRouter = require('./Periodo.routes');
const incapacidadRouter = require('./incapacidad.routes');
const justificacionRouter = require('./justificacionAusencia.routes');
const catalogoConceptoRouter = require('./catalogoConcepto.routes')
const ausenciaRouter = require('./Ausencia.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./tipoIncapacidad.routes')
const TrabajadorRouter = require('./trabajador.routes');
const InputRouter = require('./InputFront.routes');


function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);
    router.use('/ramo-seguro', ramoSeguroRouter);
    router.use('/tipo-incapacidad', tipoIncapacidadRouter);
    router.use('/ausencia', ausenciaRouter);
    router.use('/incapacidad', incapacidadRouter);
    router.use('/justificacion', justificacionRouter);
    router.use('/catalogoConcepto', catalogoConceptoRouter);
    router.use('/trabajador', TrabajadorRouter);
    router.use('/periodo', periodoRouter);
    router.use('/utils', InputRouter);

}
module.exports = routerApi;
  