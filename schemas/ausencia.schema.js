const Joi = require('joi');

const id = Joi.number().integer();
const unidades = Joi.number().min(.25).max(84);
const oficio = Joi.string();
const usuarioCaptura = Joi.string();
const fechaInicio = Joi.string().isoDate();
const fechaFinal = Joi.string().isoDate();

const createAusenciaSchema = Joi.object({
    unidades: unidades.required(),
    oficio: oficio.required(),
    usuarioCaptura: usuarioCaptura.required(),
    fechaInicio: fechaInicio.required(),
    fechaFinal:fechaFinal.required()
});
const updateAusenciaSchema = Joi.object({
    unidades,
    oficio,
    usuarioCaptura,
    fechaInicio,
    fechaFinal
}); 
const getAusenciaSchema = Joi.object({
    id,
});
const deleteAusenciaSchema = Joi.object({
    id: id.required()
});

module.exports = { createAusenciaSchema, updateAusenciaSchema, getAusenciaSchema, deleteAusenciaSchema }
