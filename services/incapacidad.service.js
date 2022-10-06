const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class IncapacidadService {
  constructor() {}

  async create(data) {
    const newIncapacidad = await models.Incapacidad.create( data )
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
    const ausencia  =  await models.Incapacidad.findByPk(id);// buscar con id
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

module.exports = IncapacidadService;

