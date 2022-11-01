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
      result.push({ error });

    }
    
    return result;
  }

  async insertTransmitidos(data) {
    const insertarUnidades = await models.Transmision.create( data,{
      where: { transmitido: 'false'  } 
    }) 
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

  async findOnePeriodo(req) {

    const options = {
      attributes: ['id_periodos', 'per_fecha_inicio', 'per_fecha_final'],
      where: {}
    };
    (req.perNumero)
      ? options.where.perNumero = req.perNumero
      : null;
    (req.perAho)
      ? options.where.perAho = req.perAho
      : null;
    (req.perTipo)
      ? options.where.perTipo = req.perTipo
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
          unidadesTotales: datos.unidades,
          unidadesAplicadas: fecha1 / (1000 * 60 * 60 * 24) + 1,
          UnidadesSobrantes: resta
        })

      } else if ((FFI.getTime() <= PFF.getTime()) && (FFI.getTime() >= PFI.getTime())) {
        datosArray.push({ Unidades: datos.unidades, DiasAplicados: 0,  UnidadesSobrantes: resta })
      }



    });
    return ({ Success: datosArray });
  }



  async consulTransmitidos() {
    
    const consultaTransmitido = await models.Transmision.findAll({ 
      
      where:{ transmitido: 'true' },
      include: [ 
        {
          as:'altas_sga',
          model:models.AltasSGA,
          attributes: ['idTrabajador','idConcepto','idPeriodo','unidades','usuarioCaptura','fechaInicio','fechaFinal','createdAt','updatedAt'],
        }
      ],
    })
    return( consultaTransmitido )
  }

  async update(id,change) {
      
    const incapacidad = await models.Incapacidad.findByPk(id)
    const altas = await models.AltasSGA.findByPk(incapacidad.dataValues.id_altas_SGA)
    change.altas_sga.id = incapacidad.dataValues.id_altas_SGA
    change.id = id

    const incapacidadUpdate = await incapacidad.update(change);
    const sgaUpdate = await altas.update(change.altas_sga);
    
    return {res: incapacidadUpdate, res2: sgaUpdate};
  }

  async delete(id) {
    const ausencia = await this.findOne(id);
    await ausencia.destroy()
    return { id };
  }
}

module.exports = IncapacidadService;
