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
    const res = await models.Incapacidad.findAll(
      {
        include:['altas_sga', 'catalogo_tipo_incapacidad', 'catalogo_ramo_seguro']
      }
    );
    return res;
  }
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
   
      //  console.log( `fechaInicial: ${res.altas_sga.fechaInicio}, fechaFinal: ${res.altas_sga.trab_periodos.perFechaFinal}` );;

    return res;

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

module.exports = IncapacidadService;