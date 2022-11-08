const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { Op } = require("sequelize");
const { models } = require('../libs/sequelize');
const { Trabajador } = require('../database/models/Trabajador.model');

class ReporteGeneralService {
  constructor() {}

  async credencialRangofecha(query) {

    const date1 = new Date(query.fechaInicio);
    const date2 = new Date(query.fechaInicioFin);

    const primerDia = new Date(date1.getFullYear(), date1.getMonth(), 1);
    const ultimoDia = new Date(date2.getFullYear(), date2.getMonth() + 1, 0);

    console.log(date1, date2);

    const incapacidad = await models.Incapacidad.findAll({
      attributes: ['id_altas_SGA', 'umf', 'clave_seguro', 'fecha_expedicion'],

      include: [

        {
          as: 'catalogo_ramo_seguro',
          model: models.RamoSeguro,
          attributes: ['nombre'],
        },

        {
          as: 'catalogo_tipo_incapacidad',
          model: models.TipoIncapacidad,
          attributes: ['tipo'],
        },

        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['unidades', 'fecha_inicio', 'fecha_final'],
          where: {
            [Op.and]:
              [
                { id_trabajador: query.idTrabajador },
                { fecha_inicio: { [Op.between]: [date1, date2] } }
              ],
          },
          include: [
            {
              as: 'trabajador_vista',
              model: Trabajador,
              attributes: ['trabCredencial', 'modulo', 'tipoTrabProc', 'nombreCompleto', 'trab_no_afiliacion', 'trab_rfc', 'trab_curp'],
            },

            {
              as: 'trab_periodos',
              model: models.Periodo,
              attributes: ['per_numero'],
            },
          ]
        },
      ],
    })

    const incapacidadCredencial = incapacidad;
    return ({ ReporteGeneral: incapacidadCredencial });
  }

  async busquedaMes(query) {

    const meses = [ 1,2,3,4,5,6,7,8,9,10,11,12 ]
    const numDatos = meses.length;

    
    const fecha = `${query.aho}` + '/' + `${query.month}` + '/' + '1'
    const primerDia = new Date(fecha);
    
    const obtenerFechaFinDeMes = (fecha) => {
      const primerDia2 = new Date(fecha);
      return new Date(primerDia2.getFullYear(), primerDia2.getMonth() + 1, 0);
    };
    
    const segundoDia = obtenerFechaFinDeMes(fecha);
    
    // console.log(primerDia,segundoDia); 
    if(fecha === numDatos){
      console.log(meses,'1');
    }else{
      console.log(segundoDia);
    }   

    const incapacidad = await models.Incapacidad.findAll({
      attributes: ['idAltasSGA', 'umf', 'claveSeguro', 'fechaExpedicion'],

      include: [

        {
          as: 'catalogo_ramo_seguro',
          model: models.RamoSeguro,
          attributes: ['nombre'],
        },

        {
          as: 'catalogo_tipo_incapacidad',
          model: models.TipoIncapacidad,
          attributes: ['tipo'],
        },

        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['unidades','fechaInicio', 'fechaFinal'],
          where: { fecha_inicio: { [Op.between]: [primerDia, segundoDia] } },
          include: [
            {
              as: 'trabajador_vista',
              model: Trabajador,
              attributes: ['trabCredencial', 'modulo', 'tipoTrabProc', 'nombreCompleto', 'trabNoAfiliacion', 'trabRfc', 'trabCurp'],
            },

            {
              as: 'trab_periodos',
              model: models.Periodo,
              attributes: ['per_numero'],
            },
          ]
        },
      ],
    })

    const incapacidadCredencial = incapacidad;
    return ({ ReporteGeneral: incapacidadCredencial });
  }

  async busquedaFechas(query) {

    const date1 = new Date(query.fechaInicio);
    const date2 = new Date(query.fechaInicioFin);

    const primerDia = new Date(date1.getFullYear(), date1.getMonth(), 1);
    const ultimoDia = new Date(date2.getFullYear(), date2.getMonth() + 1, 0);


    const incapacidad = await models.Incapacidad.findAll({
      attributes: ['idAltasSGA', 'umf', 'claveSeguro', 'fechaExpedicion'],
      include: [

        {
          as: 'catalogo_ramo_seguro',
          model: models.RamoSeguro,
          attributes: ['nombre'],
        },

        {
          as: 'catalogo_tipo_incapacidad',
          model: models.TipoIncapacidad,
          attributes: ['tipo'],
        },

        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['unidades','fechaInicio', 'fechaFinal'],
          where: {
            [Op.and]:
              [
                { fecha_inicio: { [Op.between]: [date1, date2] } },
                { fecha_inicio: { [Op.between]: [date1, date2] } }
              ],
          },
          include: [
            {
              as: 'trabajador_vista',
              model: Trabajador,
              attributes: ['trabCredencial', 'modulo', 'tipoTrabProc', 'nombreCompleto', 'trabNoAfiliacion', 'trabRfc', 'trabCurp'],
            },

            {
              as: 'trab_periodos',
              model: models.Periodo,
              attributes: ['per_numero'],
            },

          ]
        },
      ],
    })

    const incapacidadCredencial = incapacidad;
    return ({ Filtrado: incapacidadCredencial });

  }

  async busquedaCredencial(query) {

    const incapacidad = await models.Incapacidad.findAll({
      attributes: ['idAltasSGA', 'umf', 'claveSeguro', 'fechaExpedicion','id_ramo_seguro'],

      include: [
        
        {
          as: 'catalogo_ramo_seguro',
          model: models.RamoSeguro,
          attributes: ['nombre'],
        },
        {
          as: 'catalogo_tipo_incapacidad',
          model: models.TipoIncapacidad,
          attributes: ['tipo'],
        },

        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['unidades','fechaInicio', 'fechaFinal'],
          where:
            { id_trabajador: query.idTrabajador },
          include: [
            {
              as: 'trabajador_vista',
              model: Trabajador,
              attributes: ['trabCredencial', 'modulo', 'tipoTrabProc', 'nombreCompleto', 'trabNoAfiliacion', 'trabRfc', 'trabCurp'],
            },
            {
              as: 'trab_periodos',
              model: models.Periodo,
              attributes: ['per_numero'],
            },
          ]
        },
      ],
    })
    const incapacidadCredencial = incapacidad;
    return ({ ReporteGeneral: incapacidadCredencial });
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

module.exports = ReporteGeneralService;

