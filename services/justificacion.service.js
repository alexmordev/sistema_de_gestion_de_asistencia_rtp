const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class JustificacionAusencia {
  constructor() {}

  async create(data) {
    const newIncapacidad = await models.AltasSGA.create( data )
    return newIncapacidad;
  }

  async find() {
    const res = await models.AltasSGA.findAll({
      where:{
        id_Concepto
      }
    });
    return res;
  }

  async findOne(id) {
    const ausencia  =  await models.AltasSGA.findByPk(id);
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

module.exports = JustificacionAusencia;

