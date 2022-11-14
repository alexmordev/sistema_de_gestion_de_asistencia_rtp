const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const  FormatingDate  =  require( '../class/FormatingDate' );

class AusenciaService {
  constructor() {}

  async create(data) {
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( data.fechaInicio, data.fechaFinal )

    const [newSancion, created] =  await models.AltasSGA.findOrCreate({ where:
      {
        id_trabajador:data.idTrabajador,
        id_concepto:data.idConcepto,
        id_periodos:data.idPeriodo,
        unidades:data.unidades,
        usuario_captura: data.usuarioCaptura,
        fecha_inicio: dateFormatedInit,
        fecha_final:dateFormatedEnd,
        
      },
      defaults: {
        ...data,
        fechaInicio: dateFormatedInit,
        fechaFinal: dateFormatedEnd 
      }
    })
  
    if(created === false){
      throw new Error('¡Registro duplicado!')
    }

    console.log(dateFormatedInit , dateFormatedEnd)
    const newAusenciaDateModify = {
      ...newSancion.dataValues,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd,
    }
    return newAusenciaDateModify;
  } 
  
  async find() {
    const res = await models.AltasSGA.findAll(
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
        where:
          {
            id_concepto:3
          }

      });
      console.log({datos: res});
    return res;
  }
  async findOne(id) {
    const ausencia  =  await models.AltasSGA.findByPk(id,{
      
      include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],

    });
    // buscar con id
    if(!ausencia){
      boom.notFound('Registro no encontrado');
    }
    return ausencia;
  }
  async update(id, changes) {
    const ausencia = await this.findOne(id);
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( changes.fechaInicio, changes.fechaFinal )
    changes.fechaInicio = dateFormatedInit;
    changes.fechaFinal = dateFormatedEnd;
    const res = await ausencia.update(changes);
    return res;
  }
  async delete(id) {
    const ausencia = await this.findOne(id);
    await ausencia.destroy()
    return {id};
  }

  async findModulo(usuario) {

    const userModulo = await models.Trabajador.findOne({ attributes: ['mod_clave'],where: {trab_credencial: usuario}});
    console.log(userModulo.dataValues.mod_clave)
    const res = await models.AltasSGA.findAll(
      {
        include:[{ as: 'trabajador_vista', 
        model: models.Trabajador, 
        where: { mod_clave:  userModulo.dataValues.mod_clave} 
      }, 'trab_periodos','catalogo_conceptos'],
        where:
          {
            id_concepto:3
          }

      });
      console.log({datos: res});
    return res;
  }

}

module.exports = AusenciaService;