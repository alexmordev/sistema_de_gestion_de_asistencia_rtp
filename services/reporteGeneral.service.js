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
              { id_trabajador: query.id_trabajador },
              { fecha_inicio: query.fechaInicio }
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

    const fecha = `${query.aho}` + '/' + query.month + '/' + '01'

    const obtenerFechaFinDeMes = () => {
      const primerDia = new Date(fecha);
        return new Date(primerDia.getFullYear(), primerDia.getMonth() + 1, 0);
    };

    console.log({ object: obtenerFechaFinDeMes() });

    const incapacidad = await models.Incapacidad.findAll({
      attributes: ['id_altas_SGA', 'umf', 'clave_seguro', 'fecha_expedicion'],

      include: [
        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['id', 'fecha_inicio', 'fecha_final'],
          // where: { query: obtenerFechaFinDeMes() },
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

    console.log({object:query});
    const incapacidadCredencial = incapacidad;
    return ({ ReporteGeneral: incapacidadCredencial });
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