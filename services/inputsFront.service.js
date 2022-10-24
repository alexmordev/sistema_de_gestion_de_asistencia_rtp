const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Op} = require("sequelize");

class InputService{
    constructor(){}
    // Enviar datos de periodo y trabajador al enviar credencial
    async trabajadorPerido(id){
        const trabajador = await models.Trabajador.findByPk(id,
            {
                attributes:['trabCredencial', 'nombreCompleto', 'adscripcion', 'tipo_trab_div']
            }
        );

        const tipo_periodo =  trabajador.dataValues.tipo_trab_div == '01' ? 0 : 1;
        const today = new Date();

        const per_actual  =  await models.Periodo.findOne( 
            {
                attributes:['id_periodos'],
                where:{
                        [Op.and]:[
                            {per_tipo: tipo_periodo},
                            {per_fecha_final: { [Op.gte]:today}}
                        ],
                    },
                order: ['id_periodos']
            }
        );

        const per_busca = per_actual.dataValues.id_periodos - 1;
        
        const per_captura = await models.Periodo.findAll( 
            {
                attributes:['idPeriodos', 'perNumero', 'perFechaInicio', 'perFechaFinal'],
                where:{
                        [Op.and]:[
                            {id_periodos: { [Op.gte]: per_busca}},
                            {per_tipo: tipo_periodo}
                        ],
                    },
                order: ['id_periodos'],
                limit: 3
            }
        );

        return {...trabajador.dataValues,per_captura};
    };
}
module.exports = InputService;