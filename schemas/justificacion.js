const Joi = require('joi');

const id = Joi.number().integer();
const id_alta_SGA = Joi.number().integer();
const periodo = Joi.string();
const uniidades_justificadas = Joi.string().isoDate();

const createJustificacionSchema = Joi.object({
    id_alta_SGA: id_alta_SGA.required(),
    periodo: periodo.required(),
    uniidades_justificadas: uniidades_justificadas.required(),
});
const updateJustificacionSchema = Joi.object({
    concepto: id_alta_SGA,
    periodo: periodo,
    uniidades_justificadas: uniidades_justificadas,
}); 
const getJustificacionSchema = Joi.object({
    id,
});
const deleteJustificacionSchema = Joi.object({
    id: id.required()
});

module.exports = { createJustificacionSchema: createJustificacionSchema, updateJustificacionSchema: updateJustificacionSchema, getJustificacionSchema: getJustificacionSchema, deleteJustificacionSchema: deleteJustificacionSchema }
