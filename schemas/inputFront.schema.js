const Joi = require('joi');

const id = Joi.number().integer();

const getTrabajadorPeridoSchema = Joi.object({
    id 
});


module.exports = {  getTrabajadorPeridoSchema }