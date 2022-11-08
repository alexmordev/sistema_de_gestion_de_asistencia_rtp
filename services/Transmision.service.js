const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");

class TransmisionService {
  constructor() {}

  async getJustificaicones(){

    const justificacion = await models.Justificacion.findAll({
      attributes: ['id', 'transmitido', ['unidades_justificadas', 'unidades'] ],
      where: { transmitido: false },
      order: ['id'],
      include:[
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes:['per_numero','per_tipo']
        },
        { as: 'altas_sga', 
          model: models.AltasSGA, 
          attributes: ['id_trabajador','fecha_inicio','fecha_final'],
          include:[
            { as: 'trabajador_vista', 
              model: models.Trabajador, 
              attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
            },
          ]
        },
      ]
    });

    const listado = justificacion.map(data => ({"id": data.dataValues.id,
                                                "unidades": data.dataValues.unidades,  
                                                "concepto": 13,
                                                "periodo": data.trab_periodos.dataValues.per_numero,
                                                "periodoTipo": data.trab_periodos.dataValues.per_tipo,
                                                "idTrabajador": data.altas_sga.dataValues.id_trabajador,
                                                "fechaInicio": data.altas_sga.dataValues.fecha_inicio, 
                                                "fechaFinal": data.altas_sga.dataValues.fecha_inicio,
                                                "nombre": data.altas_sga.trabajador_vista.dataValues.nombre_completo,
                                                "nss": data.altas_sga.trabajador_vista.dataValues.trab_no_afiliacion,
                                                "modulo": data.altas_sga.trabajador_vista.dataValues.mod_desc 
                                              }) );
    return listado
  }

  async getSanciones(){

    const getTransmitodos = await models.Transmision.findAll({ attributes:['id_altas_SGA']})
    const transmitidos = []
    getTransmitodos.forEach(data => transmitidos.push(data.dataValues.id_altas_SGA) );

    const sancion = await models.AltasSGA.findAll({
      attributes: ['id', 'id_trabajador','unidades','fecha_inicio','fecha_final'],
      where: { id: { [Op.notIn] : transmitidos } },
      order: ['id'],
      include: [
        { as: 'trabajador_vista', 
          model: models.Trabajador, 
          attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
        },
        { as: 'catalogo_conceptos', 
          model: models.CatalogoConcepto, 
          attributes:[],
          where: { clave: 48 }
        },
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes: ['per_numero','per_tipo']
        }
      ]
    });

    const listado = sancion.map(data => ({"id": data.dataValues.id,
                                                "unidades": data.dataValues.unidades,  
                                                "concepto": 48,
                                                "periodo": data.trab_periodos.dataValues.per_numero,
                                                "periodoTipo": data.trab_periodos.dataValues.per_tipo,
                                                "idTrabajador": data.dataValues.id_trabajador,
                                                "fechaInicio": data.dataValues.fecha_inicio, 
                                                "fechaFinal": data.dataValues.fecha_inicio,
                                                "nombre": data.trabajador_vista.dataValues.nombre_completo,
                                                "nss": data.trabajador_vista.dataValues.trab_no_afiliacion,
                                                "modulo": data.trabajador_vista.dataValues.mod_desc 
                                                }) );
    return listado
  }

  async getAusencias(){

    const getTransmitodos = await models.Transmision.findAll({ attributes:['id_altas_SGA']})
    const transmitidos = []
    getTransmitodos.forEach(data => transmitidos.push(data.dataValues.id_altas_SGA) );

    const ausencia = await models.AltasSGA.findAll({
      attributes: ['id', 'id_trabajador','unidades','fecha_inicio','fecha_final'],
      where: { id: { [Op.notIn] : transmitidos } },
      order: ['id'],
      include: [
        { as: 'trabajador_vista', 
          model: models.Trabajador, 
          attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
        },
        { as: 'catalogo_conceptos', 
          model: models.CatalogoConcepto, 
          attributes:[],
          where: { clave: 49 }
        },
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes: ['per_numero', 'per_tipo']
        }
      ]
    });

    const listado = ausencia.map(data => ({"id": data.dataValues.id,
                                                "unidades": data.dataValues.unidades,  
                                                "concepto": 49,
                                                "periodo": data.trab_periodos.dataValues.per_numero,
                                                "periodoTipo": data.trab_periodos.dataValues.per_tipo,
                                                "idTrabajador": data.dataValues.id_trabajador,
                                                "fechaInicio": data.dataValues.fecha_inicio, 
                                                "fechaFinal": data.dataValues.fecha_inicio,
                                                "nombre": data.trabajador_vista.dataValues.nombre_completo,
                                                "nss": data.trabajador_vista.dataValues.trab_no_afiliacion,
                                                "modulo": data.trabajador_vista.dataValues.mod_desc 
                                                }) );
    return listado
    
  }

  async getNoTransmitidos(concepto){

    if( concepto == 13){ return await this.getJustificaicones(); }
    else if ( concepto == 48){ return await this.getSanciones(); }
    else if ( concepto == 49){ return await this.getAusencias(); }
    else{ return }
  }

  async registraJustificacion(data){

    const justificacion = await models.Justificacion.findByPk(data.id);
    if(!justificacion){

      return {ok:0}
    }else{

      const res = await justificacion.update({transmitido:true});
      if(res){ return {ok:1} }else{ return {ok:0} }
    }
  
  }

  async registra47_48_49(data){
    //  PARA EL CASO DE INCAPACIDADES, SANCIONES Y AUSENCIAS
    //  SE CREA UN REGISTRO EN LA TABLA DE TRANSMITIDOS
    const justificacion = await models.AltasSGA.findByPk(data.id);
    
    if(!justificacion){
    
      return {ok:0}
    
    }else{
    
      data.idAltasSGA = data.id
      data.transmitido = true
      data.unidadesAplicadas = data.unidades
      
      delete data.id
      delete data.concepto
      delete data.periodoTipo
      delete data.unidades
      
      const res = await models.Transmision.create(data);
      
      if(res){ return {ok:1}  }else{ return {ok:0} }
    }
  }

  async obtenerPeriodos(){
    const today = new Date();

    const base  =  await models.Periodo.findOne({
      attributes:['id_periodos'],
      where:{
        [Op.and]:[
          {per_tipo: 0},
          {per_fecha_final: { [Op.gte]:today}}
        ],
      },
      order: ['id_periodos']
    });
    const periodoBase = base.dataValues.id_periodos

    const confianza  =  await models.Periodo.findOne({
      attributes:['id_periodos'],
      where:{
        [Op.and]:[
          {per_tipo: 1},
          {per_fecha_final: { [Op.gte]:today}}
        ],
      },
      order: ['id_periodos']
    });
    const periodoConfianza = confianza.dataValues.id_periodos

    return {periodoBase, periodoConfianza}
  }

  
  async registraTransmision(datos){

    const totalRegistros = datos.length;
    let registrados = 0;
    let noRegistrados = 0;

    const {periodoBase, periodoConfianza} = await this.obtenerPeriodos();

    //console.log( periodoBase, periodoConfianza )
    await Promise.all( datos.map( async (dato) => {

      if( dato.periodoTipo === 0 ){  dato.periodo = periodoBase }
      else if( dato.periodoTipo === 1 ){ dato.periodo = periodoConfianza }

      if(dato.concepto == 13){
        
        const contenido = await this.registraJustificacion(dato)
        if(contenido.ok == 1){ registrados++ } else{ noRegistrados++ }

      }else if ( dato.concepto == 47 || 48 || 49){
        
        const contenido2 = await this.registra47_48_49(dato)
        if(contenido2.ok == 1){ registrados++ } else{ noRegistrados++ }
      }
       
    }))

    return { totalRegistros, registrados, noRegistrados }
  }

  async obtenerConceptos(){
    const getConceptos = await models.CatalogoConcepto.findAll({
      where: { 'clave': [13,47,48,49] },
      order: ['clave']
    });

    const conceptos = [];
    getConceptos.forEach(concepto =>{
        conceptos.push( { "code": concepto.dataValues.clave, "name": concepto.dataValues.nombre});
    });

    return conceptos
  }

}

module.exports = TransmisionService;