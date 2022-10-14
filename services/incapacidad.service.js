const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class IncapacidadService {
  constructor() {}

  async create(data) {
    const newIncapacidad = await models.Incapacidad.create( data,
      {
        include:['altas_sga']
      })
      console.log({datos: newIncapacidad});
    return newIncapacidad;
  }

  async find() {
    const res = await models.Incapacidad.findAll({
    include:[
        {
          association: 'altas_sga',
          include: ['trab_periodos']
        },
          'catalogo_tipo_incapacidad',
          'catalogo_ramo_seguro'
    ]});
    // console.log(res.altas_sga);
    return res;
  }

//buscar por id
  async findOne(id) {

    const res = await models.Incapacidad.findByPk(id,{
      include:[
        {
          association: 'altas_sga',
          include: ['trab_periodos']
        },
          'catalogo_tipo_incapacidad',
          'catalogo_ramo_seguro'
      ]
    })
    return res;

  }
// idPeriodo//
  async findOnePeriodo(id) {
    const fecha = await models.Incapacidad.findAll({ include: ['altas_sga'] })
    const res = await models.Periodo.findByPk(id)

      if( fecha[0].altas_sga.fechaInicio >= res.perFechaInicio &&  res.perFechaInicio <=  fecha[0].altas_sga.fechaFinal ){
        // console.log([`Unidades: ${res.perFechaInicio}`])
        return ([`Unidades: ${res.perFechaInicio}`])
      }else{
        // return ({Unidades: res.unidades})
        console.log({Unidades:`${fecha[0].altas_sga.unidades}`});
      }
      // console.log({numero: res.perNumero});
    
    // console.log( { FechaInicio: fecha[0].altas_sga.fechaInicio,  FechaFinal: fecha[0].altas_sga.fechaFinal } );
    return ({ FechaInicio: res.perFechaInicio, FechaFinal: res.perFechaFinal })
    
  }

    // find()
    // arr.map(function(element, index, array){  }, this);
  
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

module.exports = IncapacidadService;