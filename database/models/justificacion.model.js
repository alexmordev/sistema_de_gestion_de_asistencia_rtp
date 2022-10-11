const { Model, DataTypes, Sequelize } = require('sequelize');
// const {USER_TABLE} = require('./user.model');
const { ALTASSGA_TABLE } = require('./altasSGA.model')

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
        defaultValue: Sequelize.NOW,
        references: {
            model: ALTASSGA_TABLE,
            key: 'id_altas_SGA'
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

    usuarioCaptura: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },

    unidadesJustificadas: {
        field: 'unidades_justificadas',
        allowNull: false,
        type: DataTypes.INTEGER
    },

    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW

    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
    },
}
class Justificacion extends Model {
    static associciate(models) {

        this.belongsTo(models.AltasSGA, {
            as: "altas_sga",
            foreignKey: 'id_altas_SGA'
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
