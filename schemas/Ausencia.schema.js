const { required } = require('joi');
const Joi = require('joi');

const id = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();
const unidades = Joi.number().min(1);
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string().isoDate();
const fechaFinal = Joi.string().isoDate();
const createdAt = Joi.string().isoDate();
const updatedAt = Joi.string().isoDate(); 

const createAusenciaSchema = Joi.object({
    idTrabajador: idTrabajador.required(),
    idConcepto: idConcepto.required(),
    idPeriodo: idPeriodo.required(),
    unidades: unidades.required(),
    usuarioCaptura: usuarioCaptura.required(),
    fechaInicio: fechaInicio.required(),
    fechaFinal: fechaFinal.required(),
});
const updateAusenciaSchema = Joi.object({
    idTrabajador,
    idConcepto,
    idPeriodo,
    unidades,
    usuarioCaptura,
    fechaInicio,
    fechaFinal,
    createdAt,
    updatedAt
}); 
const getAusenciaSchema = Joi.object({

    id: id.required(),
    
    
});
const params = Joi.object({
    idTrabajador,    
    
});
module.exports = { createAusenciaSchema, updateAusenciaSchema, getAusenciaSchema, params }