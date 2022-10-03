const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class JustificacionTable {
  constructor() {}

  async create(data) {
    const newJustificacion = await models.JustificacionTable.create( data )
    return newJustificacion;
  }

  async find() {
    const res = await models.JustificacionTable.findAll({
      where:{
        id_Concepto
      }
    });
    return res;
  }

  async findOne(id) {
    const justificacion  =  await models.JustificacionTable.findByPk(id);
    if(!justificacion){
      boom.notFound('Registro no encontrado');
    }
    return justificacion;
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

module.exports = JustificacionTable;

