const Joi = require('joi');

const id = Joi.number().integer();
const id_Altas_SGA = Joi.number().integer();


const createJustificacionSchema = Joi.object({
    id: id.required(),
    id: id_Altas_SGA.required(),
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
