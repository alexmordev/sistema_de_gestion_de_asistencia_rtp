const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class AusenciaService {
  constructor() {}

  async create(data) {
    const newAusencia = await models.AltasSGA.create( data )
    return newAusencia;
  }
  async find() {
    const res = await models.AltasSGA.findAll();
    return res;
  }
  async findOne(id) {
    const ausencia  =  await models.AltasSGA.findByPk(id);// buscar con id
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


/**
const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class AusenciaService {
  constructor() {}

  async test(id) {
    const newAusencia = await models.AltasSGA.findByPk( id )
    return newAusencia;
  }
  async create(data) {
    const newAusencia = await models.AltasSGA.create( data, {
        include:['catalogoConceptos']
    } )
    return newAusencia;
  }
  async find() {
    const res = await models.AltasSGA.findAll({
        attributes:[
            'id',
            'fechaCaptura',
            'unidades'
          ],
          include:[
            {model:models.CatalogoConceptos , as:'catalogoConceptos', attributes:['id', 'createdAt']},
            {model:models.Perido, as:'perido', attributes:['id', 'createdAt']},
            {model:models.Trabajador, as:'trabajador', attributes:['id', 'createdAt']}
          ]
    });
    return res;
  }
  async findOne(id) {
    const ausencia  =  await models.AltasSGA.findByPk(id,{
      include:['catalogoConceptos']
    });// buscar con id
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

 */