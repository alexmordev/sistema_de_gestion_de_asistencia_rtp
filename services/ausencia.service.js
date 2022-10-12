const boom = require('@hapi/boom');
const { where } = require('sequelize');
const {models} = require('../libs/sequelize');

class AusenciaService {
  constructor() {}

  async create(data) {
    const newAusencia = await models.AltasSGA.create( data )
    return newAusencia;
  }
  async findAll() {
    const res = await models.AltasSGA.findAll(
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
        where:
        {
          id_concepto:3
        }
      },
        
    );
    return res;
  }
  async findOne(id) {
    const ausencia  =  await models.AltasSGA.findByPk(id,
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
        where:
        {
          id_concepto:3
        }
      }
    );
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
    return { id };
  }
}

module.exports = AusenciaService;
