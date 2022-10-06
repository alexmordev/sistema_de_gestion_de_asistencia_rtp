const Joi = require('joi');

const id = Joi.number().integer();

const createTrabajadorSchema = Joi.object({
    // id: id.required()
});
const updateTrabajadorSchema = Joi.object({
    id: id
}); 
const getTrabajadorSchema = Joi.object({
    id,
});
const deleteTrabajadorSchema = Joi.object({
    id: id.required()
});

module.exports = { createTrabajadorSchema, updateTrabajadorSchema, getTrabajadorSchema, deleteTrabajadorSchema }
