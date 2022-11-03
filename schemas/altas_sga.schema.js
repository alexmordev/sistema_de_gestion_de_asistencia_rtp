const Joi = require('joi');

const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();
const unidades = Joi.number().min(.25).max(84);
const oficio = Joi.string();
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string().isoDate();
const fechaFinal = Joi.string().isoDate();


const createAltas_SGASchema = Joi.object({
    idTrabajador: idTrabajador.required(),
    idConcepto: idConcepto.required(),
    idPeriodo: idPeriodo.required(),
    unidades: unidades.required(),
    oficio: oficio.required(),
    usuarioCaptura: usuarioCaptura.required(),
    fechaInicio: fechaInicio.required(),
    fechaFinal: fechaFinal.required(),
    
});

// const updateAusenciaSchema = Joi.object({
//     unidades,
//     oficio,
//     usuarioCaptura,
//     fechaInicio,
//     fechaFinal,
//     createdAt,
//     updatedAt
// }); 
// const getAusenciaSchema = Joi.object({
//     id,
// });
// const deleteAusenciaSchema = Joi.object({
//     id: id.required()
// });

module.exports = { createAltas_SGASchema }