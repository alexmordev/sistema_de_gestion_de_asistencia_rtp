const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class CatalogoConceptoService {
  constructor() {}

  async create(data) {
    const newCatalogo = await models.CatalogoConcepto.create( data )
    return newCatalogo;
  }
  async find() {
    const res = await models.CatalogoConcepto.findAll();
    return res;
  }
  async findOne(id) {
    const catalogo  =  await models.CatalogoConcepto.findByPk(id);// buscar con id
    if(!catalogo){
      boom.notFound('Registro no encontrado');
    }
    return catalogo;
  }

  async update(id, changes) {
    const catalogo = await this.findOne(id);
    const res = await catalogo.update(changes);
    return res;
  }
  
  async delete(id) {
    const catalogo = await this.findOne(id);
    await catalogo.destroy()
    return {id};
  }
}

module.exports = CatalogoConceptoService;

