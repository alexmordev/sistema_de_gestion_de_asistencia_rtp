const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { Op } = require("sequelize");
const { models } = require('../libs/sequelize');
const { Trabajador } = require('../database/models/trabajador.model');

class ReporteGeneralService {
  constructor() { }

  async find(query) {

    const incapacidad = await models.Incapacidad.findAll({
      attributes: ['id_altas_SGA', 'umf', 'clave_seguro', 'fecha_expedicion'],

      include: [
        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['id', 'fecha_inicio', 'fecha_final'],

          where: {
            [Op.and]: [
              {  id_trabajador: query.id_trabajador },
              {  fecha_inicio:  query.fechaInicio   }
            ],
          },
          include: [
            {
              as: 'trabajador_vista',
              model: Trabajador,
              attributes: ['trabCredencial', 'moduloClave', 'tipoTrabProc', 'nombreCompleto', 'trab_no_afiliacion', 'trab_rfc', 'trab_curp'],
            },
          ]
        },
      ],
    })

    const incapacidadCredencial = incapacidad;
    return ({ ReporteGeneral: incapacidadCredencial });
  }

  async findThow(query) {

    const month = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const incapacidad = await models.Incapacidad.findAll({
      attributes: ['id_altas_SGA', 'umf', 'clave_seguro', 'fecha_expedicion'],
      
      include: [
        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['id', 'fecha_inicio', 'fecha_final'],
          where: { fecha_inicio: query.month },
          include: [
            {
              as: 'trabajador_vista',
              model: Trabajador,
              attributes: ['trabCredencial', 'moduloClave', 'tipoTrabProc', 'nombreCompleto', 'trab_no_afiliacion', 'trab_rfc', 'trab_curp'],
            },
          ]
        },
      ],
    })
    
    const obtMes = new Date(incapacidad[0].altas_sga.dataValues.fecha_inicio);
    const mes = month[obtMes.getMonth()];
    const incapacidadCredencial = incapacidad;
    return ({ Mes:mes, ReporteGeneral: incapacidadCredencial });
  }


  async update(id, changes) {
    const ausencia = await this.findOne(id);
    const res = await ausencia.update(changes);
    return res;
  }

  async delete(id) {
    const ausencia = await this.findOne(id);
    await ausencia.destroy()
    return { id };
  }
}

module.exports = ReporteGeneralService;