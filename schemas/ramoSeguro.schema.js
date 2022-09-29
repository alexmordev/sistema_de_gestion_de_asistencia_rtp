const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string();

const createRamoSeguroSchema = Joi.object({
    nombre: nombre.required()
});
const updateRamoSeguroSchema = Joi.object({
    nombre
}); 
const getRamoSeguroSchema = Joi.object({
    id
});

module.exports = { createRamoSeguroSchema, updateRamoSeguroSchema, getRamoSeguroSchema }