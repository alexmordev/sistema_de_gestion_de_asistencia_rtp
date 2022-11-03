const Joi = require('joi');

const tipoTrabajador = Joi.number().integer();
const periodo = Joi.number().integer();
const aho = Joi.number().integer();

const getReporteTransmitidosSchema = Joi.object({
    tipoTrabajador : tipoTrabajador.required(),
    periodo : periodo.required(),
    aho : aho.required()
});

module.exports = {  getReporteTransmitidosSchema }