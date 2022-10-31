const Joi = require('joi');

const id = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();
const unidades = Joi.number().multiple(.25).max(1);
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.date().iso();
const fechaFinal = Joi.date().iso();

const createSancionSchema = Joi.object({
    idTrabajador : idTrabajador.required(),
    idConcepto: idConcepto.required(),
    idPeriodo:idPeriodo.required(),
    unidades: unidades.required(),
    usuarioCaptura: usuarioCaptura.required(),
    fechaInicio: fechaInicio.required(),
    fechaFinal:fechaFinal.required(),
});
const updateSancionSchema = Joi.object({
    idTrabajador,
    idPeriodo,
    unidades,
    usuarioCaptura,
    fechaInicio,
    fechaFinal
}); 
const getSancionSchema = Joi.object({
    id: id.required()
});
module.exports = { createSancionSchema, updateSancionSchema, getSancionSchema }