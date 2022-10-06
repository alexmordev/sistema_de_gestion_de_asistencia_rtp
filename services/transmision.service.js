const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class TransmisionService {
  constructor() {}

  async create(data) {
    const newTransmision = await models.Transmision.create( data )
    return newTransmision;
  }
  async find() {
    const res = await models.Transmision.findAll(
      {
        include:['altas_sga']
      }
    );
    return res;
  }
  async findOne(id) {
    const transmision  =  await models.Transmision.findByPk(id);// buscar con id
    if(!transmision){
      boom.notFound('Registro no encontrado');
    }
    return transmision;
  }

  async update(id, changes) {
    const transmision = await this.findOne(id);
    const res = await transmision.update(changes);
    return res;
  }
  
  async delete(id) {
    const transmision = await this.findOne(id);
    await transmision.destroy()
    return {id};
  }
}

module.exports = TransmisionService;

