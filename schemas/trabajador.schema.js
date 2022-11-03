const Joi = require('joi');

const id = Joi.number().integer();
const trab_credencial = Joi.number().integer();
const id_trabajador = Joi.number().integer();

const createTrabajadorSchema = Joi.object({
    // id: id.required()
});
const updateTrabajadorSchema = Joi.object({
    id: id
}); 
const getTrabajadorSchema = Joi.object({
    id,
    trab_credencial,
    id_trabajador,

});
const deleteTrabajadorSchema = Joi.object({
    id: id.required()
});

module.exports = { createTrabajadorSchema, updateTrabajadorSchema, getTrabajadorSchema, deleteTrabajadorSchema }
