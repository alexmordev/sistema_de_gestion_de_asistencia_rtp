const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const  FormatingDate  =  require( '../class/FormatFecha' );

class AusenciaService {
  constructor() {}

  async create(data) {
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( data.fechaInicio, data.fechaFinal )
    
    const newSancion =  await models.AltasSGA.create({
      ...data,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd

    } )
    const newAusenciaDatesFormated = FormatingDate.dateFormated( newSancion.fechaInicio, newSancion.fechaFinal );
    dateFormatedInit = newAusenciaDatesFormated.dateFormatedInit
    dateFormatedEnd = newAusenciaDatesFormated.dateFormatedEnd

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
    const res = await ausencia.update(changes);
    return res;
  }
  async delete(id) {
    const ausencia = await this.findOne(id);
    await ausencia.destroy()
    return {id};
  }
}

module.exports = AusenciaService;