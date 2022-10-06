const { Model, DataTypes } = require('sequelize');
const { TIPOINCAPACIDAD_TABLE } = require('./tipoIncapacidad.model')
const { RAMOSEGURO_TABLE } = require('./ramoSeguro.model')
const { ALTASSGA_TABLE } = require('./altasSGA.model')

const INCAPACIDAD_TABLE = 'incapacidad';
const IncapacidadSGASchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idAltasSGA: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_altas_SGA',
        references: {
            model: ALTASSGA_TABLE,
            key: 'id_altas_SGA'
        },
        onUpdate: 'CASCADE', // Esto ocurre al actualizar, un efecto en cascada y tambien se actualiza
        onDelete: 'SET NULL' // Esto ocurre al borrar, se establece a null
    },
    idTipoIncapacidad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_tipo_incapacidad',
        references: {
            model: TIPOINCAPACIDAD_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE', // Esto ocurre al actualizar, un efecto en cascada y tambien se actualiza
        onDelete: 'SET NULL' // Esto ocurre al borrar, se establece a null
    },
    idRamoSeguro: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_ramo_seguro',
        references: {
            model: RAMOSEGURO_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE', // Esto ocurre al actualizar, un efecto en cascada y tambien se actualiza
        onDelete: 'SET NULL' // Esto ocurre al borrar, se establece a null
    },
    motivo: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    umf: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    riesgoTrabajo: {
        field: 'riesgo_trabajo',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    fechaExpedicion: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_expedicion',
    },
    posibleCovid: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'posible_covid',
    }
}
class Incapacidad extends Model {
    static associate(models) {
        this.belongsTo(models.AltasSGA, {
            as: "altas_sga",
            foreignKey: 'id_altas_SGA'
        }),
        this.belongsTo(models.TipoIncapacidad, {
            as:"catalogo_tipo_incapacidad",
            foreignKey: 'id_tipo_incapacidad'
        }),
        this.belongsTo(models.RamoSeguro, {
            as:"catalogo_ramo_seguro",
            foreignKey: 'id_ramo_seguro'
        })
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: INCAPACIDAD_TABLE,
            modelName: 'Incapacidad',
            timestamps: false
        }
    }
}
module.exports = { INCAPACIDAD_TABLE, IncapacidadSGASchema, Incapacidad };