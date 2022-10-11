const { Model, DataTypes, Sequelize } = require('sequelize');
// const {USER_TABLE} = require('./user.model');
const PERIODO_TABLE = 'trab_periodos'; //definir nombre tabla;
const PeriodoSchema = {
    idPeriodos:{
        field: 'id_periodos',
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    perTipo:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'per_tipo',
    },
    perNumero: {
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'per_numero',
    },
    perAho:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_aho',
    },
    perFechaInicio:{
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'per_fecha_inicio',
    },
    perFechaFinal:{
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'per_fecha_final',
    },
    perStatus:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_status',
    },
    perDiasPagoImss:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_dias_pago_imss',
    },
    perDiasBimestre:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_dias_bimestre',
    },
    perDespensa:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_despensa',
    },
    perDiasMes:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_dias_mes',
    },
    perNumMes:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_num_mes',
    },
    perDiasMesSDI:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_dias_mes_sdi',
    },
    perCierreCaja:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_cierre_caja',
    },
    perStatusInfonavit:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_status_infonavit',
    },
    perStatusFonacot:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_status_fonacot',
    },
    perAjusteSubsidioMes:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_ajuste_subsidio_mes',
    },
    perApp:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_app',
    },
    perInc:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'per_inc',
    }
}
class Periodo extends Model{
    static associate(models){
        this.hasMany( models.AltasSGA,{
            as:'altas_sga', 
            foreignKey: 'id_periodos'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: PERIODO_TABLE,
            modelName: 'Periodo',
            timestamps: false 
        }
    }
}
module.exports= {PERIODO_TABLE,PeriodoSchema,Periodo };