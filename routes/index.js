const express = require('express');
const ausenciaRouter = require('./ausencia.routes');
const incapacidadRouter = require('./incapacidad.routes');
const catalogoConceptoRouter = require('./catalogoConcepto.routes')
const justificacionRouter = require('./justificacion.routes');

// const ausenciaRouter = require('./Ausencia.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./tipoIncapacidad.routes')
const trabajadorRuter = require('./trabajador.routes');
const transmisionRouter = require('./transmision.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);

    router.use('/ausencia', ausenciaRouter);
    router.use('/incapacidad', incapacidadRouter);
    router.use('/catalogoConcepto', catalogoConceptoRouter);
    router.use('/justificacion', justificacionRouter);
    router.use('/transmision', transmisionRouter);



    // router.use('/ausencia', ausenciaRouter);
    router.use('/ramo-seguro', ramoSeguroRouter);
    router.use('/tipo-incapacidad', tipoIncapacidadRouter);

    //Prueba consult trabajadores
    router.use('/trabajador', trabajadorRuter);


}
module.exports = routerApi;
  