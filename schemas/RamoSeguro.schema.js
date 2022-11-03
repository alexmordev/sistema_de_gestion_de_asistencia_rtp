const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createRamoSeguroSchema = Joi.object({
    name: name.required()
});
const updateRamoSeguroSchema = Joi.object({
    name
}); 
const getRamoSeguroSchema = Joi.object({
    id
});

module.exports = { createRamoSeguroSchema, updateRamoSeguroSchema, getRamoSeguroSchema }