const express = require('express');
const ausenciaRouter = require('./Ausencia.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api-sga', router);
    router.use('/ausencia', ausenciaRouter);
}
  
  module.exports = routerApi;
  