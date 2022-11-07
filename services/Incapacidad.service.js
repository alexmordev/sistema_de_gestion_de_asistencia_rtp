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

  async busquedaTransmitido(data) {

  const busqueda = await models.Incapacidad.findAll({ 
    attributes: ['idAltasSGA'],
    include: [
      {
        as: 'altas_sga',
        model: models.AltasSGA,
        attributes: ['id','unidades','fechaInicio','fechaFinal'],
        include: [
          {
            as: 'trabajador_vista',
            model: Trabajador,
            attributes: ['trabCredencial','tipoTrabDiv','tipoTrabDescripcion' ],
          },

          {
            model: models.Transmision,
            attributes: [ 'idAltasSGA', 'unidadesAplicadas' ]
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

   
   const datosArray = [];
   busqueda.forEach(datos => {
     
    const PFI = new Date(busqueda[0].altas_sga.trab_periodos.perFechaInicio);//PeriodoFechaInicial
    const PFF = new Date(busqueda[0].altas_sga.trab_periodos.perFechaFinal);//PeriodoFechaFinal

    const FII = new Date(datos.altas_sga.fechaInicio);//fechaInicioIncapacidad
    const FFI = new Date(datos.altas_sga.fechaFinal);//fechaFinalIncapacidad

    // tipoTrabDiv 
    // console.log(datos.altas_sga.trabajador_vista.tipoTrabDiv);
    if( datos.altas_sga.trabajador_vista.tipoTrabDiv === '01'){
      console.log('solo se puedeninsertar 7 unidades', { data:`${ datos.altas_sga.trabajador_vista.tipoTrabDiv }` });
    }else{
      console.log('se permiten insertar solo 14 unidades', { data:`${ datos.altas_sga.trabajador_vista.tipoTrabDiv }` });
    }

   let resta = 0; 
   let unidades = 0;

   if ((FII.getTime() >= PFI.getTime()) && (FII.getTime() <= PFF.getTime())) {
     const fecha1 = PFF - FII;

     if (datos.unidades > fecha1 / (1000 * 60 * 60 * 24) + 1) {
       resta = `${datos.unidades}` - `${fecha1 / (1000 * 60 * 60 * 24) + 1}`
     }else if( datos.unidades < fecha1 / (1000 * 60 * 60 * 24) + 1){
       unidades = `${datos.unidades}` 
     }

    datosArray.push({
      //  idAltas: datos.id,
      //  unidadesTotales: datos.unidades,
      //  UnidadesAplicadas: `${datos.unidades}` - `${resta}`,
      //  UnidadesSobrantes: resta,
    })

    } else if ((FFI.getTime() <= PFF.getTime()) && (FFI.getTime() >= PFI.getTime())) {
     datosArray.push({  
      // idAltas: datos.id,
      //  idAltas: datos.id,
      //  unidadesTotales: datos.unidades,
      //  UnidadesAplicadas: `${datos.unidades}` - `${resta}`,
      //  UnidadesSobrantes: resta,

     })
    }


    // console.log({Incapacidad_1: FII,Incapacidad2: FFI, p1:PFI,p2:PFF});
   })
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
