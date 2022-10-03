const Joi = require('joi');

const id = Joi.number().integer();
const clave = Joi.integer();;
const nombre = Joi.string();
const status = Joi.string();

const createCatalogoConceptoSchema = Joi.object({
    clave: clave.required(),
    nombre: nombre.required(),
    status: status.required(),
});
const updatecreateCatalogoConceptoSchema = Joi.object({
    clave,
    nombre,
    status,
}); 
const getcreateCatalogoConceptoSchema = Joi.object({
    id,
});
const deleteCatalogoConceptoSchema = Joi.object({
    id: id.required()
});

module.exports = { createCatalogoConceptoSchema, updatecreateCatalogoConceptoSchema, getcreateCatalogoConceptoSchema, deleteCatalogoConceptoSchema }


// clave
// nombre
// status