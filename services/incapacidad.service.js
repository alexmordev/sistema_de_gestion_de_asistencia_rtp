const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class IncapacidadService {
  constructor() { }

  async create(data) {
    const newIncapacidad = await models.Incapacidad.create(data,
      {
        include: ['altas_sga']
      })
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
  async findOnePeriodo(req) {

    const options = {
      attributes: ['id_periodos','per_fecha_inicio','per_fecha_final'],
      where: {}
    };
    (req.per_numero)
      ?  options.where.per_numero = req.per_numero
      :  null;
    (req.per_aho)
        ?  options.where.per_aho = req.per_aho
        :  null;
    (req.per_tipo)
      ?  options.where.per_tipo = req.per_tipo
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
      
      const FII = new Date(datos.fechaInicio);//fechaInicioIncapacidad
      const FFI = new Date( datos.fechaFinal);//fechaFinalIncapacidad

    if( ( FII.getTime() >= PFI.getTime() ) && ( FII.getTime() <= PFF.getTime() ) ){
      datosArray.push({msg: 'Entro al 1', Unidades:datos.unidades})
      const fecha1 = PFF - FII;
      console.log( ` Unidades: ${ datos.unidades }, Días Aplicados ${ fecha1/(1000*60*60*24) +1 }` );

      if(  datos.unidades > fecha1/(1000*60*60*24) +1 ){
        let resta = `${ datos.unidades }` - `${ fecha1/(1000*60*60*24) +1 }`
        console.log({ Unidades_Sobrantes: resta });
      }
 
    }else if( ( FFI.getTime() <= PFF.getTime()) && ( FFI.getTime() >= PFI.getTime() ) ){
      datosArray.push({msg: 'Entro al 2',  Unidades:datos.unidades})
    }else{
      datosArray.push({msg: 'No entran en el rango de fechas'})
    }

    });
    console.log({ datos: datosArray });
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