const express = require('express');
const ausenciaRouter = require('./ausencia.routes');
const incapacidadRouter = require('./incapacidad.routes');
const justificacionRouter = require('./justificacionAusencia.routes');

// const ausenciaRouter = require('./Ausencia.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./tipoIncapacidad.routes')
const TrabajadorService = require('./trabajador.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);

    router.use('/ausencia', ausenciaRouter);
    router.use('/incapacidad', incapacidadRouter);
    router.use('/justificacion', justificacionRouter);

    // router.use('/ausencia', ausenciaRouter);
    router.use('/ramo-seguro', ramoSeguroRouter);
    router.use('/tipo-incapacidad', tipoIncapacidadRouter);

    //Prueba consult trabajadores
    router.use('/trabajador', TrabajadorService);


}
module.exports = routerApi;
  