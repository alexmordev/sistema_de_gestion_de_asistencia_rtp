const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Op} = require("sequelize");

class InputService{
    constructor(){}
    // Enviar datos de periodo y trabajador al enviar credencial
    async trabajadorPerido(id){
        const trabajador = await models.Trabajador.findByPk(id,
            {
                attributes:['trab_credencial', 'nombre_completo', 'adscripcion','tipo_trab_div']
            }
        );

        let tipo_periodo = (trabajador.dataValues.tipo_trab_div == '01') ? 0 : 1;

        const today = new Date();
        const periodo  =  await models.Periodo.findAll( 
            {

                attributes:['per_numero', 'perFechaInicio', 'perFechaFinal', 'id_periodos'],
                where:{
                    per_tipo: tipo_periodo,
                    per_status: 0,

                        // [Op.and]:[
                        //     {per_fecha_inicio:{ [Op.lte]:today}},
                        //     {per_fecha_final: { [Op.gte]:today}}
                        // ],
                    },
                order: [
                    ['per_numero']
                ]
            }
        );
        return {...trabajador.dataValues,...periodo[0].dataValues};
    };
}
module.exports = InputService;