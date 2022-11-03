const Joi = require('joi');

const numConcepto = Joi.number().integer();
const numModulo = Joi.number().integer();
const tipoTrabajador = Joi.number().integer();
const periodo = Joi.number().integer();
const aho = Joi.number().integer();



const getReporteSchema = Joi.object({
    numConcepto : numConcepto.required(),
    numModulo : numModulo.required(),
    tipoTrabajador : tipoTrabajador.required(),
    periodo : periodo.required(),
    aho : aho.required()
});

module.exports = {  getReporteSchema }