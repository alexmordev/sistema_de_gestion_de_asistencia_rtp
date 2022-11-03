const Joi = require('joi');

const idPeriodos = Joi.number().integer();
const perTipo = Joi.number().integer();
const perAho = Joi.number().integer();
// const concepto = Joi.number().min(.25).max(84);
// const credencial = Joi.string();
// const fecha = Joi.string().isoDate();
// const unidades = Joi.number().min(.25).max(84);

const createPeriodoSchema = Joi.object({
    // concepto: concepto.required(),
    // credencial: credencial.required(),
    // fecha: fecha.required(),
    // unidades: unidades.required(),
});
const updatePeriodoSchema = Joi.object({
    // concepto: concepto,
    // credencial: credencial,
    // fecha: fecha,
    // unidades: unidades
}); 
const getPeriodoSchema = Joi.object({
    idPeriodos,
    perTipo,
    perAho
});
const deletePeriodoSchema = Joi.object({
    idPeriodos: idPeriodos.required()
});
module.exports = { createPeriodoSchema,updatePeriodoSchema,getPeriodoSchema,deletePeriodoSchema }