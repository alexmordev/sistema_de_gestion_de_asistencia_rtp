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
  async findOnePeriodo(query) {

    const options = {
      attributes: ['id_periodos','per_fecha_inicio','per_fecha_final'],
      where: {}
    };
    (query.per_numero)
      ?  options.where.per_numero = query.per_numero
      :  null;
    (query.per_aho)
        ?  options.where.per_aho = query.per_aho
        :  null;
    (query.per_tipo)
      ?  options.where.per_tipo = query.per_tipo
      :  null;
  
    const periodo = await models.Periodo.findOne(options);
    const PFI = new Date(periodo.dataValues.per_fecha_inicio);//PeriodoFechaInicial
    const PFF = new Date(periodo.dataValues.per_fecha_final);//PeriodoFechaFinal

    const idPeriodo = await models.AltasSGA.findAll({ 
      include: [{
        association: 'trab_periodos',
        where: { id_periodos: periodo.dataValues.id_periodos  }
      }]
    })


    const datosArray = [];
    idPeriodo.forEach(datos => {

      console.log(PFI,PFF);
      // console.log(datos.fechaInicio);
      const FII = new Date(datos.fechaInicio);//fechaInicioIncapacidad
      const FFI = new Date( datos.fechaFinal);//fechaFinalIncapacidad
      console.log({FII:FII,FFI:FFI});

    if( (FII.getTime() >= PFI.getTime()) && ( FII.getTime() <= PFF.getTime() ) ){
      datosArray.push({msg: 'Entro al uno'})
    }else if( ( FFI.getTime() <= PFF.getTime()) && ( FFI.getTime() >= PFI.getTime() ) ){
      datosArray.push({msg: 'Entro al 2'})
    }else{
      datosArray.push({msg: 'Ninguno'})
    }


      // console.log(datos);
    });
    console.log({datos: datosArray});

    // console.log(idPeriodo[0].dataValues.fechaInicio);
    // console.log(idPeriodo);
    // console.log({ooooo: periodo.dataValues.per_fecha_inicio});

    // console.log({mostratDatos: idPeriodo});

    // return({mostratDatos: periodo.dataValues});

    // const FII = new Date(idPeriodo[0].dataValues.fechaInicio);//fechaInicioIncapacidad
    // const FFI = new Date( idPeriodo[0].dataValues.fechaFinal);//fechaFinalIncapacidad

    // // (FII.getTime() >= PFI.getTime()) && ( FII.getTime() <= PFF.getTime() )1
    // // ( FFI.getTime() <= PFF.getTime()) && ( FFI.getTime() >= PFI.getTime() )2

    // if( (FII.getTime() >= PFI.getTime()) && ( FII.getTime() <= PFF.getTime() ) ){
    //  return 'true 1'
    // }else if( ( FFI.getTime() <= PFF.getTime()) && ( FFI.getTime() >= PFI.getTime() ) ){
    //   return ({Datos:idPeriodo})
    // }else{
    //   throw new Error
    // }


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