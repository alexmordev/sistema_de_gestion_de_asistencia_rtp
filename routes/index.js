const express = require('express');
const ausenciaRouter = require('./Ausencia.routes');
const incapacidadRouter = require('./Incapacidad.routes');
const justificacionRouter = require('./Justificacion-Ausencia.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);
    router.use('/ausencia', ausenciaRouter);
    router.use('/incapacidad', incapacidadRouter);
    router.use('/justificacion', justificacionRouter);
}
  
  module.exports = routerApi;
  