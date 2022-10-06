const express = require('express');

const periodoRouter = require('./Periodo.routes');
const incapacidadRouter = require('./incapacidad.routes');
const justificacionRouter = require('./justificacionAusencia.routes');
const catalogoConceptoRouter = require('./catalogoConcepto.routes')
const ausenciaRouter = require('./Ausencia.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./tipoIncapacidad.routes')
const TrabajadorService = require('./trabajador.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);
    router.use('/ramo-seguro', ramoSeguroRouter);
    router.use('/tipo-incapacidad', tipoIncapacidadRouter);
    router.use('/ausencia', ausenciaRouter);
    router.use('/incapacidad', incapacidadRouter);
    router.use('/justificacion', justificacionRouter);
    router.use('/catalogoConcepto', catalogoConceptoRouter);
    router.use('/trabajador', TrabajadorService);
    router.use('/periodo', periodoRouter);
}
module.exports = routerApi;
  