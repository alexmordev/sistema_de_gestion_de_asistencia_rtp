const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class IncapacidadService {
  constructor() { }

  async create(data) {
    const newIncapacidad = await models.Incapacidad.create(data,
      {
        include: ['altas_sga']
      })
    console.log({ datos: newIncapacidad });
    return newIncapacidad;
  }

  async find() {
    const res = await models.Incapacidad.findAll({
      include: [
        {
          association: 'altas_sga',
          include: ['trab_periodos']
        },
        'catalogo_tipo_incapacidad',
        'catalogo_ramo_seguro'
      ]
    });
    // console.log(res.altas_sga);
    return res;
  }

  //buscar por id
  async findOne(id) {

    const res = await models.Incapacidad.findByPk(id, {
      include: [
        {
          association: 'altas_sga',
          include: ['trab_periodos']
        },
        'catalogo_tipo_incapacidad',
        'catalogo_ramo_seguro'
      ]
    })
    return res;

  }
  // idPeriodo//
  async findOnePeriodo(id) {

    const incapacidad = await models.Incapacidad.findAll({
      include: [{
        association: 'altas_sga',
        where: { id_periodos: id }
      }]
    });

    const periodos = await models.Periodo.findByPk(id)

    let FII = new Date(incapacidad[0].altas_sga.fechaInicio);//fechaInicioIncapacidad
    let FFI = new Date(incapacidad[0].altas_sga.fechaFinal);//fechaFinalIncapacidad

    let PFI = new Date(periodos.perFechaInicio);//PeriodoFechaInicial
    let PFF = new Date(periodos.perFechaFinal);//PeriodoFechaFinal
    console.log({ FI: FII, FF: FFI, PI: PFI, PF: PFF });

    if ((FII.getTime() >= PFI.getTime()) && (FII.getTime() <= PFF.getTime())) {

      return '1'
    } else if ((FFI.getTime() <= PFF.getTime()) && (FFI.getTime() >= PFI.getTime())) {

      return ('2')
    } else {
      
      return ({ error: 'error' })
    }

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

module.exports = IncapacidadService;