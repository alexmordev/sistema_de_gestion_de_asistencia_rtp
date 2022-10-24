const Joi = require('joi');

const id = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();
<<<<<<< HEAD
const unidades = Joi.number().min(1);
=======
const unidades = Joi.number().integer();
const oficio = Joi.string();
>>>>>>> 8298e106897c158bb276387dcbd1b850a7d15212
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string();
const fechaFinal = Joi.string();

const createAusenciaSchema = Joi.object({
    idTrabajador : idTrabajador.required(),
    idConcepto: idConcepto.required(),
    idPeriodo:idPeriodo.required(),
    unidades: unidades.required(),
    usuarioCaptura: usuarioCaptura.required(),
    fechaInicio: fechaInicio.required(),
    fechaFinal:fechaFinal.required(),
});
const updateAusenciaSchema = Joi.object({
    idTrabajador,
    idConcepto,
    idPeriodo,
    unidades,
    usuarioCaptura,
    fechaInicio,
    fechaFinal
}); 
const getAusenciaSchema = Joi.object({
    id: id.required()
});
module.exports = { createAusenciaSchema, updateAusenciaSchema, getAusenciaSchema }