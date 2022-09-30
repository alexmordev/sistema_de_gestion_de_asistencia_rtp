const Joi = require('joi');

const id = Joi.number().integer();
const concepto = Joi.number().min(.25).max(84);
const credencial = Joi.string();
const fecha = Joi.string().isoDate();


const createSancionSchema = Joi.object({
    concepto: concepto.required(),
    credencial: credencial.required(),
    fecha: fecha.required()
});
const updateSancionSchema = Joi.object({
    concepto: concepto,
    credencial: credencial,
    fecha: fecha,

}); 
const getSancionSchema = Joi.object({
    id,
});
const deleteSancionSchema = Joi.object({
    id: id.required()
});

module.exports = { createSancionSchema: createSancionSchema, updateSancionSchema: updateSancionSchema, getSancionSchema: getSancionSchema, deleteSancionSchema: deleteSancionSchema }
