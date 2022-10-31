const express = require('express');

const periodoRouter = require('./Periodo.routes');
const incapacidadRouter = require('./Incapacidad.routes');
const justificacionRouter = require('./justificacion.routes');
const catalogoConceptoRouter = require('./catalogoConcepto.routes')
const ausenciaRouter = require('./Ausencia.routes');
const sancionRouter = require('./Sancion.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./TipoIncapacidad.routes')
const InputRouter = require('./InputFront.routes');
const transmisionRouter = require('./transmision.routes');
const reporteConceptos = require('./reporteConceptos.routes')
// const reporteGeneral = require('./reporteGeneral.routes');
const reporteTransmitidos = require('./reporteTransmitidos.routes');


function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);
    router.use('/ramo-seguro', ramoSeguroRouter);
    router.use('/tipo-incapacidad', tipoIncapacidadRouter);
    router.use('/ausencia', ausenciaRouter);
    router.use('/sancion', sancionRouter);
    router.use('/incapacidad', incapacidadRouter);
    router.use('/justificacion', justificacionRouter);
    router.use('/catalogoConcepto', catalogoConceptoRouter);
    // router.use('/trabajador', TrabajadorRouter);
    router.use('/periodo', periodoRouter);
    router.use('/utils', InputRouter);
    router.use('/transmision', transmisionRouter);
    router.use('/reporteConceptos', reporteConceptos);
    router.use('/reporteTransmitidos', reporteTransmitidos);

    // router.use('/reporteGeneral', reporteGeneral);
}
module.exports = routerApi;