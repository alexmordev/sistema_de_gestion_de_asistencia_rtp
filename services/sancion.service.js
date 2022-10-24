const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class SancionService {
  constructor() {}

  async create(data) {
    const getSancion = await models.AltasSGA.findOne( {
      where:{
        idTrabajador: data.idTrabajador,
        idConcepto: data.idConcepto,
        oficio: data.oficio,
        unidades: data.unidades,
        fechaInicio: data.fechaInicio,
        fechaFinal: data.fechaFinal
      }
    } ) 
    const newSancion = getSancion ? 'El registro ya existe en SGA':  await models.AltasSGA.create( data);
    return newSancion;
  }

  async find() {
    const res = await models.AltasSGA.findAll(
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
        where:
        {
          id_concepto:5
        }
      },
    );
    return res;
  }

  async findOne(id) {
    const res  =  await models.AltasSGA.findByPk(id,
      {
        include:['trabajador_vista', 'trab_periodos','catalogo_conceptos'],
        where:
        {
          id_concepto:3
        }
      }
    );// buscar con id
    if(!res){
      boom.notFound('Category Not Found');
    }
    return res;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy()
    return {id};
  }
}

module.exports = SancionService;