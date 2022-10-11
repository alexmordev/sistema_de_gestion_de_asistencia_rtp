const boom = require('@hapi/boom');
const { reset } = require('nodemon');
const {models} = require('../libs/sequelize');

class TrabajadorService {
  constructor() {}

  async create(data) {
    const newAusencia = await models.Trabajador.create( data )
    return newAusencia;
  }
  async find() {
    const res = await models.Trabajador.findAll();
    return res;
  }
  async findOne(id) {
    const ausencia  =  await models.Trabajador.findByPk(id);// buscar con id
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

module.exports = TrabajadorService;
