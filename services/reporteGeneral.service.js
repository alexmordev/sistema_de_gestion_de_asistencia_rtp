const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Trabajador } = require('../database/models/trabajador.model');

class ReporteGeneralService {
  constructor() { }

  async find(query) {

    const incapacidad = await models.Incapacidad.findAll({
        attributes: ['id_altas_SGA','umf','clave_seguro', 'fecha_expedicion'],
        // where: { id_altas_SGA: 'id_altas_SGA  ' },
        include: [
          {
            as: 'altas_sga', 
            model: models.AltasSGA, 
            attributes:['id','id_trabajador','fecha_inicio', 'fecha_final'],
          },
        ],
    })
       const trabajador = await models.AltasSGA.findAll({
          attributes: ['id_trabajador','fecha_inicio', 'fecha_final'],
          where: { id_trabajador: query.id_trabajador },
          include: [
            { as: 'trabajador_vista', 
              model: Trabajador,
              attributes:['trabCredencial','moduloClave','tipoTrabProc','nombreCompleto','trab_no_afiliacion','trab_rfc','trab_curp'],
            },
          ]
      })
    const registros =  trabajador[0]._previousDataValues;
    const incapacidad1 =  incapacidad;
    console.log(registros);
    return ({1: registros, 2: incapacidad1 });
  }

//   const altasId = await models.AltasSGA.findAll({
//     attributes: ['id_trabajador','fecha_inicio', 'fecha_final'],
//     where: { id_trabajador: query.id_trabajador },
//     include: [
//       { as: 'trabajador_vista', 
//         model: Trabajador,
//         attributes:['trabCredencial','moduloClave','tipoTrabProc','nombreCompleto','trab_no_afiliacion','trab_rfc','trab_curp'],
//       },
//     ]
// })

// const registros =  altasId ;
// return registros;
// }
  
  

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