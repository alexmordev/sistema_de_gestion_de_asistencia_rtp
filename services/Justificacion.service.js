//const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Op,  fn, col } = require("sequelize");
const { Trabajador } = require('../database/models/Trabajador.model');

class JustificacionService {
  constructor() {}

  async create(data) {

    const insert = []

    await Promise.all( data.map( async (dat) => {
      const trabajador = await models.Trabajador.findByPk(dat.idTrabajador, { attributes:['tipo_trab_div'] } );
      const  tipo_periodo =  trabajador.dataValues.tipo_trab_div == '01' ? 0 : 1;
      const  today = new Date();
      
      const per_actual  =  await models.Periodo.findOne( 
        {
          attributes:['id_periodos'],
          where:{ [Op.and]:[ {per_tipo: tipo_periodo}, {per_fecha_final: { [Op.gte]:today}} ], },
          order: ['id_periodos']
        }
      );
        
      const idPeriodo = per_actual.dataValues.id_periodos;
      delete dat.idTrabajador;
       
      dat.periodo = idPeriodo;
      insert.push(dat)

    }))
    
    //const justificacion = await models.Justificacion.create(data);  // bulkCreate
    const justificacion = await models.Justificacion.bulkCreate(insert);  // bulkCreate
    return justificacion;
    
  }

  async listarAusenciaSancion ( altasId ){

    const idsAusenciasSanciones = [];
    altasId.forEach( altaId => idsAusenciasSanciones.push(altaId.id) );

    if(idsAusenciasSanciones.length === 0){ return; } 

    // Verificamos que ids ya fueron justificados y obtenemos los id para descartarlos
    const justificados = await models.Justificacion.findAll({
      attributes: [ 'id_altas_SGA', [fn('sum', col('unidades_justificadas')), 'total_unidades'] ],
      where: { id_altas_SGA: idsAusenciasSanciones },
      group: 'id_altas_SGA'
    })  
    
    // Obtenemos los registros de los conceptos de ausencias y sanciones que no han sido Justificados
    const lista = [];
    altasId.forEach(altas => {

      const encontrar = justificados.find(element => element.id_altas_SGA == altas.id);

      if(encontrar){

        if((altas.unidades - encontrar.dataValues.total_unidades ) > 0){
        
          const descontar = altas.unidades - encontrar.dataValues.total_unidades
          
          lista.push({ "id": altas.id, 
                       "modulo": altas.trabajador_vista.mod_desc,
                       "periodo" : altas.trab_periodos.dataValues.per_numero,
                       "credencial": altas.id_trabajador, 
                       "nombre": altas.trabajador_vista.dataValues.nombre_completo,  
                       "concepto": altas.catalogo_conceptos.dataValues.clave +' '+ altas.catalogo_conceptos.dataValues.nombre, 
                       "nss": altas.trabajador_vista.dataValues.trab_no_afiliacion,
                       "fecha_inicio": altas.dataValues.fecha_inicio, 
                       "fecha_final": altas.dataValues.fecha_final,
                       "unidades": altas.unidades,
                       "max_descontar": descontar
          });

        }
      }else{
        
        lista.push({ "id": altas.id, 
                     "modulo": altas.trabajador_vista.mod_desc,
                     "periodo" : altas.trab_periodos.dataValues.per_numero,
                     "credencial": altas.id_trabajador, 
                     "nombre": altas.trabajador_vista.dataValues.nombre_completo,  
                     "concepto": altas.catalogo_conceptos.dataValues.clave +' '+ altas.catalogo_conceptos.dataValues.nombre, 
                     "nss": altas.trabajador_vista.dataValues.trab_no_afiliacion,
                     "fecha_inicio": altas.dataValues.fecha_inicio, 
                     "fecha_final": altas.dataValues.fecha_final, 
                     "unidades": altas.unidades,
                     "max_descontar": altas.unidades
                    });
      }
    });

    return lista;

  }

  // busca por credencial las ausencias y sanciones que se pueden justificar
  async findOne(id) {

    // Obtenemos los id del trabajador de la tabla de altasSGA de los conceptos ausencias y sanciones
    const altasId = await models.AltasSGA.findAll({
      attributes: ['id', 'id_trabajador','id_concepto','unidades','fecha_inicio','fecha_final'],
      where: { idTrabajador: id },
      include: [
        { as: 'trabajador_vista', 
          model: Trabajador, 
          attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
        },
        { as: 'catalogo_conceptos', 
          model: models.CatalogoConcepto, 
          attributes: ['clave','nombre'], 
          where: { 
            clave: { [Op.in]: [48,49] } 
          }
        },
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes: ['per_numero'] 
        }
      ],
      order: [['id','ASC']]
    });

