const express = require('express');
// const ausenciaRouter = require('./Ausencia.routes');
const ramoSeguroRouter = require('./RamoSeguro.routes');
const tipoIncapacidadRouter = require('./TipoIncapacidad.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);
    // router.use('/ausencia', ausenciaRouter);
    router.use('/ramo-seguro', ramoSeguroRouter);
    router.use('/tipo-incapacidad', tipoIncapacidadRouter);
}
module.exports = routerApi;
  