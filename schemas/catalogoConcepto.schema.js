const Joi = require('joi');

const id = Joi.number().integer();
const clave = Joi.number().integer();;
const nombre = Joi.string();
const status = Joi.string();

const createCatalogoConceptoSchema = Joi.object({
    clave: clave.required(),
    nombre: nombre.required(),
    status: status.required(),
});

const updateCatalogoConceptoSchema = Joi.object({
    clave,
    nombre,
    status,
});

const getCatalogoConceptoSchema = Joi.object({
    id,
});

const deleteCatalogoConceptoSchema = Joi.object({
    id: id.required()
});

module.exports = { createCatalogoConceptoSchema,  updateCatalogoConceptoSchema,  getCatalogoConceptoSchema, deleteCatalogoConceptoSchema }