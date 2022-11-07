const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");

class TransmisionService {
  constructor() {}

  async getJustificaicones(){

    const justificacion = await models.Justificacion.findAll({
      attributes: ['id_altas_SGA', 'transmitido', ['unidades_justificadas', 'unidades'] ],
      where: { transmitido: false },
      order: ['id_altas_SGA'],
      include:[
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes:['per_numero']
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

    const listado = justificacion.map(data => ({"id": data.dataValues.id_altas_SGA,
                                                "unidades": data.dataValues.unidades,  
                                                "periodo": data.trab_periodos.dataValues.per_numero,
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
          attributes: ['per_numero']
        }
      ]
    });

    const listado = sancion.map(data => ({"id": data.dataValues.id,
                                                "unidades": data.dataValues.unidades,  
                                                "periodo": data.trab_periodos.dataValues.per_numero,
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
          attributes: ['per_numero']
        }
      ]
    });

    const listado = ausencia.map(data => ({"id": data.dataValues.id,
                                                "unidades": data.dataValues.unidades,  
                                                "periodo": data.trab_periodos.dataValues.per_numero,
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

    if( concepto == 13){
      const justificacion = await this.getJustificaicones();
      return justificacion;
    }else if ( concepto == 48){
      const sancion = await this.getSanciones();
      return sancion;
    }else if ( concepto == 49){
      const ausencia = await this.getAusencias();
      return ausencia;
    }else{
      return
    }

  }

  // Registrar justificaciones 

  //  PARA EL CASO DE INCAPACIDADES, SANCIONES Y AUSENCIAS
      //  SE CREA UN REGISTRO EN LA TABLA DE TRANSMITIDOS

  // PARA EL CASO DE JUSTIFICACIONES SE ACTUALIZA EL ESTADO DE TRANSMITODO 
    //  EN CASO DE QUE EL PERIODO DE REGISTRO SEA DIFERENTE AL ACTUAL SE ACTUALIZA TAMBIEN EL PERIODO 

  async registraJustificacion(data){

  }

  async registra47_48_49(data){


  }

  async registraTransmision(concepto ,data){

    if(concepto == 13){
      // this.registraJustificacion()
    }else if ( concepto == 47 || 48 || 49){
      
      // this.registra47_48_49()
    }
  }


  
  // async create(data) { //para Sanciones y ausencias Registrar en la tabla de tra
  //   const newTransmision = await models.Transmision.create( data )
  //   return newTransmision;
  // }
  // async find() {
  //   const res = await models.Transmision.findAll(
  //     {
  //       include:['altas_sga']
  //     }
  //   );
  //   return res;
  // }

  // async findTransmitidas(query) {
  //   const res = await models.Periodo.findAll(query,{
  //     include: [{
  //       association: 'trab_periodos',
  //       where: { per_numero: query }
  //     }]

  //   });
    
  //   return({ datos: res})
  // }

  // async findOne(id) {
  //   const transmision  =  await models.Transmision.findByPk(id);// buscar con id
  //   if(!transmision){
  //     boom.notFound('Registro no encontrado');
  //   }
  //   return transmision;
  // }

  // async update(id, changes) {
  //   const transmision = await this.findOne(id);
  //   const res = await transmision.update(changes);
  //   return res;
  // }
  
  // async delete(id) {
  //   const transmision = await this.findOne(id);
  //   await transmision.destroy()
  //   return {id};
  // }
}

module.exports = TransmisionService;



