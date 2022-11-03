const express = require('express');

const periodoRouter = require('./Periodo.routes');
const incapacidadRouter = require('./Incapacidad.routes');

const justificacionRouter = require('./Justificacion.routes');
const catalogoConceptoRouter = require('./CatalogoConcepto.routes')
const ausenciaRouter = require('./Ausencia.routes');
const sancionRouter = require('./Sancion.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./TipoIncapacidad.routes')
const InputRouter = require('./InputFront.routes');
const transmisionRouter = require('./Transmision.routes');
const reporteConceptos = require('./ReporteConceptos.routes')
const reporteGeneral = require('./ReporteGeneral.routes');
const reporteTransmitidos = require('./ReporteTransmitidos.routes');


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
    router.use('/periodo', periodoRouter);
    router.use('/utils', InputRouter);
    router.use('/transmision', transmisionRouter);
    router.use('/reporteConceptos', reporteConceptos);
    router.use('/reporteTransmitidos', reporteTransmitidos);

    router.use('/reporteGeneral', reporteGeneral);
}
module.exports = routerApi;