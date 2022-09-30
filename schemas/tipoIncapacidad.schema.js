const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createTipoIncapacidadSchema = Joi.object({
    name: name.required()
});
const updateTipoIncapacidadSchema = Joi.object({
    name
}); 
const getTipoIncapacidadSchema = Joi.object({
    id
});

module.exports = { createTipoIncapacidadSchema, updateTipoIncapacidadSchema, getTipoIncapacidadSchema }