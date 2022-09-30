const Joi = require('joi');

const id = Joi.number().integer();
const tipo = Joi.string();
const motivo = Joi.string();
const clave_Seguro = Joi.string();
const umf = Joi.string();
const riesgo_Trabajo = Joi.string();
const fecha_Expedicion = Joi.string();
const posible_Covid = Joi.string();

const createIncapacidadSchema = Joi.object({
    tipo: tipo.required(),
    motivo: motivo.required(),
    clave_Seguro: clave_Seguro.required(),
    umf: umf.required(),
    riesgo_Trabajo: riesgo_Trabajo.required(),
    fecha_Expedicion: fecha_Expedicion.required(),
    posible_Covid: posible_Covid.required(),
});
const updateIncapacidadSchema = Joi.object({
    tipo: tipo,
    motivo: motivo,
    clave_Seguro: clave_Seguro,
    umf: umf,
    riesgo_Trabajo: riesgo_Trabajo,
    fecha_Expedicion: fecha_Expedicion,
    posible_Covid: posible_Covid
}); 
const getIncapacidadSchema = Joi.object({
    id,
});
const deleteIncapacidadSchema = Joi.object({
    id: id.required()
});

module.exports = { createIncapacidadSchema: createIncapacidadSchema, updateIncapacidadSchema: updateIncapacidadSchema, getIncapacidadSchema: getIncapacidadSchema, deleteIncapacidadSchema: deleteIncapacidadSchema }
