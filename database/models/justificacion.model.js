const { Model, DataTypes, Sequelize } = require('sequelize');
// const {USER_TABLE} = require('./user.model');
const { ALTASSGA_TABLE } = require('./AltasSGA.model')

const JUSTIFICACION_TABLE = 'justificacion'; //definir nombre tabla;
const JustificacionTableSGASchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idAltas: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_altas_SGA',
        references: {
            model: ALTASSGA_TABLE,
            key: 'id'
        }
    },

    usuarioCaptura: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'usuario_captura',
    },

    periodo: {
        allowNull: false,
        type: DataTypes.INTEGER
    },

    unidadesJustificadas: {
        allowNull: false,
        // type: DataTypes.FLOAT(11),
        type: DataTypes.FLOAT(11),
        field: 'unidades_justificadas',
    },
    transmitido:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: DataTypes.NOW

    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
    },
}
class Justificacion extends Model {
    static associciate(models) {

        this.belongsTo(models.AltasSGA, {
            as: "altas_sga",
            foreignKey: 'id_altas_SGA'
        }),
        this.belongsTo( models.Periodo,{
            as:"trab_periodos",
            foreignKey:'periodo'
        })
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUSTIFICACION_TABLE,
            modelName: 'Justificacion',
            createdAt: true,
            timestamps: true
        }
    }
}
module.exports = { JUSTIFICACION_TABLE, JustificacionTableSGASchema, Justificacion }