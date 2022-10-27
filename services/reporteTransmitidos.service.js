//const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require("sequelize");
const { object } = require('joi');

class ReporteTransmitidosService {
    constructor() {}

    async getReporte(data){

        function Trabajador(){
          this.credencial = "";
          this.nombre = "";
          this.estatus = "";
          this.unidades13 = 0;
          this.unidades47 = 0;
          this.unidades48 = 0;
          this.unidades49 = 0;
          this.totalDescuento = 0;
        }

        const tipoPeriodo = (data.tipoTrabajador == '1') ? 0 : 1;
        const buscaPeriodo = [ { per_tipo: tipoPeriodo },{ per_numero: data.periodo },{ per_aho: data.aho } ];

        const busca13 = await models.Justificacion.findAll({
          attributes: ['id_altas_SGA',['unidades_justificadas', 'unidades']],
          where: { transmitido: true },
          include:[
            { as: 'trab_periodos', 
              model: models.Periodo,  
              attributes: ['per_numero'],
              where: buscaPeriodo
            },
            { as: 'altas_sga', 
              model: models.AltasSGA, 
              attributes: ['id_trabajador'],
              include:[
                { as: 'trabajador_vista', 
                  model: models.Trabajador, 
                  attributes:['nombre_completo', 'trab_status_desc']
                },
              ]
            }, 
          ]
        });

        const listado = [];

        busca13.forEach(data => {
          const index = listado.findIndex(lista => lista.credencial == data.altas_sga.dataValues.id_trabajador);
          if( index === -1){
            const newTrabajador = new Trabajador();
            newTrabajador.credencial = data.altas_sga.dataValues.id_trabajador
            newTrabajador.nombre = data.altas_sga.trabajador_vista.dataValues.nombre_completo
            newTrabajador.estatus = data.altas_sga.trabajador_vista.dataValues.trab_status_desc
            newTrabajador.unidades13 = data.dataValues.unidades
            listado.push(newTrabajador);
          }else{
            listado[index].unidades13 += data.dataValues.unidades
          }
        });

        const busca474849 = await models.Transmision.findAll({
          attributes: ['id_altas_SGA',['unidades_aplicadas', 'unidades']],
          include:[
            { as: 'trab_periodos', 
              model: models.Periodo,  
              attributes: ['per_numero'],
              where: buscaPeriodo
            },
            { as: 'altas_sga', 
              model: models.AltasSGA, 
              attributes: ['id_trabajador'],
              include:[
                { as: 'catalogo_conceptos', 
                  model: models.CatalogoConcepto, 
                  attributes: ['clave']
                },
                { as: 'trabajador_vista', 
                  model: models.Trabajador, 
                  attributes:['nombre_completo', 'trab_status_desc']
                }
              ]
            }
          ]
        });

        busca474849.forEach( data => {
          const index = listado.findIndex(lista => lista.credencial == data.altas_sga.dataValues.id_trabajador);
          if( index === -1){
            const newTrabajador = new Trabajador();
            newTrabajador.credencial = data.altas_sga.dataValues.id_trabajador
            newTrabajador.nombre =  data.altas_sga.trabajador_vista.dataValues.nombre_completo
            newTrabajador.estatus =  data.altas_sga.trabajador_vista.dataValues.trab_status_desc

            if(data.altas_sga.catalogo_conceptos.dataValues.clave === 47 ){
              newTrabajador.unidades47 = data.dataValues.unidades
            }
            if(data.altas_sga.catalogo_conceptos.dataValues.clave === 48 ){
              newTrabajador.unidades48 = data.dataValues.unidades
            }
            if(data.altas_sga.catalogo_conceptos.dataValues.clave === 49 ){
              newTrabajador.unidades49 = data.dataValues.unidades
            }
            newTrabajador.totalDescuento = newTrabajador.unidades47 + newTrabajador.unidades48 + newTrabajador.unidades49
            listado.push(newTrabajador);

          }else{
            
            if(data.altas_sga.catalogo_conceptos.dataValues.clave === 47 ){
              listado[index].unidades47 += data.dataValues.unidades
            }
            if(data.altas_sga.catalogo_conceptos.dataValues.clave === 48 ){
              listado[index].unidades48 += data.dataValues.unidades
            }
            if(data.altas_sga.catalogo_conceptos.dataValues.clave === 49 ){
              listado[index].unidades49 += data.dataValues.unidades
            }
            listado[index].totalDescuento = listado[index].unidades47 + listado[index].unidades48 + listado[index].unidades49
          }

        });

        return listado
    }



    async getForm() {

      const tipoEmpleado = [ { "code": 1, "name": "BASE"},{"code": 2, "name": "CONFIANZA-ESTRUCTURA"} ]
      return {tipoEmpleado};

    }

}

module.exports = ReporteTransmitidosService;