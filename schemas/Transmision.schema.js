const Joi = require('joi');

const id = Joi.number().integer();
const idAltas = Joi.number().integer();
const periodo = Joi.string();
const unidadesAplicadas = Joi.number().min(.25).max(84);
const transmitido = Joi.number().min(.25).max(84);
const usuarioCaptura = Joi.number().integer();
const createdAt = Joi.string().isoDate();
const updatedAt = Joi.string().isoDate(); 
const concepto = Joi.number().integer();


const createTransmitidoSchema = Joi.object({
    idAltas: idAltas.required(),
    periodo: periodo.required(),
    unidadesAplicadas: unidadesAplicadas.required(),
    usuarioCaptura: usuarioCaptura.required(),
    transmitido: transmitido.required(),
    createdAt: createdAt.required(),
    updatedAt: updatedAt.required()
});

const updateTransmitidoSchema = Joi.object({
    idAltas: idAltas,
    periodo: periodo,
    unidadesAplicadas: unidadesAplicadas,
    usuarioCaptura,
    transmitido: transmitido,
    createdAt,
    updatedAt
});

const getTransmitidoSchema = Joi.object({
    concepto
});

const deleteTransmitidoSchema = Joi.object({
    id: id.required()
});

module.exports = { createTransmitidoSchema, updateTransmitidoSchema, getTransmitidoSchema, deleteTransmitidoSchema }
