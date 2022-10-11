const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class JustificacionService {
  constructor() {}

  async create(data) {
    const newAusencia = await models.Justificacion.create( data )
    return newAusencia;
  }
  
  async find() {
    const res = await models.Justificacion.findAll(
      {
        // include:['trabajador_vista','catalogo_conceptos']
        include:['altas_sga']
      }
    );
    return res;
  }
  
  async findOne(id) {
    const ausencia  =  await models.Justificacion.findByPk(id);
    // buscar con id
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

module.exports = JustificacionService;