const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const { Op} = require("sequelize");

class InputService{
    constructor(){}
    // Enviar datos de periodo y trabajador al enviar credencial
    async trabajadorPerido(id){
        const trabajador = await models.Trabajador.findByPk(id,
            {
                attributes:['trabCredencial', 'nombreCompleto', 'adscripcion']
            }
        );
        const today = new Date();
        const periodo  =  await models.Periodo.findAll( 
            {
                attributes:['per_numero', 'perFechaInicio', 'perFechaFinal', 'id_periodos'],
                where:{
                        per_tipo:( trabajador.trabajadorTipo == '0' ) ? 0 : 1,
                        [Op.and]:[
                            {per_fecha_inicio:{ [Op.lte]:today}},
                            {per_fecha_final: { [Op.gte]:today}}
                        ],
                    }
            }
        );
        return {...trabajador.dataValues,...periodo[0].dataValues};
    };
}
module.exports = InputService;