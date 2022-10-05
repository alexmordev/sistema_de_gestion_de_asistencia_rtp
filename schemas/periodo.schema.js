const Joi = require('joi');

const id_periodos = Joi.number().integer();
const per_tipo = Joi.number().integer();
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
    id_periodos,
    per_tipo
});
const deletePeriodoSchema = Joi.object({
    id_periodos: id_periodos.required()
});
module.exports = { createPeriodoSchema,updatePeriodoSchema,getPeriodoSchema,deletePeriodoSchema }