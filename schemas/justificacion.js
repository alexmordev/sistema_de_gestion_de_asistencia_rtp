const Joi = require('joi');

const id = Joi.number().integer();
const idAltas = Joi.number().integer();
const periodo = Joi.string();
const unidadesJustificadas = Joi.string().isoDate();
const usuarioCaptura = Joi.number().integer();
const createdAt = Joi.string().isoDate();
const updatedAt = Joi.string().isoDate(); 

const createJustificacionSchema = Joi.object({
    idAltas: idAltas.required(),
    periodo: periodo.required(),
    unidadesJustificadas: unidadesJustificadas.required(),
    usuarioCaptura: usuarioCaptura.required(),
    createdAt: createdAt.required(),
    updatedAt: updatedAt.required(),
});

const updateJustificacionSchema = Joi.object({
    idAltas: idAltas,
    periodo: periodo,
    unidadesJustificadas: unidadesJustificadas,
    usuarioCaptura: usuarioCaptura,
    createdAt: createdAt,
    updatedAt: updatedAt
});

const getJustificacionSchema = Joi.object({
    id,
});

const deleteJustificacionSchema = Joi.object({
    id: id.required()
});

module.exports = {  createJustificacionSchema, updateJustificacionSchema, getJustificacionSchema, deleteJustificacionSchema }
