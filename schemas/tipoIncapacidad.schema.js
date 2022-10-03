const Joi = require('joi');

const id = Joi.number().integer();
const tipo = Joi.string();

const createTipoIncapacidadSchema = Joi.object({
    tipo: tipo.required()
});
const updateTipoIncapacidadSchema = Joi.object({
    tipo
}); 
const getTipoIncapacidadSchema = Joi.object({
    id
});

module.exports = { createTipoIncapacidadSchema, updateTipoIncapacidadSchema, getTipoIncapacidadSchema }