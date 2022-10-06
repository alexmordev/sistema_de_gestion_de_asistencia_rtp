const Joi = require('joi');

const id = Joi.number().integer();
const id_trabajador = Joi.number().integer();
const id_concepto = Joi.number().integer();
const id_periodo = Joi.number().integer();
const fecha_captura = Joi.string().isoDate();
const unidades = Joi.number().min(.25).max(84);
const oficio = Joi.string();
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string().isoDate();
const fechaFinal = Joi.string().isoDate();
const createdAt = Joi.string().isoDate();
const updatedAt = Joi.string().isoDate(); 

const createAusenciaSchema = Joi.object({
    id_trabajador,
    id_concepto,
    id_periodo,
    fecha_captura,
    unidades: unidades.required(),
    oficio: oficio.required(),
    usuarioCaptura: usuarioCaptura.required(),
    fechaInicio: fechaInicio.required(),
    fechaFinal:fechaFinal.required(),
    createdAt: createdAt.required(),
    updatedAt: updatedAt.required()
});
const updateAusenciaSchema = Joi.object({
    unidades,
    oficio,
    usuarioCaptura,
    fechaInicio,
    fechaFinal,
    createdAt,
    updatedAt
}); 
const getAusenciaSchema = Joi.object({
    id,
});
const deleteAusenciaSchema = Joi.object({
    id: id.required()
});

module.exports = { createAusenciaSchema, updateAusenciaSchema, getAusenciaSchema, deleteAusenciaSchema }