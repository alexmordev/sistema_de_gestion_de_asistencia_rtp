const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Op, DATE, or } = require("sequelize");
 
class ReportesService {
   constructor() {}
 
    async reporteSGA(data) {
       
       const getDays=( year, month)=> new Date(year, month, 0).getDate();
        const year  = data.year;
        const month = data.month;
        const days = getDays(year,month);
        const inicioConsulta = `${month}/01/${year}`;
        const finConsulta = `${month}/${days}/${year}`;
        
        const res = await models.AltasSGA.findAll( {
            attributes:['id',['id_trabajador', 'credencial'],'fecha_inicio','fecha_final','unidades'],
            include:[
                {
                    association: 'incapacidad',
                    attributes:[['clave_seguro', 'folio']],
                    include: ['catalogo_ramo_seguro','catalogo_tipo_incapacidad']
                },
                {model:models.Trabajador, as:'trabajador_vista', attributes:[['nombre_completo', 'nombre'], ['trab_no_afiliacion','nss'], ['adscripcion', 'modulo']] },
                {model:models.Periodo, as:'trab_periodos', attributes:[['per_numero','periodo']] }
            ],
            where:{
                [Op.or]: [
                    { id_concepto: 6 },
                    { id_concepto: 3 }
                ],
                [Op.or]:[
                    {
                        [Op.and]:[
                            {fecha_inicio:{ [Op.gte]: inicioConsulta}},
                            {fecha_inicio:{ [Op.lte]: finConsulta}}
                        ]
                    },
                    {
                        [Op.and]:[
                            {fecha_final:{ [Op.gte]: inicioConsulta}},
                            {fecha_final:{ [Op.lte]: finConsulta}}
                        ]
                    },
                    {
                        [Op.and]:[
                            {fecha_inicio:{ [Op.lte]: inicioConsulta}},
                            {fecha_final:{ [Op.gte]: finConsulta}}
                        ]
                    }
                ],
            }
        } )
        for(let i = 0; i < res.length; i++){
            let {trabajador_vista, incapacidad, trab_periodos} =  res[i].dataValues;
            
            (trabajador_vista) ? res[i].dataValues.nombre = trabajador_vista.dataValues.nombre : null;
            (trabajador_vista) ? res[i].dataValues.nss = trabajador_vista.dataValues.nss: null;
            (incapacidad)      ? res[i].dataValues.folio = incapacidad.dataValues.folio : null;
            (incapacidad)      ? res[i].dataValues.tipoIncapacidad = incapacidad.catalogo_tipo_incapacidad.tipo : null;
            (incapacidad)      ? res[i].dataValues.ramoSeguro = incapacidad.catalogo_ramo_seguro.nombre : null;
            (trab_periodos)    ? res[i].dataValues.periodo = trab_periodos.dataValues.periodo : null;
            (res[i])           ? res[i].dataValues.fechaInicio = res[i].dataValues.fecha_inicio : null;
            (res[i])           ? res[i].dataValues.fechaFin = res[i].dataValues.fecha_final : null;
            // (res[i])           ? res[i].dataValues.dias = res[i].dataValues.unidades : null;

            if(res[i]){

                let fechaInicioConsulta = new Date(inicioConsulta).getTime();
                let fechaFinConsulta = new Date(finConsulta).getTime();
                let fechaInicioRegistro = new Date(res[i].dataValues.fechaInicio).getTime();
                let fechaFinRegistro = new Date(res[i].dataValues.fechaFin).getTime();
                const unDia = 1000*60*60*24; //86400000
                let unidades =0;

                (fechaInicioRegistro >fechaInicioConsulta ) 
                    ? fechaInicioConsulta = fechaInicioRegistro 
                    : null;
                for( fechaInicioConsulta; fechaInicioConsulta <= fechaFinConsulta; fechaInicioConsulta+= unDia){
                    unidades ++;
                    unidades == 29 ? unidades ++: null;
                    if( fechaInicioConsulta >= fechaFinRegistro ){
                        break;
                    }
                }
                res[i].dataValues.unidades = unidades;

                delete  res[i].dataValues.incapacidad;
                delete  res[i].dataValues.trabajador_vista;
                delete  res[i].dataValues.trab_periodos;
                delete  res[i].dataValues.fecha_inicio
                delete  res[i].dataValues.fecha_final
                // delete  res[i].dataValues.unidades
            }
        }
        return res ;
    } 
}
module.exports = ReportesService;