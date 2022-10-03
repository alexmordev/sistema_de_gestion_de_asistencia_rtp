const { Model, DataTypes, Sequelize } = require('sequelize');
// const TRABAJADOR_TABLE = require('./trabajador.model');
const {TRABAJADOR_TABLE} = require('./trabajador.model');
const {CATALOGO_CONCEPTOS_TABLE} = require('./catalogoConcepto.model');

const ALTASSGA_TABLE = 'altas_sga'
const AltaSGASchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    id_Trabajador: {
        field: 'id_trabajador',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: TRABAJADOR_TABLE,
            key: 'trab_credencial'
        }
    },

    id_Concepto: {
        field: 'id_concepto',
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
            model:CATALOGO_CONCEPTOS_TABLE,
            key:'id'
        }
    },

    id_Periodo: {
        field: 'id_periodo',
        type: DataTypes.INTEGER,
    },

    fechaCaptura: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_captura',
        defaultValue: Sequelize.NOW
    },

    unidades: {
        allowNull: false,
        type: DataTypes.INTEGER
    },

    oficio: {
        allowNull: false,
        type: DataTypes.STRING
    },

    usuario_Captura: {
        field: 'usuario_captura',
        allowNull: false,
        type: DataTypes.INTEGER
    },

    fechaInicio: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_inicio',
    },

    fechaFinal: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_final',
    }
}

class AltasSGA extends Model {
    static asociate(models) {
        this.belongsTo(models.Trabajador, {
            foreignKey: 'id_trabajador'
        }),

        this.belongsTo(models.CatalogoConcepto, {
            foreignKey: 'id_concepto'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'altas_sga',
            modelName: 'AltasSGA',
            timestamps: false
        }
    }
}

module.exports = {
    ALTASSGA_TABLE,
    AltaSGASchema,
    AltasSGA
};
