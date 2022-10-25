const Joi = require('joi');

const id = Joi.number().integer();

const idTipoIncapacidad = Joi.number().integer();
const idRamoSeguro = Joi.number().integer();
const umf = Joi.string();
const riesgoTrabajo = Joi.string();
const fechaExpedicion = Joi.string();
const posibleCovid = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();
const unidades = Joi.number().min(.25).max(84);
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string().isoDate();
const month = Joi.string();
const aho = Joi.number();
const fechaFinal = Joi.string().isoDate();
const claveSeguro = Joi.string();
const per_numero = Joi.number().integer();
const per_tipo = Joi.number().integer();
const per_aho = Joi.string().isoDate();

const createIncapacidadSchema = Joi.object({
    idTipoIncapacidad:  idTipoIncapacidad.required(),
    idRamoSeguro:       idRamoSeguro.required(),
  
    umf:                umf.required(),
    riesgoTrabajo:      riesgoTrabajo.required(),
    fechaExpedicion:    fechaExpedicion.required(),
    posibleCovid:       posibleCovid.required(),  
    claveSeguro:        claveSeguro.required(),

    altas_sga:Joi.object({
    idTrabajador:       idTrabajador.required(),
    idConcepto:         idConcepto.required(),
    idPeriodo:          idPeriodo.required(),
    unidades:           unidades.required(),
    usuarioCaptura:     usuarioCaptura.required(),
    fechaInicio:        fechaInicio.required(),
    fechaFinal:         fechaFinal.required(),
    }),              
});
const updateIncapacidadSchema = Joi.object({

    idTipoIncapacidad,
    idRamoSeguro,
    umf,
    riesgoTrabajo,
    fechaExpedicion,
    posibleCovid,
    claveSeguro,

    altas_sga:Joi.object({
    idTrabajador,
    idConcepto,
    idPeriodo,
    unidades,
    usuarioCaptura,
    fechaInicio,
    fechaFinal
    }),
});
    

const getIncapacidadSchema = Joi.object({
    id,
    per_numero,
    per_tipo,
    per_aho,
    fechaInicio,
    month,
    fechaFinal,
    aho
});


const deleteIncapacidadSchema = Joi.object({
    id: id.required()
});

module.exports = { createIncapacidadSchema,  updateIncapacidadSchema, getIncapacidadSchema, deleteIncapacidadSchema }
