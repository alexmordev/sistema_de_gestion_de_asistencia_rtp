const Joi = require('joi');

const id = Joi.number().integer();
const concepto = Joi.number().min(.25).max(84);
const credencial = Joi.string();
const fecha = Joi.string().isoDate();
const unidades = Joi.number().min(.25).max(84);

const createJustificacionSchema = Joi.object({
    concepto: concepto.required(),
    credencial: credencial.required(),
    fecha: fecha.required(),
    unidades: unidades.required(),
});
const updateJustificacionSchema = Joi.object({
    concepto: concepto,
    credencial: credencial,
    fecha: fecha,
    unidades: unidades
}); 
const getJustificacionSchema = Joi.object({
    id,
});
const deleteJustificacionSchema = Joi.object({
    id: id.required()
});

module.exports = { createJustificacionSchema: createJustificacionSchema, updateJustificacionSchema: updateJustificacionSchema, getJustificacionSchema: getJustificacionSchema, deleteJustificacionSchema: deleteJustificacionSchema }
