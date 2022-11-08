const Joi = require('joi');

const id = Joi.number().integer();
const unidades = Joi.number().min(.25).max(84);
const usuarioCaptura = Joi.number().integer();
const periodoTipo = Joi.number().integer();
const concepto = Joi.number().integer();

const createTransmitidoSchema =Joi.array().items({
    id: id.required(),
    concepto: concepto.required(),
    periodoTipo : periodoTipo.required(),
    unidades: unidades.required(),
    usuarioCaptura: usuarioCaptura.required()
});

const getTransmitidoSchema = Joi.object({
    concepto
});

const deleteTransmitidoSchema = Joi.object({
    id: id.required()
});

module.exports = { createTransmitidoSchema, getTransmitidoSchema, deleteTransmitidoSchema }
