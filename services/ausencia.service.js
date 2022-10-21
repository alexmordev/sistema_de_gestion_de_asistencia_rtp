const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class AusenciaService {
  constructor() {}

  async create(data) {
    const newAusencia = await models.AltasSGA.create( data )
    console.log({datos: newAusencia});
    return newAusencia;
  } 
  async find() {
    const res = await models.AltasSGA.findAll(
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
      });
      console.log({datos: res});
    return res;
  }
  async findOne(id) {
    const ausencia  =  await models.AltasSGA.findByPk(id,{
      
      include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],

    });
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

module.exports = AusenciaService;
