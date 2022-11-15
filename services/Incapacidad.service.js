const { Op, fn, col } = require("sequelize");
const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Trabajador } = require('../database/models/Trabajador.model');
const setupModels = require('../database/models');
const { AltasSGA } = require('../database/models/AltasSGA.model');

class IncapacidadService {
  constructor() { }

  async create(data) {
    const t = await sequelize.transaction();
    const result = [];
    try {

      const sga = await models.AltasSGA.create(data.altas_sga, { transaction: t });

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
    const insertarUnidades = await models.Transmision.create(data, {
      where: { transmitido: 'false' }
    })
  }

  async find() {
    const res = await models.Incapacidad.findAll({
      include: [
        {
          association: 'altas_sga',
          include: ['trab_periodos', 'trabajador_vista']
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

  async busquedaTransmitido() {

    const busqueda = await models.Incapacidad.findAll({
      attributes: ['idAltasSGA'],
      order: ['idAltasSGA'],
      include: [
        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['id', 'unidades', 'fechaInicio', 'fechaFinal'],
          include: [

            {
              as: 'catalogo_conceptos',
              model: models.CatalogoConcepto,
              attributes: ['clave'],
            },

            {
              as: 'trabajador_vista',
              model: Trabajador,
              attributes: ['trabCredencial', 'nombreCompleto', 'tipoTrabDiv', 'tipoTrabDescripcion', 'trabNoAfiliacion', 'modulo'],
            },

            {
              as: 'transmision',
              model: models.Transmision,
              attributes: ['idAltasSGA', 'unidadesAplicadas'],
            },

            {
              as: 'trab_periodos',
              model: models.Periodo,
              attributes: ['perTipo', 'perNumero', 'perFechaInicio', 'perFechaFinal']
            }
          ],
        }
      ],
    });

    const data = await models.Transmision.findAll({
      attributes: ['idAltasSGA', [fn('sum', col('unidades_aplicadas')), 'TotalDiasAplicados']],
      group: ['idAltasSGA']
    });

    const datosArray = [];
    const transmitidos = data.map(dat => ({ id: dat.dataValues.idAltasSGA, unidades: dat.dataValues.TotalDiasAplicados }))

    busqueda.forEach(datos => {
      const encontrar = transmitidos.find(element => element.id === datos.dataValues.idAltasSGA);

      if (encontrar) {

        const maximoDescontar = (datos.altas_sga.trab_periodos.perTipo === '0') ? 7 : 14;
        const disponiblesDescontar = `${datos.altas_sga.unidades}` - `${encontrar.unidades}`
        const unidadesPeriodoTransmitidas = (disponiblesDescontar > maximoDescontar) ? maximoDescontar : disponiblesDescontar
        const unidadesSiguientePeriodo = datos.altas_sga.unidades - ( encontrar.unidades + unidadesPeriodoTransmitidas ) 

        datosArray.push({
          idAltas: `${datos.idAltasSGA}`,
          credencial: `${datos.altas_sga.trabajador_vista.trabCredencial}`,
          nombreCompleto: `${datos.altas_sga.trabajador_vista.nombreCompleto}`,
          numeroSeguroSocial: `${datos.altas_sga.trabajador_vista.trabNoAfiliacion}`,
          modulo: `${datos.altas_sga.trabajador_vista.modulo}`,
          periodoTipo: `${datos.altas_sga.trab_periodos.perTipo}`,
          numeroPeriodo: `${datos.altas_sga.trab_periodos.perNumero}`,
          fechaInicio: `${datos.altas_sga.fechaInicio}`,
          fechaFinal: `${datos.altas_sga.fechaFinal}`,
          concepto: `${datos.altas_sga.catalogo_conceptos.clave}`,
          unidadesTotales: `${datos.altas_sga.unidades}`,
          UnidadesPeriodoTransmitidas: `${unidadesPeriodoTransmitidas}`,
          UnidadesSiguientePeriodo: `${unidadesSiguientePeriodo}`,
          TotalTransmitidos: `${encontrar.unidades}`,
        })

      } else {

        const PFI = new Date(datos.altas_sga.trab_periodos.perFechaInicio);//PeriodoFechaInicial
        const PFF = new Date(datos.altas_sga.trab_periodos.perFechaFinal);//PeriodoFechaFinal

        const FII = new Date(datos.altas_sga.fechaInicio);//fechaInicioIncapacidad
        const FFI = new Date(datos.altas_sga.fechaFinal);//fechaFinalIncapacidad

        let resta = 0;
        let unidades = 0;
        const fecha1 = PFF - FII;

        if ((FII.getTime() >= PFI.getTime()) && (FII.getTime() <= PFF.getTime())) {

          if (datos.altas_sga.unidades > fecha1 / (1000 * 60 * 60 * 24) + 1) {
            resta = `${datos.altas_sga.unidades}` - `${fecha1 / (1000 * 60 * 60 * 24) + 1}`
          } else if (datos.altas_sga.unidades < fecha1 / (1000 * 60 * 60 * 24) + 1) {
            unidades = `${datos.altas_sga.unidades}`
          }

          if (datos.altas_sga.unidades === resta) {
            console.log(datos.altas_sga.id, 'Ya no tiene unidades a transmitir');
          } else {
            datosArray.push({
              idAltas: `${datos.idAltasSGA}`,
              credencial: `${datos.altas_sga.trabajador_vista.trabCredencial}`,
              nombreCompleto: `${datos.altas_sga.trabajador_vista.nombreCompleto}`,
              numeroSeguroSocial: `${datos.altas_sga.trabajador_vista.trabNoAfiliacion}`,
              modulo: `${datos.altas_sga.trabajador_vista.modulo}`,
              periodoTipo: `${datos.altas_sga.trab_periodos.perTipo}`,
              numeroPeriodo: `${datos.altas_sga.trab_periodos.perNumero}`,
              fechaInicio: `${datos.altas_sga.fechaInicio}`,
              fechaFinal: `${datos.altas_sga.fechaFinal}`,
              concepto: `${datos.altas_sga.catalogo_conceptos.clave}`,
              unidadesTotales: `${datos.altas_sga.unidades}`,
              UnidadesPeriodoTransmitidas: `${datos.altas_sga.unidades}` - `${resta}`,
              UnidadesSiguientePeriodo: `${ resta }`,
             
            })
          }
        } else if ((FFI.getTime() <= PFF.getTime()) && (FFI.getTime() >= PFI.getTime())) {

          if (datos.altas_sga.unidades > fecha1 / (1000 * 60 * 60 * 24) + 1) {
            resta = `${datos.altas_sga.unidades}` - `${fecha1 / (1000 * 60 * 60 * 24) + 1}`
          } else if (datos.altas_sga.unidades < fecha1 / (1000 * 60 * 60 * 24) + 1) {
            unidades = `${datos.altas_sga.unidades} `
          }
          console.log('entra2', datos.idAltasSGA);
          if (encontrar) {
            resta = encontrar.unidades
          }

          if (datos.altas_sga.unidades === resta) {
            console.log(datos.altas_sga.id, 'Ya no tiene unidades a transmitir');
          } else {
            datosArray.push({
              idAltas: `${datos.idAltasSGA}`,
              credencial: `${datos.altas_sga.trabajador_vista.trabCredencial}`,
              nombreCompleto: `${datos.altas_sga.trabajador_vista.nombreCompleto}`,
              numeroSeguroSocial: `${datos.altas_sga.trabajador_vista.trabNoAfiliacion}`,
              modulo: `${datos.altas_sga.trabajador_vista.modulo}`,
              periodoTipo: `${datos.altas_sga.trab_periodos.perTipo}`,
              numeroPeriodo: `${datos.altas_sga.trab_periodos.perNumero}`,
              fechaInicio: `${datos.altas_sga.fechaInicio}`,
              fechaFinal: `${datos.altas_sga.fechaFinal}`,
              concepto: `${datos.altas_sga.catalogo_conceptos.clave}`,
              unidadesTotales: `${datos.altas_sga.unidades}`,
              UnidadesPeriodoTransmitidas: `${datos.altas_sga.unidades}` - `${resta}`,
              UnidadesSiguientePeriodo: `${resta}`,
              
            })
          }
        }

      }
    })
    return datosArray
  }

  async consulTransmitidos() {

    const consultaTransmitido = await models.Transmision.findAll({

      where: { transmitido: 'true' },
      include: [
        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['idTrabajador', 'idConcepto', 'idPeriodo', 'unidades', 'usuarioCaptura', 'fechaInicio', 'fechaFinal', 'createdAt', 'updatedAt'],
        }
      ],
    })
    return (consultaTransmitido)
  }

  async consulPorTransmir() {

    const consultaTransmitido = await models.Transmision.findAll({

      where: { transmitido: 'false' },
      include: [
        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['idTrabajador', 'idConcepto', 'idPeriodo', 'unidades', 'usuarioCaptura', 'fechaInicio', 'fechaFinal', 'createdAt', 'updatedAt'],
        }
      ],
    })
    return (consultaTransmitido)
  }

  async update(id, change) {
    const incapacidad = await models.Incapacidad.findByPk(id)
    const sga = await models.AltasSGA.findByPk(incapacidad.dataValues.id_altas_SGA)


    change.altas_sga.id = incapacidad.dataValues.id_altas_SGA
    change.id = id;

    const incapacidad1 = await incapacidad.update(change)
    const incapacidad2 = await sga.update(change.altas_sga)
    return (incapacidad1, incapacidad2);
  }

  async delete(id) {
    const ausencia = await this.findOne(id);
    await ausencia.destroy()
    return { id };
  }
}

module.exports = IncapacidadService;