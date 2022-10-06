const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class JustificacionAusencia {
  constructor() {}

  async create(data) {
    const newJustificacion = await models.Justificacion.create( data )
    return newJustificacion;
  }

  async find() {
    const res = await models.Justificacion.findAll();
    return res;
  }

  async findOne(id) {
    const ausencia  =  await models.Justificacion.findByPk(id);
    if(!ausencia){
      boom.notFound('Registro no encontrado');
    }
    return ausencia;
  }

  async update(id, changes) {
    const justificacion = await this.findOne(id);
    const res = await justificacion.update(changes);
    return res;
  }

  async delete(id) {
    const justificacion = await this.findOne(id);
    await justificacion.destroy()
    return {id};
  }
}

module.exports = JustificacionAusencia;

