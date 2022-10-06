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
    const per_numero = query.per_numero.split(',');
    const per_aho = query.per_aho.split(',');
    const per_tipo = query.per_tipo.split(',');
    const options = {
        where: {per_numero,per_aho,per_tipo}
    }
    const periodo = await models.Periodo.findAll(options);
    return periodo;
  }

  async findOne(query) {
    const today = new Date();
    const periodo  =  await models.Periodo.findAll( {
        attributes:['per_numero'],
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

