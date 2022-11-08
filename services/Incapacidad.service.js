const { Op,  fn, col } = require("sequelize");
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

  async busquedaTransmitido() {

    const busqueda = await models.Incapacidad.findAll({ 
      attributes: [ 'idAltasSGA' ],
      order:['idAltasSGA'],
      include: [
        {
          as: 'altas_sga',
          model: models.AltasSGA,
          attributes: ['id','unidades','fechaInicio','fechaFinal'],
          include: [
           
            {
              as:'transmision',
              model: models.Transmision,
              attributes: [ 'idAltasSGA', 'unidadesAplicadas'],
              // raw: true
            },

            {
              as:'trab_periodos',
              model: models.Periodo,
              attributes: [ 'perNumero','perFechaInicio','perFechaFinal' ]
            }
          ],
        }
      ]
    });   

    const data = await models.Transmision.findAll({
      attributes: [ 'idAltasSGA',[fn('sum', col('unidades_aplicadas')), 'TotalDiasAplicados']],
      // where:{
      //   idAltasSGA: busqueda[0].altas_sga.id,
      // },
      group:['idAltasSGA']
    });

    
    const datosArray = [];
    
    const transmitidos = data.map(dat =>({ id: dat.dataValues.idAltasSGA, unidades: dat.dataValues.TotalDiasAplicados }))
    // console.log(transmitidos[0].id === datos.idAltasSGA)
    
    
    
    busqueda.forEach(datos => {
      const encontrar = transmitidos.find(element => element.id ===  datos.dataValues.idAltasSGA);
      console.log({data: encontrar});

      const PFI = new Date(datos.altas_sga.trab_periodos.perFechaInicio);//PeriodoFechaInicial
      const PFF = new Date(datos.altas_sga.trab_periodos.perFechaFinal);//PeriodoFechaFinal
      
      const FII = new Date(datos.altas_sga.fechaInicio);//fechaInicioIncapacidad
      const FFI = new Date(datos.altas_sga.fechaFinal);//fechaFinalIncapacidad

      const unidadesAltas = datos.altas_sga.unidades;
      let resta = 0; 
      let unidades = 0;
      const fecha1 = PFF - FII;

      if ((FII.getTime() >= PFI.getTime()) && (FII.getTime() <= PFF.getTime())) {

        if ( unidadesAltas > fecha1 / ( 1000 * 60 * 60 * 24 ) + 1) {
          resta = `${ unidadesAltas }` - `${ fecha1 / (1000 * 60 * 60 * 24) + 1 }`
        }else if( unidadesAltas < fecha1 / ( 1000 * 60 * 60 * 24 ) + 1){
          unidades = `${unidadesAltas }` 
        }

        if( encontrar ){
          resta = encontrar.unidades
        }

        if( datos.altas_sga.unidades === resta){
          console.log('ya aplico');
        }


        datosArray.push({
          idAltas:  datos.idAltasSGA,
          unidadesTotales: datos.altas_sga.unidades,
          UnidadesSobrantes: `${ datos.altas_sga.unidades }` - `${ resta }`,
          UnidadesAplicadasTotales: resta,
        })


        // console.log(datos.altas_sga.transmision);
      // }else{
      //   console.log('entra en esta ');
      // }

      } else if ((FFI.getTime() <= PFF.getTime()) && (FFI.getTime() >= PFI.getTime())) {
        
        if ( unidadesAltas > fecha1 / ( 1000 * 60 * 60 * 24 ) + 1) {
          resta = `${ unidadesAltas }` - `${ fecha1 / (1000 * 60 * 60 * 24) + 1 }`
        }else if( unidadesAltas < fecha1 / ( 1000 * 60 * 60 * 24 ) + 1){
          unidades = `${unidadesAltas }` 
        }

        datosArray.push({
          idAltas:  datos.idAltasSGA,
          unidadesTotales: datos.altas_sga.unidades,
          UnidadesAplicadas: `${ datos.altas_sga.unidades }` - `${ resta }`,
          UnidadesSobrantes: resta,
        })
      }
      
      
      
      // console.log(datos.altas_sga);
    })

      // console.log(datos.altas_sga.transmision[0].dataValues.unidadesAplicadas);
      
      // if(datos.altas_sga.dataValues.transmision.length !== 0 ){
      //   resta = datos.altas_sga.transmision[0].dataValues.unidadesAplicadas
      // //   // resta = datos.altas_sga.dataValues.transmision
      // console.log(resta);
      // }else{
      //   // resta = datos.altas_sga.transmision[0].dataValues.unidadesAplicadas
      //   // console.log(resta);

      // }
    // console.log(busqueda[0].altas_sga.transmision[0].dataValues.unidadesAplicadas);
    // console.log(busqueda.altas_sga);
    return datosArray
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

  async consulPorTransmir() {
    
    const consultaTransmitido = await models.Transmision.findAll({ 
      
      where:{ transmitido: 'false' },
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

  async update(id,change){
    const incapacidad = await models.Incapacidad.findByPk(id)
    const sga = await models.AltasSGA.findByPk(incapacidad.dataValues.id_altas_SGA)
    // let ob = change.altas_sga

    change.altas_sga.id = incapacidad.dataValues.id_altas_SGA
    change.id = id;


    const incapacidad1 = await incapacidad.update(change)
    const incapacidad2 = await sga.update(change.altas_sga)
    

    return( incapacidad1, incapacidad2 );
  }

  async delete(id) {
    const ausencia = await this.findOne(id);
    await ausencia.destroy()
    return { id };
  }
}

module.exports = IncapacidadService;
