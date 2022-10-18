const Joi = require('joi');

const id = Joi.number().integer();

const idTipoIncapacidad = Joi.number().integer();
const idRamoSeguro = Joi.number().integer();
const motivo = Joi.string();
const umf = Joi.string();
const riesgoTrabajo = Joi.string();
const fechaExpedicion = Joi.string();
const posibleCovid = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();
const unidades = Joi.number().min(.25).max(84);
const oficio = Joi.string();
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string().isoDate();
const fechaFinal = Joi.string().isoDate();
const claveSeguro = Joi.string();

const createIncapacidadSchema = Joi.object({
    idTipoIncapacidad:  idTipoIncapacidad.required(),
    idRamoSeguro:       idRamoSeguro.required(),
    motivo:             motivo.required(),
    umf:                umf.required(),
    riesgoTrabajo:      riesgoTrabajo.required(),
    fechaExpedicion:    fechaExpedicion.required(),
    posibleCovid:       posibleCovid.required(),  
    claveSeguro: claveSeguro.required(),

    altas_sga:Joi.object({
        idTrabajador:idTrabajador.required(),
        idConcepto:idConcepto.required(),
        idPeriodo:idPeriodo.required(),
        unidades:unidades.required(),
        oficio:oficio.required(),
        usuarioCaptura:usuarioCaptura.required(),
        fechaInicio:fechaInicio.required(),
        fechaFinal:fechaFinal.required(),
    }),              
});
const updateIncapacidadSchema = Joi.object({

    idTipoIncapacidad: idTipoIncapacidad,
    idRamoSeguro: idRamoSeguro,
    motivo: motivo,
    umf: umf,
    riesgoTrabajo: riesgoTrabajo,
    fechaExpedicion: fechaExpedicion,
    posibleCovid: posibleCovid,
    claveSeguro: claveSeguro,
}); 
const getIncapacidadSchema = Joi.object({
    id,
});


const deleteIncapacidadSchema = Joi.object({
    id: id.required()
});

module.exports = { createIncapacidadSchema,  updateIncapacidadSchema, getIncapacidadSchema, deleteIncapacidadSchema }
