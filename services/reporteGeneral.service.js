const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Trabajador } = require('../database/models/trabajador.model');

class ReporteGeneralService {
  constructor() { }

  async find(query) {

    const incapacidad = await models.Incapacidad.findAll({
        attributes: ['id_altas_SGA','umf','clave_seguro', 'fecha_expedicion'],
        
        include: [
          {
            as: 'altas_sga', 
            model: models.AltasSGA, 
            attributes:['id','fecha_inicio', 'fecha_final'],
            where: { id_trabajador: query.id_trabajador },
            include: [
              { 
                as: 'trabajador_vista', 
                model: Trabajador,
                attributes:['trabCredencial','moduloClave','tipoTrabProc','nombreCompleto','trab_no_afiliacion','trab_rfc','trab_curp'],
              },
            ]
          },
        ],
    })

    const incapacidad1 =  incapacidad;
    // console.log(registros);
    return ({1: incapacidad1 });
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