const Joi = require('joi');

const id = Joi.number().integer();
const idTrabajador = Joi.number().integer();
const idConcepto = Joi.number().integer();
const periodo  = Joi.number().integer();
const unidadesJustificadas = Joi.number().min(.25).max(10);
const oficio = Joi.string();
const usuarioCaptura  = Joi.number().integer();
const fechaInicio = Joi.date().iso();
const fechaFinal = Joi.date().iso();
const idAltas  = Joi.number().integer();

const tipoTrabajador =  Joi.string();
const numPeriodo =  Joi.number().integer();
const aho =  Joi.number().integer();

const createJustificacionSchema = Joi.object({
    idAltas: idAltas.required(),
    idTrabajador : idTrabajador.required(),
    unidadesJustificadas : unidadesJustificadas.required(),
    usuarioCaptura: usuarioCaptura.required(),
});

const getJustificacionSchema = Joi.object({
    id: id.required()
});

const getJustificacionPeriodoSchema = Joi.object({
    tipoTrabajador:tipoTrabajador.required(),
    numPeriodo: numPeriodo.required() ,
    aho: aho.required()
});

const updateJustificacionSchema = Joi.object({

});

const deleteJustificacionSchema = Joi.object({
    id: id.required()
});

module.exports = {  createJustificacionSchema, getJustificacionSchema, getJustificacionPeriodoSchema, updateJustificacionSchema, deleteJustificacionSchema }
