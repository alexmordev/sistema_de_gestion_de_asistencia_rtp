const Joi = require('joi');

const id = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();
const unidades = Joi.number().integer();
const oficio = Joi.string();
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string();
const fechaFinal = Joi.string();

const getReproteSGASchema = Joi.object({
    
});
const updateAusenciaSchema = Joi.object({
    idTrabajador,
    idConcepto,
    idPeriodo,
    unidades,
    oficio,
    usuarioCaptura,
    fechaInicio,
    fechaFinal
}); 

module.exports = { getReproteSGASchema }