const boom = require('@hapi/boom');
const { Op } = require("sequelize");
const { models } = require('../libs/sequelize');
// var moment = require('moment');

class PeriodoService {
  constructor() {}

  async create(data) {
    const newPeriodo = await models.Periodo.create( data )
    return newPeriodo;
  }

  async find(query) {
    const options = {
      where: {}
    };
    (query.perNumero)
      ?  options.where.per_numero = query.per_numero.split(',')
      :  null;
    (query.perAho)
        ?  options.where.per_aho = query.per_aho.split(',')
        :  null;
    (query.perTipo)
      ?  options.where.per_tipo = query.per_tipo.split(',')
      :  null;
   
    const periodo = await models.Periodo.findAll(options);
    return periodo;
  }

  async findOne(query) {
    const today = new Date();
    const periodo  =  await models.Periodo.findAll( {
        attributes:['per_numero', 'per_fecha_inicio', 'per_fecha_final'],
            where:{
                per_tipo:query.per_tipo,
                [Op.and]:[
                    {per_fecha_inicio:{ [Op.lte]:today}},
                    {per_fecha_final: { [Op.gte]:today}}
                ],
            }
    });
    if(!periodo){
      boom.notFound('Registro no encontrado');
    }
    return periodo;
  }

  async update(id, changes) {
    const periodo = await this.findOne(id);
    const res = await periodo.update(changes);
    return res;
  }

  async delete(id) {
    const periodo = await this.findOne(id);
    await periodo.destroy()
    return {id};
  }
}

module.exports = PeriodoService;

