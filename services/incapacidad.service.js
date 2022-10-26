const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class IncapacidadService {
  constructor() { }

  async create(data) {

    const t = await sequelize.transaction();
    const result = [];
    try {

      const sga = await models.AltasSGA.create(data.altas_sga, { transaction: t });
      console.log({ object: data });

      // crear el objeto que se va a pasar al segundo create con el id que devuelve el primer create
      data.id_altas_SGA = sga.id
      const incapacidad = await models.Incapacidad.create(data, { transaction: t });

      console.log({ object: data });
      await t.commit();

      result.push(sga, incapacidad);

    } catch (error) {

      await t.rollback();
      // result.push({ error });
      return ;

    }

    return result;
  }

  async find() {
    const res = await models.Incapacidad.findAll({
      include: [
        {
          association: 'altas_sga',
          include: ['trab_periodos','trabajador_vista']
        },
        'catalogo_tipo_incapacidad',
        'catalogo_ramo_seguro'
      ]
    });

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
  async findOnePeriodo(req) {

    const options = {
      attributes: ['id_periodos', 'per_fecha_inicio', 'per_fecha_final'],
      where: {}
    };
    (req.per_numero)
      ? options.where.per_numero = req.per_numero
      : null;
    (req.per_aho)
      ? options.where.per_aho = req.per_aho
      : null;
    (req.per_tipo)
      ? options.where.per_tipo = req.per_tipo
      : null;

    const periodo = await models.Periodo.findOne(options);
    const PFI = new Date(periodo.dataValues.per_fecha_inicio);//PeriodoFechaInicial
    const PFF = new Date(periodo.dataValues.per_fecha_final);//PeriodoFechaFinal

    const idPeriodo = await models.AltasSGA.findAll({
      include: [{
        association: 'trab_periodos',
        where: { id_periodos: periodo.dataValues.id_periodos }
      }]
    })

    const datosArray = [];
    idPeriodo.forEach(datos => {

      const FII = new Date(datos.fechaInicio);//fechaInicioIncapacidad
      const FFI = new Date(datos.fechaFinal);//fechaFinalIncapacidad

      if ((FII.getTime() >= PFI.getTime()) && (FII.getTime() <= PFF.getTime())) {
        const fecha1 = PFF - FII;
        let resta = 0

        if (datos.unidades > fecha1 / (1000 * 60 * 60 * 24) + 1) {
          resta = `${datos.unidades}` - `${fecha1 / (1000 * 60 * 60 * 24) + 1}`
        }

        datosArray.push({
          idAltas: datos.id,
          Unidades: datos.unidades,
          DiasAplicados: fecha1 / (1000 * 60 * 60 * 24) + 1,
          UnidadesSobrantes: resta
        })

      } else if ((FFI.getTime() <= PFF.getTime()) && (FFI.getTime() >= PFI.getTime())) {
        datosArray.push({ Unidades: datos.unidades, DiasAplicados: 0 })
      }
    });
    return ({ Success: datosArray });
  }

  // async update(id, changes) {
  //   const incapacidad = await models.Incapacidad.findByPk(id);
  //   const sga = await incapacidad.update(changes)
  //   const res = await incapacidad.update(changes)

  //   result.push(sga, incapacidad);
  //   return res;
  // }

  // const ausencia = await this.findOne(id);
  // const res = await ausencia.update(changes);

  async update(id, changes) {
  const incapacidad = await this.findOne(id);
  const res = await incapacidad.update(changes,
    {
      include: [{
        association: 'altas_sga',
        where: { id: id }
      }]
    });

  }

  // async update(id) {

  //   const t = await sequelize.transaction();
  //   const result = [];
  //   try {

  //     const sga = await models.AltasSGA.update(id.altas_sga, { transaction: t });
  //     console.log({ object: id });

  //     // crear el objeto que se va a pasar al segundo create con el id que devuelve el primer create
  //     id.id_altas_SGA = sga.id
  //     const incapacidad = await models.Incapacidad.update(id, { transaction: t });

  //     // console.log({ object: id });
  //     // await t.commit();

  //     result.push(sga, incapacidad);

  //   } catch (error) {

  //     await t.rollback();
  //     result.push({ error });
  //     // return ;

  //   }

  //   return result;
  // }

  // async update(id) {
    
  //   const incapacidad = await this.findOne(id,{
  //       // where:{
  //       //   id: id,
  //       // }
  //       include: [{
  //         association: 'altas_sga',
  //         where: { id: id }
  //       }]
        
  //     })
  //   const res = await incapacidad.update(changes);
  //   return res
  //   // const incapacidad = await this.findOne(id)
  //   // const rta = await incapacidad.update(changes)

  //   // return rta;
  // }

  async delete(id) {
    const ausencia = await this.findOne(id);
    await ausencia.destroy()
    return { id };
  }
}

module.exports = IncapacidadService;
