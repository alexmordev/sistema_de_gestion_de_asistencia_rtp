//const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require("sequelize");

class ReporteService {
    constructor() {}

    async getJustificacion( buscaPeriodo, tipoTrabModulo ) {

      const ids = await models.Justificacion.findAll({
        attributes: ['id_altas_SGA'],
        order: ['id_altas_SGA'],
        include:[
          { as: 'trab_periodos', 
            model: models.Periodo, 
            attributes:[],
            where: { [Op.and]: buscaPeriodo }  
          }
        ]
      });

      const idBusqueda = []
      ids.forEach(id => idBusqueda.push(id.id_altas_SGA));

      const idFiltro = await models.AltasSGA.findAll({
        attributes:['id'],
        where: { id : idBusqueda },
        include:[ { as: 'trabajador_vista', 
                    model: models.Trabajador, 
                    attributes:[],
                    where: { [Op.and]: tipoTrabModulo } 
                  },
                ]
      });

      const idBusca = []
      idFiltro.forEach(id => idBusca.push(id.id) );

      const respuesta = await models.Justificacion.findAll({
        attributes:[ 'id', ['unidades_justificadas', 'unidades']],
          include:[
            { as: 'altas_sga', 
              model: models.AltasSGA, 
              attributes: ['id_trabajador','fecha_inicio','fecha_final'],
              where: { id: idBusca },
              include:[
                { as: 'trabajador_vista', 
                  model: models.Trabajador, 
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

      const listado = [];
      respuesta.forEach(row => {
          listado.push({ "id": row.dataValues.id, 
                        "modulo": row.altas_sga.trabajador_vista.dataValues.mod_desc, 
                        "periodo": row.trab_periodos.dataValues.per_numero, 
                        "credencial": row.altas_sga.dataValues.id_trabajador, 
                        "nombre": row.altas_sga.trabajador_vista.dataValues.nombre_completo,  
                        "nss": row.altas_sga.trabajador_vista.dataValues.trab_no_afiliacion,
                        "fechaInicio": row.altas_sga.dataValues.fecha_inicio, 
                        "fechaFinal": row.altas_sga.dataValues.fecha_final,
                        "unidades": row.dataValues.unidades 
                      });
      });

      return listado;  
    }

    async getIncapacidad( buscaPeriodo, tipoTrabModulo ) {

      const ids = await models.AltasSGA.findAll({
        attributes: ['id'],
        where: { idConcepto : 6 },
        order: ['id'],
        include: [
          { as: 'trab_periodos', 
            model: models.Periodo, 
            where: { [Op.and]: buscaPeriodo }  
          }
        ]
      });

      const idBusqueda = []
      ids.forEach(id => idBusqueda.push(id.id));

      console.log(idBusqueda)
      const idFiltro = await models.AltasSGA.findAll({
        attributes:['id'],
        where: { id : idBusqueda },
        include:[ { as: 'trabajador_vista', 
                    model: models.Trabajador, 
                    attributes:[],
                    where: { [Op.and]: tipoTrabModulo } 
                  },
                ]
      });

      const idBusca = []
      idFiltro.forEach(id => idBusca.push(id.id) );

      const respuesta = await models.Incapacidad.findAll({
        attributes: ['id','clave_seguro','fecha_expedicion'],
        include:[
          {   as: 'catalogo_tipo_incapacidad', 
              model: models.TipoIncapacidad, 
              attributes:['tipo']
          },
          {   as: 'catalogo_ramo_seguro', 
              model: models.RamoSeguro, 
              attributes:['nombre']
          },
          {   as: 'altas_sga',
              model: models.AltasSGA, 
              attributes: ['id_trabajador','unidades','fecha_inicio','fecha_final'],
              where: { id: idBusca },
              include:[
                { as: 'trabajador_vista', 
                  model: models.Trabajador, 
                  attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc'],
                },
                { as: 'trab_periodos', 
                  model: models.Periodo,  
                  attributes: ['per_numero'],
                }
              ]
          }
        ]
      });

      const listado = [];
      respuesta.forEach(row => {
          listado.push({ "id": row.dataValues.id, 
                          "modulo": row.altas_sga.trabajador_vista.dataValues.mod_desc, 
                          "periodo": row.altas_sga.trab_periodos.dataValues.per_numero, 
                          "credencial": row.altas_sga.dataValues.id_trabajador, 
                          "nombre": row.altas_sga.trabajador_vista.dataValues.nombre_completo,  
                          "folio": row.dataValues.clave_seguro,
                          "nss": row.altas_sga.trabajador_vista.dataValues.trab_no_afiliacion,
                          "fechaExpedicion": row.dataValues.fecha_expedicion,
                          "fechaInicio": row.altas_sga.dataValues.fecha_inicio, 
                          "fechaFinal": row.altas_sga.dataValues.fecha_final,
                          "unidades": row.altas_sga.dataValues.unidades,
                          "ramoSeguro": row.catalogo_ramo_seguro.dataValues.nombre,
                          "tipoIncapacidad": row.catalogo_tipo_incapacidad.dataValues.tipo 
                      });
      });

      return listado;
        
    }

    async getSancion( buscaPeriodo, tipoTrabModulo ) {

        const respuesta = await models.AltasSGA.findAll({
          attributes: ['id', 'id_trabajador','unidades','fecha_inicio','fecha_final'],
          include: [
            { as: 'trabajador_vista', 
              model: models.Trabajador, 
              attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc'],
              where: { [Op.and]: tipoTrabModulo } 
            },
            { as: 'catalogo_conceptos', 
              model: models.CatalogoConcepto, 
              attributes:[],
              where: { clave: 48 }
            },
            { as: 'trab_periodos', 
              model: models.Periodo, 
              attributes: ['per_numero'],
              where: { [Op.and]: buscaPeriodo }  
            }
          ]
        });

        const listado = [];
        respuesta.forEach(row => {
            listado.push({ "id": row.id, 
                           "modulo": row.trabajador_vista.dataValues.mod_desc, 
                           "periodo": row.trab_periodos.dataValues.per_numero, 
                           "credencial": row.dataValues.id_trabajador, 
                           "nombre": row.trabajador_vista.dataValues.nombre_completo,  
                           "nss": row.trabajador_vista.dataValues.trab_no_afiliacion,
                           "fechaInicio": row.dataValues.fecha_inicio, 
                           "fechaFinal": row.dataValues.fecha_final,
                           "unidades": row.dataValues.unidades 
                        });
        });

        return listado;

    }

    async getAusencia( buscaPeriodo, tipoTrabModulo ) {

        const respuesta = await models.AltasSGA.findAll({
          attributes: ['id', 'id_trabajador','unidades','fecha_inicio','fecha_final'],
          include: [
            { as: 'trabajador_vista', 
              model: models.Trabajador, 
              attributes:['nombre_completo', 'trab_no_afiliacion', 'mod_desc'],
              where: { [Op.and]: tipoTrabModulo } 
            },
            { as: 'catalogo_conceptos', 
              model: models.CatalogoConcepto, 
              attributes:[],
              where: { clave: 49 }
            },
            { as: 'trab_periodos', 
              model: models.Periodo, 
              attributes: ['per_numero'],
              where: { [Op.and]: buscaPeriodo }  
            }
          ]
        });
        
        const listado = [];
        respuesta.forEach(row => {
            listado.push({ "id": row.id, 
                          "modulo": row.trabajador_vista.dataValues.mod_desc, 
                          "periodo": row.trab_periodos.dataValues.per_numero, 
                          "credencial": row.dataValues.id_trabajador, 
                          "nombre": row.trabajador_vista.dataValues.nombre_completo,  
                          "nss": row.trabajador_vista.dataValues.trab_no_afiliacion,
                          "fechaInicio": row.dataValues.fecha_inicio, 
                          "fechaFinal": row.dataValues.fecha_final,
                          "unidades": row.dataValues.unidades 
                        });
        });

        return listado;

    }

    async getReporte(data) {

        const tipoTrabModulo = [];

        if(data.tipoTrabajador == 1){
            
            if(data.numModulo != '99999'){ tipoTrabModulo.push( { moduloClave: data.numModulo } ) }
            tipoTrabModulo.push( { tipoTrabDiv: ['01'] } )

        }else if(data.tipoTrabajador == 2){
            
            if(data.numModulo != '99999'){ tipoTrabModulo.push( { moduloClave: data.numModulo } ) }
            tipoTrabModulo.push( { tipoTrabDiv:  ['09','10'] } )

        }else if(data.tipoTrabajador == 3){
           
            tipoTrabModulo.push( { tipoTrabDiv: ['11','13'] } )
        }

        const tipoPeriodo = (data.tipoTrabajador == 1) ? 0 : 1;
        const buscaPeriodo = [ { per_tipo: tipoPeriodo },{ per_numero: data.periodo },{ per_aho: data.aho } ];

        if(data.numConcepto == 13){
            const justificacion = await this.getJustificacion( buscaPeriodo, tipoTrabModulo );
            return justificacion;
        }
        else if(data.numConcepto == 47){
            const incapacidad = await this.getIncapacidad( buscaPeriodo, tipoTrabModulo );
            return incapacidad;
        }
        else if(data.numConcepto == 48){
            const sancion = await this.getSancion( buscaPeriodo, tipoTrabModulo );
            return sancion;
        }
        else if(data.numConcepto == 49){
            const ausencia = await this.getAusencia( buscaPeriodo, tipoTrabModulo );
            return ausencia;
        }else{
            return
        }
    }

    async getForm() {

      const getmodulos = await models.Modulo.findAll({
        attributes:['mod_clave', 'mod_desc'],
        where: { modClave: [0,1,2,3,4,5,6,7] },
        order: ['mod_clave'] 
      })

      const modulos = [{"code": "99999", "name": "TODO" }];
      await getmodulos.forEach( mod => {
        modulos.push({"code": mod.dataValues.mod_clave, "name": mod.dataValues.mod_desc }); 
      });

      const getConceptos = await models.CatalogoConcepto.findAll({
        where: { 'clave': [13,47,48,49] },
        order: ['clave']
      });

      const conceptos = [];
      await getConceptos.forEach(concepto =>{
        conceptos.push( { "code": concepto.dataValues.clave, "name": concepto.dataValues.nombre});
      });

      const tipoEmpleado = [{ "code": 1, "name": "Mod. Operadores-Mantenimiento"},
                            {"code": 2, "name": "Mod. Confianza-Estructura"}, 
                            {"code": 3, "name": "Oficinas Confianza-Estructura"} ]

      return {modulos,conceptos,tipoEmpleado};

    }

}

module.exports = ReporteService;
