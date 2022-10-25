const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const  FormatingDate  =  require( '../class/FormatingDate' );

class SancionService {
  constructor() {}

  async create(data) {
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( data.fechaInicio, data.fechaFinal )
    
    const newUser =  await models.AltasSGA.create({
      ...data,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd

    } )
    const newUserDatesFormated = FormatingDate.dateFormated( newUser.fechaInicio, newUser.fechaFinal );
    dateFormatedInit = newUserDatesFormated.dateFormatedInit
    dateFormatedEnd = newUserDatesFormated.dateFormatedEnd

    const newUserDateModify = {
      ...newUser.dataValues,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd,
    }
    return newUserDateModify;
  }

  async find() {
    const res = await models.AltasSGA.findAll(
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
        where:
        {
          id_concepto:5
        }
      },
    );
    return res;
  }

  async findOne(id) {
    const res  =  await models.AltasSGA.findByPk(id,
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
        where:
        {
          id_concepto:3
        }
      }
    );
    if(!res){
      boom.notFound('Category Not Found');
    }
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( res.dataValues.fechaInicio, res.dataValues.fechaFinal )
    
    const resPeriodoDateFormated = FormatingDate.dateFormated(  res.dataValues.trab_periodos.perFechaInicio,  res.dataValues.trab_periodos.perFechaFinal );
    const formatedInitDatePeriodo = resPeriodoDateFormated.dateFormatedInit
    const formatedEndDatePeriodo = resPeriodoDateFormated.dateFormatedEnd

    const resDateModify = {
      ...res.dataValues,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd,
      trab_periodos:{
        ...res.dataValues.trab_periodos.dataValues,
        perFechaInicio: formatedInitDatePeriodo,
        perFechaFinal: formatedEndDatePeriodo,
      }
    }
    return resDateModify;
  }

  async update(id, changes) {
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( changes.fechaInicio, changes.fechaFinal )
    
    const user = await this.findOne(id);
    const res = await user.update({
      ...changes,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd
    });

    const resDateFormated = FormatingDate.dateFormated( res.fechaInicio, res.fechaFinal );
    dateFormatedInit = resDateFormated.dateFormatedInit
    dateFormatedEnd = resDateFormated.dateFormatedEnd

    const resDateModify = {
      ...res.dataValues,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd,
    }
    return resDateModify;
  }
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy()
    return {id};
  }
}

module.exports = SancionService;