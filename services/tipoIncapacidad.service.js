const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class TipoIncapacidadService {
  constructor() {}
  async create(data) {
    const newTipoIncapacidad =  await models.TipoIncapacidad.create( data ) //crear
    return newTipoIncapacidad;
  }
  async find() {
    const res = await models.TipoIncapacidad.findAll();
    return res;
  }
  async findOne(id) {
    const res  =  await models.TipoIncapacidad.findByPk(id);// buscar con id
    if(!res){
      boom.notFound('Registro Not Found');
    }
    return res;
  }
  async update(id, changes) {
    const TipoIncapacidad = await this.findOne(id);
    const res = await TipoIncapacidad.update(changes);
    return res;
  }
  async delete(id) {
    const TipoIncapacidad = await this.findOne(id);
    await TipoIncapacidad.destroy()
    return {id};
  }
}
module.exports = TipoIncapacidadService;