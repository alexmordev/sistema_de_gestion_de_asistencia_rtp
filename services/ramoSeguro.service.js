const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class RamoSeguroService {
  constructor() {}

  async create(data) {
    const newRamoSeguro = await models.RamoSeguro.create( data )
    return newRamoSeguro;
  }
  async find() {
    const res = await models.RamoSeguro.findAll();
    return res;
  }
  async findOne(id) {
    const ramoSeguro  =  await models.RamoSeguro.findByPk(id);// buscar con id
    if(!ramoSeguro){
      boom.notFound('Registro no encontrado');
    }
    return ramoSeguro;
  }
  async update(id, changes) {
    const ramoSeguro = await this.findOne(id);
    const res = await ramoSeguro.update(changes);
    return res;
  }
  async delete(id) {
    const ramoSeguro = await this.findOne(id);
    await ramoSeguro.destroy()
    return {id};
  }
}

module.exports = RamoSeguroService;