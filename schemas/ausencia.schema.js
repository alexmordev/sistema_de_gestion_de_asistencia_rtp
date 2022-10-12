const { required } = require('joi');
const Joi = require('joi');

const id = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const idPeriodo = Joi.number().integer();

const unidades = Joi.number().min(.25).max(84);
const oficio = Joi.string();
const usuarioCaptura = Joi.number().integer();
const fechaInicio = Joi.string().isoDate();
const fechaFinal = Joi.string().isoDate();
const createdAt = Joi.string().isoDate();
const updatedAt = Joi.string().isoDate(); 
// const idTipoIncapacidad = Joi.number().integer();
// const idRamoSeguro = Joi.number().integer();
// const motivo = Joi.string();
// const umf = Joi.string();
// const riesgoTrabajo = Joi.string();
// const fechaExpedicion = Joi.string();
// const posibleCovid = Joi.number().integer();

const createAusenciaSchema = Joi.object({

    idTrabajador:               idTrabajador.required(),
    idConcepto:                 idConcepto.required(),
    idPeriodo:                  idPeriodo.required(),
    unidades:                   unidades.required(),
    oficio:                     oficio.required(),
    usuarioCaptura:             usuarioCaptura.required(),
    fechaInicio:                fechaInicio.required(),
    fechaFinal:                 fechaFinal.required(),

    // incapacidad:Joi.object({
    //     idTipoIncapacidad:      idTipoIncapacidad.required(),
    //     idRamoSeguro:           idRamoSeguro.required(),
    //     motivo:                 motivo.required(),
    //     umf:                    umf.required(),
    //     riesgoTrabajo:          riesgoTrabajo.required(),
    //     fechaExpedicion:        fechaExpedicion.required(),
    //     posibleCovid:           posibleCovid.required()
    // }),

});
const updateAusenciaSchema = Joi.object({
    idTrabajador,
    idConcepto,
    idPeriodo,
    unidades,
    oficio,
    usuarioCaptura,
    fechaInicio,
    fechaFinal
}); 
const getAusenciaSchema = Joi.object({
    id: id.required()
});
module.exports = { createAusenciaSchema, updateAusenciaSchema, getAusenciaSchema }