    const registros = await this.listarAusenciaSancion ( altasId );
    return registros;
  }

  // busca por tipo de trabajador, periodo y año las ausencias y sanciones que se pueden justificar
  async find(query) {

    // Obtenemos los id del trabajador de la tabla de altasSGA de los conceptos ausencias y sanciones
    const altasId = await models.AltasSGA.findAll({
      attributes: ['id', 'id_trabajador','id_concepto','unidades','fecha_inicio','fecha_final'],
      include: [
        { as: 'trabajador_vista', 
          model: Trabajador, 
          attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
        },
        { as: 'catalogo_conceptos', 
          model: models.CatalogoConcepto, 
          attributes: ['clave','nombre'], 
          where: { 
            clave: { [Op.in]: [48,49] } 
          }
        },
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes: ['per_numero'],
          where: {
            [Op.and]: [
              { per_tipo: query.tipoTrabajador },
              { per_numero: query.numPeriodo },
              { per_aho: query.aho }
            ]
          } 
        }
      ],
      order: [['id','ASC']]
    });
  
    const registros = await this.listarAusenciaSancion ( altasId );
    return registros;
  
  }
  
  async listarJustificaciones(altasId){
  

    const concepto = await models.CatalogoConcepto.findOne({
      attributes: ['clave','nombre'], 
      where: { 
        clave: { [Op.in]: [13] } 
      }
    });


    const nombreConcepto = concepto.dataValues.clave + ' ' + concepto.dataValues.nombre;

    const lista = [];
    altasId.forEach(altas => {

      lista.push({  "id": altas.id, 
                    "modulo": altas.altas_sga.trabajador_vista.dataValues.mod_desc,
                    "periodo" : altas.trab_periodos.dataValues.per_numero,
                    "credencial": altas.altas_sga.id_trabajador, 
                    "nombre": altas.altas_sga.trabajador_vista.dataValues.nombre_completo,  
                    "concepto": nombreConcepto,
                    "nss": altas.altas_sga.trabajador_vista.dataValues.trab_no_afiliacion,
                    "fecha_inicio": altas.altas_sga.dataValues.fecha_inicio, 
                    "fecha_final": altas.altas_sga.dataValues.fecha_final, 
                    "unidades": altas.dataValues.unidades_justificadas,
                    "delete": altas.dataValues.transmitido
                    });
    });

    return lista;

  }

  // buscar por credencial las justificaciones
  async findJustificacion(id) {

    const justificaciones = await models.Justificacion.findAll(
      {
        attributes:[ 'id', 'unidades_justificadas', 'transmitido'],
        include:[
          { as: 'altas_sga', 
            model: models.AltasSGA, 
            attributes: ['id_trabajador','fecha_inicio','fecha_final'],
            where: {idTrabajador: id},
            include:[
              { as: 'trabajador_vista', 
                model: Trabajador, 
                attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
              },
            ]
        }, 
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes: ['per_numero'] 
        }
        ]
      }); 

      const registros = await this.listarJustificaciones ( justificaciones );
      return registros;

  }

  // buscar por periodo las justificaciones
  async findJustificacionPeriodo(query) {

    const buscaPeriodo = await models.Periodo.findOne({
      attributes: ['id_periodos'],
      where: {
        [Op.and]: [
          { per_tipo: query.tipoTrabajador },
          { per_numero: query.numPeriodo },
          { per_aho: query.aho }
        ]
      } 
    });

    const justificaciones = await models.Justificacion.findAll(
      {
        attributes:[ 'id', 'unidades_justificadas', 'transmitido'],
        where: { periodo: buscaPeriodo.dataValues.id_periodos },
        include:[
          { as: 'altas_sga', 
            model: models.AltasSGA, 
            attributes: ['id_trabajador','fecha_inicio','fecha_final'],
            include:[
              { as: 'trabajador_vista', 
                model: Trabajador, 
                attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
              },
            ]
        }, 
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes: ['per_numero'] 
        }
        ]
      });

    const registros = await this.listarJustificaciones ( justificaciones );
    return registros;

  }

  async getAllJustificacion() {

    const preBusqueda = await models.Justificacion.findAll({ 
      attributes: ['id_altas_SGA'],
      order: ['id_altas_SGA']
    });

    const idBusqueda = []
    preBusqueda.forEach(id => {
      idBusqueda.push(id.id_altas_SGA)
    });

    const justificaciones = await models.Justificacion.findAll(
      {
        attributes:[ 'id', 'unidades_justificadas', 'transmitido'],
        include:[
          { as: 'altas_sga', 
            model: models.AltasSGA, 
            attributes: ['id_trabajador','fecha_inicio','fecha_final'],
            where: { id: idBusqueda },
            include:[
              { as: 'trabajador_vista', 
                model: Trabajador, 
                attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc']
              },
            ]
        }, 
        { as: 'trab_periodos', 
          model: models.Periodo, 
          attributes: ['per_numero'] 
        }
        ]
      });

      const registros = await this.listarJustificaciones ( justificaciones );
      return registros;
  }

  async delete(id) {
    
    const justificacion = await models.Justificacion.findByPk(id);
  
    if(justificacion.dataValues.transmitido === true){ return }
    
    await justificacion.destroy();
    return id;

  }
}

module.exports = JustificacionService;