const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const  FormatingDate  =  require( '../class/FormatingDate' );

class SancionService {
  constructor() {}

  async create(data) {
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( data.fechaInicio, data.fechaFinal )
    
    // const newSancion =  await models.AltasSGA.create({
    //   ...data,
    //   fechaInicio : dateFormatedInit,
    //   fechaFinal : dateFormatedEnd

    // } )
    // const newSancionDatesFormated = FormatingDate.dateFormated( newSancion.fechaInicio, newSancion.fechaFinal );
    // dateFormatedInit = newSancionDatesFormated.dateFormatedInit
    // dateFormatedEnd = newSancionDatesFormated.dateFormatedEnd

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

    const newSancionDateModify = {
      ...newSancion.dataValues,
      fechaInicio : dateFormatedInit,
      fechaFinal : dateFormatedEnd,
    }
    return newSancionDateModify;
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
          id_concepto:5
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
  };

  async update(id, changes) {
    let { dateFormatedInit, dateFormatedEnd } = FormatingDate.dateFormated( changes.fechaInicio, changes.fechaFinal );
    
    const sancion  =  await models.AltasSGA.findByPk(id,);
    if(!sancion){
      boom.notFound('Sancion Not Found');
    }
    const res = await sancion.update({
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
    const sancion  =  await models.AltasSGA.findByPk(id);
    if(!sancion){
      boom.notFound('Sancion Not Found');
    }
    await sancion.destroy()
    return {id};
  }
}
module.exports = SancionService;